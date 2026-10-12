-- ==============================================================================
-- Al Quds Market (القدس ماركت) — Complete Supabase Database Setup
-- Run this complete file in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. ENUMS & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('customer', 'admin');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'preparing',
    'out_for_delivery',
    'delivered',
    'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE promo_type AS ENUM (
    'percentage',
    'fixed',
    'free_delivery'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 2. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en')),
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(10, 2) CHECK (compare_at_price IS NULL OR compare_at_price > price),
  unit_label_ar TEXT NOT NULL DEFAULT 'قطعة',
  unit_label_en TEXT NOT NULL DEFAULT 'piece',
  stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);

-- 5. DELIVERY AREAS TABLE
CREATE TABLE IF NOT EXISTS public.delivery_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (fee >= 0),
  free_delivery_threshold NUMERIC(10, 2) CHECK (free_delivery_threshold IS NULL OR free_delivery_threshold >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  type promo_type NOT NULL,
  value NUMERIC(10, 2) NOT NULL CHECK (value > 0),
  min_order_amount NUMERIC(10, 2) DEFAULT 0 CHECK (min_order_amount >= 0),
  max_uses INT,
  used_count INT NOT NULL DEFAULT 0,
  valid_from TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  valid_until TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. ORDERS TABLE (Cash On Delivery)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  status order_status NOT NULL DEFAULT 'pending',
  delivery_area_id UUID NOT NULL REFERENCES public.delivery_areas(id) ON DELETE RESTRICT,
  address_line TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  notes TEXT,
  subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
  delivery_fee NUMERIC(10, 2) NOT NULL CHECK (delivery_fee >= 0),
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  promotion_id UUID REFERENCES public.promotions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_orders_profile_id ON public.orders(profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 8. ORDER ITEMS (Immutable historical snapshot)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name_ar TEXT NOT NULL,
  product_name_en TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_label_ar TEXT NOT NULL,
  unit_label_en TEXT NOT NULL,
  image_url TEXT,
  line_total NUMERIC(10, 2) NOT NULL CHECK (line_total >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- 9. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(profile_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_profile ON public.favorites(profile_id);

-- 10. ROW LEVEL SECURITY & HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile or admin can view all" ON public.profiles;
CREATE POLICY "Users can view own profile or admin can view all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile or admin can update all" ON public.profiles;
CREATE POLICY "Users can update own profile or admin can update all"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories Policies
DROP POLICY IF EXISTS "Anyone can view active categories" ON public.categories;
CREATE POLICY "Anyone can view active categories"
  ON public.categories FOR SELECT
  USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Products Policies
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Delivery Areas Policies
DROP POLICY IF EXISTS "Anyone can view active delivery areas" ON public.delivery_areas;
CREATE POLICY "Anyone can view active delivery areas"
  ON public.delivery_areas FOR SELECT
  USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admins can manage delivery areas" ON public.delivery_areas;
CREATE POLICY "Admins can manage delivery areas"
  ON public.delivery_areas FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Promotions Policies
DROP POLICY IF EXISTS "Admins can manage promotions" ON public.promotions;
CREATE POLICY "Admins can manage promotions"
  ON public.promotions FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Customers can lookup active promotions" ON public.promotions;
CREATE POLICY "Customers can lookup active promotions"
  ON public.promotions FOR SELECT
  USING (is_active = true AND (valid_until IS NULL OR valid_until > now()));

-- Orders Policies
DROP POLICY IF EXISTS "Customers can view own orders" ON public.orders;
CREATE POLICY "Customers can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = profile_id OR public.is_admin());

DROP POLICY IF EXISTS "Customers can create own orders" ON public.orders;
CREATE POLICY "Customers can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Order Items Policies
DROP POLICY IF EXISTS "Customers can view own order items" ON public.order_items;
CREATE POLICY "Customers can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND (orders.profile_id = auth.uid() OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "Customers can insert own order items" ON public.order_items;
CREATE POLICY "Customers can insert own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.profile_id = auth.uid()
    )
  );

-- Favorites Policies
DROP POLICY IF EXISTS "Users can manage own favorites" ON public.favorites;
CREATE POLICY "Users can manage own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

-- 11. AUTOMATIC PROFILE TRIGGER ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone, preferred_language, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'preferred_language', 'ar'),
    'customer'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 12. CONCURRENCY-SAFE INVENTORY FUNCTIONS
CREATE OR REPLACE FUNCTION public.decrement_product_stock(
  p_product_id UUID,
  p_quantity INT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_stock INT;
BEGIN
  SELECT stock_quantity INTO v_current_stock
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product with ID % not found', p_product_id;
  END IF;

  IF v_current_stock < p_quantity THEN
    RETURN FALSE;
  END IF;

  UPDATE public.products
  SET
    stock_quantity = stock_quantity - p_quantity,
    updated_at = now()
  WHERE id = p_product_id;

  RETURN TRUE;
END;
$$;

-- 13. SEED DATA
INSERT INTO public.delivery_areas (name_ar, name_en, fee, free_delivery_threshold, sort_order) VALUES
  ('وسط القدس', 'Central Al Quds', 10.00, 100.00, 1),
  ('بيت حنينا', 'Beit Hanina', 12.00, 120.00, 2),
  ('شعفاط', 'Shu''fat', 12.00, 120.00, 3),
  ('البلدة القديمة', 'The Old City', 15.00, 150.00, 4),
  ('الطور', 'At-Tur', 12.00, 120.00, 5),
  ('سلوان', 'Silwan', 15.00, 150.00, 6),
  ('العيسوية', 'Issawiya', 15.00, 150.00, 7),
  ('الرام وحزما', 'Ar-Ram & Hizma', 18.00, 180.00, 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order) VALUES
  ('fresh-produce', 'خضر وفواكه طازجة', 'Fresh Produce', '🥦', 1),
  ('dairy-eggs', 'ألبان وبيض', 'Dairy & Eggs', '🥛', 2),
  ('bakery', 'مخبوزات طازجة', 'Fresh Bakery', '🍞', 3),
  ('meat-poultry', 'لحوم ودواجن', 'Meat & Poultry', '🥩', 4),
  ('pantry', 'مواد تموينية وبقوليات', 'Pantry & Grains', '🫒', 5),
  ('beverages', 'مشروبات وعصائر', 'Beverages & Juices', '🧃', 6),
  ('snacks-sweets', 'وجبات خفيفة وحلويات', 'Snacks & Sweets', '🍫', 7),
  ('household', 'منظفات وعناية منزلية', 'Household & Cleaning', '🧹', 8)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Products
INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-APP-01',
  'تفاح أحمر بلدي طازج',
  'Fresh Local Red Apples',
  'تفاح أحمر مقرمش ولذيذ، قطاف يومي طازج من أفضل المزارع.',
  'Crisp and delicious sweet red apples, picked fresh daily from premium local farms.',
  id, 12.50, 15.00, 'كغ', 'kg', 150, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-BAN-01',
  'موز استوائي نخب أول',
  'Premium Bananas',
  'موز طازج غني بالطاقة والبوتاسيوم، ناضج ومثالي للاستهلاك اليومي.',
  'Fresh, naturally ripened sweet bananas packed with energy and potassium.',
  id, 8.00, NULL, 'كغ', 'kg', 200, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-TOM-01',
  'طماطم مزارع طازجة',
  'Fresh Vine Tomatoes',
  'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية.',
  'Ripe red farm tomatoes, ideal for salads and home cooking.',
  id, 6.50, 8.00, 'كغ', 'kg', 180, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-MLK-01',
  'حليب طازج كامل الدسم',
  'Fresh Full Cream Milk',
  'حليب مبستر طبيعي 100% غني بالكالسيوم، سعة 1 لتر.',
  '100% pure fresh pasteurized milk rich in calcium, 1 Liter bottle.',
  id, 9.00, NULL, 'لتر', 'liter', 90, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-EGG-01',
  'طبق بيض مزارع طازج (30 بيضة)',
  'Fresh Farm Eggs Carton (30 Pcs)',
  'بيض مزارع طازج نخب أول، مغذٍ وصحي لوجبة فطور متكاملة.',
  'Fresh grade-A farm eggs, 30 pieces carton.',
  id, 24.00, 28.00, 'طبق', 'carton', 75, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-BRD-01',
  'خبز عربي كماج ساخن',
  'Fresh Arabic Pita Bread',
  'خبز عربي طازج من الفرن مباشرة، ربطة من 8 أرغفة.',
  'Freshly baked traditional Arabic pita bread, pack of 8.',
  id, 4.50, NULL, 'ربطة', 'pack', 120, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-OIL-01',
  'زيت زيتون فلسطيني بكر ممتاز',
  'Extra Virgin Palestinian Olive Oil',
  'زيت زيتون معصور على البارد من جبال القدس، نكهة أصيلة وقيمة غذائية عالية، سعة 1 لتر.',
  'Cold-pressed extra virgin Palestinian olive oil, 1 Liter glass bottle.',
  id, 35.00, 42.00, 'لتر', 'liter', 110, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (sku) DO NOTHING;

-- 14. STORAGE BUCKET & POLICIES
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

DROP POLICY IF EXISTS "Public Read Access for Product Images" ON storage.objects;
CREATE POLICY "Public Read Access for Product Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admin Upload Access for Product Images" ON storage.objects;
CREATE POLICY "Admin Upload Access for Product Images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin Update Access for Product Images" ON storage.objects;
CREATE POLICY "Admin Update Access for Product Images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

DROP POLICY IF EXISTS "Admin Delete Access for Product Images" ON storage.objects;
CREATE POLICY "Admin Delete Access for Product Images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND public.is_admin()
  );

-- 15. SECURE ADMIN PROVISIONING FUNCTION
CREATE OR REPLACE FUNCTION public.promote_user_to_admin(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = LOWER(TRIM(p_email));

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No user found with email %', p_email;
  END IF;

  UPDATE public.profiles
  SET
    role = 'admin',
    updated_at = now()
  WHERE id = v_user_id;

  RETURN TRUE;
END;
$$;

REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.promote_user_to_admin(TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.promote_user_to_admin(TEXT) TO service_role;
