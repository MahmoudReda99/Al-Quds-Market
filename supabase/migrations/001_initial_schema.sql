-- ==============================================================================
-- Al Quds Market — Phase 2: Initial Schema
-- Migration: 001_initial_schema.sql
-- ==============================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('customer', 'admin');

CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

CREATE TYPE promo_type AS ENUM (
  'percentage',
  'fixed',
  'free_delivery'
);

-- 2. Profiles Table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'ar' CHECK (preferred_language IN ('ar', 'en')),
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Categories (Self-referential hierarchy: categories & subcategories)
CREATE TABLE public.categories (
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

-- Index for parent lookup and slug search
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- 4. Products Catalog
CREATE TABLE public.products (
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
  images JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { url, alt_ar, alt_en }
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);

-- Full text search support for bilingual search
ALTER TABLE public.products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(name_ar, '') || ' ' || coalesce(description_ar, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(description_en, ''))
  ) STORED;

CREATE INDEX idx_products_search ON public.products USING gin(search_vector);

-- 5. Delivery Areas & Dynamic Fees
CREATE TABLE public.delivery_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (fee >= 0),
  free_delivery_threshold NUMERIC(10, 2) CHECK (free_delivery_threshold IS NULL OR free_delivery_threshold >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Promotions & Coupon Codes
CREATE TABLE public.promotions (
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

-- 7. Orders (Cash On Delivery)
CREATE TABLE public.orders (
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

CREATE INDEX idx_orders_profile_id ON public.orders(profile_id);
CREATE INDEX idx_orders_status ON public.orders(status);

-- 8. Product Snapshots & Order Items
-- Preserves immutable historical item details and prices at purchase time
CREATE TABLE public.order_items (
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

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- 9. Customer Favorites / Saved Items
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(profile_id, product_id)
);

CREATE INDEX idx_favorites_profile ON public.favorites(profile_id);
