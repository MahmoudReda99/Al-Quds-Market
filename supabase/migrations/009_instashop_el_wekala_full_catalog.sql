-- ==============================================================================;
-- Migration 009: InstaShop El Wekala Al Ahly Comprehensive Supermarket Catalog;
-- Incorporates all 36 departments from InstaShop El Wekala screenshot with real images,
-- authentic Egyptian supermarket products, and realistic EGP (جنيه مصري) prices.;
-- 100% Idempotent: safe to run repeatedly via Supabase SQL Editor.;
-- ==============================================================================;

-- 1. UPSERT ALL 36 INSTASHOP EL WEKALA CATEGORIES
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('new', 'جديد', 'New', '✨', '/categories/new.png', 1, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('offers', 'عروض وتخفيضات', 'Offers', '🏷️', '/categories/offers.png', 2, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('back-to-school', 'العودة للمدارس', 'Back 2 School', '🎒', '/categories/back-to-school.png', 3, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('dairy-eggs', 'ألبان وبيض', 'Dairy & Eggs', '🥛', '/categories/dairy-eggs.png', 4, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('fruits-vegetables', 'فواكه وخضروات', 'Fruits & Vegetables', '🍎', '/categories/fruits-vegetables.png', 5, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('bakery', 'مخبوزات طازجة', 'Bakery', '🍞', '/categories/bakery.png', 6, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('nuts-seeds', 'مكسرات وبذور', 'Nuts & Seeds', '🥜', '/categories/nuts-seeds.png', 7, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('stationery', 'أدوات مكتبية ومدرسية', 'Stationery', '✏️', '/categories/stationery.png', 8, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('chips-snacks', 'شيبسي ومقرمشات', 'Chips & Snacks', '🥔', '/categories/chips-snacks.png', 9, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('grab-and-go', 'وجبات سريعة وساندوتشات', 'Grab & Go', '🥪', '/categories/grab-and-go.png', 10, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('chocolates-candies', 'شوكولاتة وحلويات', 'Chocolates & Candies', '🍫', '/categories/chocolates-candies.png', 11, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('soft-drinks-juices', 'مشروبات غازية وعصائر', 'Soft Drinks & Juices', '🥤', '/categories/soft-drinks-juices.png', 12, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('water', 'مياه معدنية', 'Water', '💧', '/categories/water.png', 13, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('coffee-tea', 'قهوة وشاي', 'Coffee & Tea', '☕', '/categories/coffee-tea.png', 14, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('ice-creams', 'آيس كريم ومثلجات', 'Ice Creams', '🍦', '/categories/ice-creams.png', 15, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('household-care', 'منظفات وعناية منزلية', 'Household Care', '🧹', '/categories/household-care.png', 16, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('hygiene-personal-care', 'نظافة وعناية شخصية', 'Hygiene & Personal Care', '🧼', '/categories/hygiene-personal-care.png', 17, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('body-care', 'عناية بالجسم', 'Body Care', '🧴', '/categories/body-care.png', 18, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('facial-care', 'عناية بالبشرة والوجه', 'Facial Care', '💆', '/categories/facial-care.png', 19, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('shampoos-hair-care', 'شامبو وعناية بالشعر', 'Shampoos & Hair Care', '💇', '/categories/shampoos-hair-care.png', 20, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('baby-care', 'عناية بالأطفال', 'Baby Care', '👶', '/categories/baby-care.png', 21, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('home-baking', 'مستلزمات الخبز والحلويات', 'Home Baking', '🧁', '/categories/home-baking.png', 22, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('cereals-packets', 'حبوب إفطار وشوفان', 'Cereals & Packets', '🥣', '/categories/cereals-packets.png', 23, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('meat-fish', 'لحوم ودواجن وأسماك', 'Meat & Fish', '🥩', '/categories/meat-fish.png', 24, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('cans-jars', 'معلبات وبرطمانات', 'Cans & Jars', '🥫', '/categories/cans-jars.png', 25, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('pasta-rice', 'مكرونة وأرز وحبوب', 'Pasta, Rice & More', '🍝', '/categories/pasta-rice.png', 26, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('around-the-world', 'منتجات عالمية ومستوردة', 'Around the World', '🌮', '/categories/around-the-world.png', 27, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('healthy-organic', 'منتجات صحية وعضوية', 'Healthy & Organic', '🥗', '/categories/healthy-organic.png', 28, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('herbs-spices', 'أعشاب وتوابل', 'Herbs & Spices', '🧂', '/categories/herbs-spices.png', 29, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('frozen', 'مجمدات', 'Frozen', '🧊', '/categories/frozen.png', 30, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('cosmetics', 'مستحضرات تجميل ومكياج', 'Cosmetics', '💄', '/categories/cosmetics.png', 31, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('general-health', 'صحة عامة وفيتامينات', 'General Health', '🩹', '/categories/general-health.png', 32, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('more', 'أخرى ومستلزمات احتفالات', 'More', '🎉', '/categories/more.png', 33, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('electronics', 'إلكترونيات واكسسوارات', 'Electronics', '🎧', '/categories/electronics.png', 34, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('kitchen-pantry', 'أدوات المطبخ والمنزل', 'Kitchen & Pantry', '🍳', '/categories/kitchen-pantry.png', 35, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('camping-bbq', 'مستلزمات الرحلات والشواء', 'Camping & BBQ Essentials', '🔥', '/categories/camping-bbq.png', 36, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

-- 2. UPSERT AUTHENTIC PRODUCTS ACROSS ALL 36 CATEGORIES WITH EGP PRICING
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'NEW-HIPRO-01', id, 'مشروب بروتين دانون هاي برو بالفراولة 20 جم بروتين', 'Danone HiPro Strawberry High Protein Drink 20g', 'مشروب بروتين مغذي ومنعش بدون سكر مضاف، مثالي للرياضيين وبعد التمارين.', 'High protein strawberry drink with 20g protein and no added sugar, perfect for fitness recovery.', 38.00, 45.00, 'زجاجة', 'bottle', 85, true, true, '[{"url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80", "alt_ar": "مشروب بروتين دانون هاي برو بالفراولة 20 ", "alt_en": "Danone HiPro Strawberry High Protein Dri"}]'::jsonb
FROM public.categories WHERE slug = 'new'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'NEW-OATLY-01', id, 'حليب الشوفان النباتي باريستا 1 لتر', 'Barista Edition Oat Milk 1L', 'حليب شوفان نباتي فاخر ممتاز للقهوة والكابتشينو، خالي من اللاكتوز.', 'Rich and creamy plant-based barista oat milk, foamable and dairy-free.', 120.00, 140.00, 'عبوة', 'pack', 40, false, true, '[{"url": "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=600&auto=format&fit=crop&q=80", "alt_ar": "حليب الشوفان النباتي باريستا 1 لتر", "alt_en": "Barista Edition Oat Milk 1L"}]'::jsonb
FROM public.categories WHERE slug = 'new'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'OFF-JUH-MILK-4', id, 'عرض جهينة حليب كامل الدسم 1 لتر (عرض 4 عبوات)', 'Juhayna Full Cream Milk 1L (Pack of 4 Promo)', 'عرض التوفير العائلي: 4 عبوات حليب جهينة كامل الدسم المبستر عالي الجودة.', 'Family value pack: 4 cartons of 1L Juhayna full cream pasteurized milk.', 165.00, 190.00, 'عرض', 'bundle', 60, true, true, '[{"url": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80", "alt_ar": "عرض جهينة حليب كامل الدسم 1 لتر (عرض 4 ع", "alt_en": "Juhayna Full Cream Milk 1L (Pack of 4 Pr"}]'::jsonb
FROM public.categories WHERE slug = 'offers'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'OFF-ARIEL-GEL-01', id, 'عرض أريال جل سائل للغسالات الأوتوماتيك 2.5 لتر + لتر مجاناً', 'Ariel Automatic Laundry Gel 2.5L + 1L Free Promo', 'أريال باور جل برائحة اللافندر يزيل أصعب البقع من أول غسلة.', 'Ariel Power Liquid Laundry Detergent Gel with Touch of Downy, maximum stain removal.', 185.00, 230.00, 'عبوة', 'pack', 50, true, true, '[{"url": "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&auto=format&fit=crop&q=80", "alt_ar": "عرض أريال جل سائل للغسالات الأوتوماتيك 2", "alt_en": "Ariel Automatic Laundry Gel 2.5L + 1L Fr"}]'::jsonb
FROM public.categories WHERE slug = 'offers'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BTS-JUH-MINI-06', id, 'جهينة ميني حليب بالشوكولاتة 200 مل (باكت 6 علب)', 'Juhayna Mini Chocolate Milk 200ml (6-Pack)', 'مثالي لصندوق غداء المدرسة، غني بالكالسيوم والفيتامينات الأساسية للأطفال.', 'Ideal for school lunchboxes, rich in calcium and essential vitamins for kids.', 65.00, 75.00, 'باكت', 'pack', 100, false, true, '[{"url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80", "alt_ar": "جهينة ميني حليب بالشوكولاتة 200 مل (باكت", "alt_en": "Juhayna Mini Chocolate Milk 200ml (6-Pac"}]'::jsonb
FROM public.categories WHERE slug = 'back-to-school'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BTS-MOLTO-MAG-01', id, 'مولتو ماجنوم كرواسون شوكولاتة بندق حجم كبير (باكت 5 قطع)', 'Molto Magnum Hazelnut Cocoa Croissant (5-Pack)', 'سناك لذيذ وخفيف للمدرسة والرحلات محشو بكريمة الكاكاو والبندق اللذيذة.', 'Fluffy baked croissants generously filled with rich hazelnut chocolate spread.', 45.00, 50.00, 'باكت', 'pack', 120, false, true, '[{"url": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80", "alt_ar": "مولتو ماجنوم كرواسون شوكولاتة بندق حجم ك", "alt_en": "Molto Magnum Hazelnut Cocoa Croissant (5"}]'::jsonb
FROM public.categories WHERE slug = 'back-to-school'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-EGG-RED-30', id, 'كرتونة بيض مزارع طازج أحمر نخب أول (30 بيضة)', 'Fresh Red Farm Eggs Large (Carton of 30)', 'بيض أحمر طازج يومياً مغذى ومفحوص بيطرياً، غني بالبروتين وأوميغا 3.', 'Daily fresh large red farm eggs, rich in natural protein, omega-3 and vitamins.', 175.00, 190.00, 'طبق 30 بيضة', 'tray', 90, true, true, '[{"url": "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80", "alt_ar": "كرتونة بيض مزارع طازج أحمر نخب أول (30 ب", "alt_en": "Fresh Red Farm Eggs Large (Carton of 30)"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOMTY-PLUS-500', id, 'دومتي بلس جبنة فيتا بطعم مميز 500 جم', 'Domty Plus Creamy Feta Cheese 500g', 'جبنة فيتا كريمية سهلة الفرد مصنوعة من حليب طبيعي نقي وخفيفة الملح.', 'Smooth and creamy spreadable feta cheese made from pasteurized milk.', 42.00, NULL, 'علبة', 'pack', 150, false, true, '[{"url": "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=600&auto=format&fit=crop&q=80", "alt_ar": "دومتي بلس جبنة فيتا بطعم مميز 500 جم", "alt_en": "Domty Plus Creamy Feta Cheese 500g"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAMAR-1L', id, 'لمار حليب طبيعي كامل الدسم 1 لتر', 'Lamar 100% Pure Full Cream Milk 1L', 'حليب طبيعي 100% بدون إضافة ماء أو بودرة، معقم بأحدث التقنيات الأوروبية.', '100% pure fresh cow milk with zero additives or milk powder.', 44.00, NULL, 'عبوة', 'pack', 180, true, true, '[{"url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80", "alt_ar": "لمار حليب طبيعي كامل الدسم 1 لتر", "alt_en": "Lamar 100% Pure Full Cream Milk 1L"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'FV-TOM-BALADI-1K', id, 'طماطم بلدي طازجة نخب أول 1 كجم', 'Fresh Local Vine Ripe Tomatoes 1kg', 'طماطم حمراء متماسكة وشهية قطاف يومي طازج من مزارع الجيزة وأكتوبر.', 'Juicy and firm vine-ripened red salad tomatoes picked fresh daily.', 18.00, 22.00, 'كغ', 'kg', 200, true, true, '[{"url": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80", "alt_ar": "طماطم بلدي طازجة نخب أول 1 كجم", "alt_en": "Fresh Local Vine Ripe Tomatoes 1kg"}]'::jsonb
FROM public.categories WHERE slug = 'fruits-vegetables'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'FV-BAN-IMP-1K', id, 'موز بلدي سكري طازج نخب أول 1 كجم', 'Fresh Local Sweet Bananas 1kg', 'موز أصفر بلدي حلو المذاق غني بالبوتاسيوم والطاقة الطبيعية.', 'Sweet, naturally ripened golden bananas rich in potassium and energy.', 24.00, 28.00, 'كغ', 'kg', 150, false, true, '[{"url": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80", "alt_ar": "موز بلدي سكري طازج نخب أول 1 كجم", "alt_en": "Fresh Local Sweet Bananas 1kg"}]'::jsonb
FROM public.categories WHERE slug = 'fruits-vegetables'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BAK-TOAST-RICH-01', id, 'ريتش بيك خبز توست أبيض كبير 500 جم', 'Rich Bake Classic White Toast Large 500g', 'توست طازج وهش مصنوع من أجود أنواع دقيق القمح الفاخر، رائع للساندوتشات.', 'Soft and fluffy sliced white bread, freshly baked from premium wheat flour.', 38.00, NULL, 'كيس', 'bag', 75, false, true, '[{"url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80", "alt_ar": "ريتش بيك خبز توست أبيض كبير 500 جم", "alt_en": "Rich Bake Classic White Toast Large 500g"}]'::jsonb
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BAK-FINO-PACK-01', id, 'فينو بلدي طازج بالسمسم (كيس 10 أرغفة)', 'Fresh Sesame Fino Bread Rolls (Pack of 10)', 'خبز فينو طازج يومياً من مخابزنا، خفيف وطري ومثالي للفطور والعشاء.', 'Daily baked golden fino rolls with roasted sesame seeds.', 20.00, NULL, 'كيس 10 أرغفة', 'pack', 120, false, true, '[{"url": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80", "alt_ar": "فينو بلدي طازج بالسمسم (كيس 10 أرغفة)", "alt_en": "Fresh Sesame Fino Bread Rolls (Pack of 1"}]'::jsonb
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'NUT-ABUFOUZ-ALM-250', id, 'لوز أمريكي محمص ومملح فاخر 250 جم', 'Premium Roasted & Salted California Almonds 250g', 'حبات لوز أمريكي نخب أول محمصة بعناية وبملح خفيف مقرمش وغني بفيتامين E.', 'Crunchy dry-roasted California whole almonds lightly seasoned with sea salt.', 115.00, 135.00, 'علبة', 'pack', 50, false, true, '[{"url": "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80", "alt_ar": "لوز أمريكي محمص ومملح فاخر 250 جم", "alt_en": "Premium Roasted & Salted California Almo"}]'::jsonb
FROM public.categories WHERE slug = 'nuts-seeds'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'NUT-MIX-PST-250', id, 'مكسرات مشكلة إكسترا محمصة (كاجو، فستق، لوز، عين جمل) 250 جم', 'Extra Mixed Roasted Nuts (Cashews, Pistachios, Almonds, Walnuts) 250g', 'تشكيلة مكسرات فاخرة ممتازة للضيافة والسهرات والمناسبات.', 'Gourmet mix of roasted jumbo cashews, pistachios, almonds and walnuts.', 145.00, 165.00, 'علبة', 'pack', 45, true, true, '[{"url": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80", "alt_ar": "مكسرات مشكلة إكسترا محمصة (كاجو، فستق، ل", "alt_en": "Extra Mixed Roasted Nuts (Cashews, Pista"}]'::jsonb
FROM public.categories WHERE slug = 'nuts-seeds'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'STA-NOTE-A5-01', id, 'كشكول سلك مقوى A5 مسطر 100 ورقة', 'Spiral Hardcover Ruled Notebook A5 100 Sheets', 'كشكول عملي وأنيق للمكتب والمدرسة والجامعة بأوراق ناعمة وعالية الجودة.', 'Durable spiral notebook with 100 high quality ruled bleed-resistant sheets.', 45.00, NULL, 'قطعة', 'piece', 80, false, true, '[{"url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80", "alt_ar": "كشكول سلك مقوى A5 مسطر 100 ورقة", "alt_en": "Spiral Hardcover Ruled Notebook A5 100 S"}]'::jsonb
FROM public.categories WHERE slug = 'stationery'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CHP-CHIPSY-CHILI-01', id, 'شيبسي بطاطس عائلي بطعم الشطة والليمون 85 جم', 'Chipsy Hot Chili & Lemon Potato Chips Family Size 85g', 'رقائق بطاطس طبيعية 100% مقرمشة بخلطة الشطة والليمون المصرية الأصيلة.', 'Crisp thinly sliced potato chips bursting with zesty lime and spicy chili flavor.', 15.00, NULL, 'كيس', 'pack', 200, true, true, '[{"url": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80", "alt_ar": "شيبسي بطاطس عائلي بطعم الشطة والليمون 85", "alt_en": "Chipsy Hot Chili & Lemon Potato Chips Fa"}]'::jsonb
FROM public.categories WHERE slug = 'chips-snacks'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CHP-DORITOS-CHEESE-01', id, 'دوريتوس رقائق ذرة مقرمشة بنكهة الجبنة الناتشو 75 جم', 'Doritos Nacho Cheese Tortilla Chips 75g', 'مثلثات مقرمشة من حبوب الذرة الذهبية مغطاة بمسحوق جبنة الناتشو الغنية.', 'Crunchy tortilla corn chips loaded with bold, authentic nacho cheese seasoning.', 18.00, NULL, 'كيس', 'pack', 160, false, true, '[{"url": "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80", "alt_ar": "دوريتوس رقائق ذرة مقرمشة بنكهة الجبنة ال", "alt_en": "Doritos Nacho Cheese Tortilla Chips 75g"}]'::jsonb
FROM public.categories WHERE slug = 'chips-snacks'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'GRB-SAND-TURKEY-01', id, 'ساندوتش رومي مدخن وجبنة شيدر طازج مع المايونيز', 'Smoked Turkey & Cheddar Artisan Deli Sandwich', 'محضر يومياً في قسم المأكولات الطازجة في خبز الباغيت الفرنسي مع شرائح الطماطم.', 'Freshly prepared daily with prime smoked turkey breast and aged cheddar.', 65.00, 75.00, 'قطعة', 'piece', 35, false, true, '[{"url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop&q=80", "alt_ar": "ساندوتش رومي مدخن وجبنة شيدر طازج مع الم", "alt_en": "Smoked Turkey & Cheddar Artisan Deli San"}]'::jsonb
FROM public.categories WHERE slug = 'grab-and-go'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CHO-CADBURY-DAIRY-90', id, 'كادبوري ديري ميلك شوكولاتة بالحليب ناعمة 90 جم', 'Cadbury Dairy Milk Chocolate Bar 90g', 'الشوكولاتة الإنجليزية الشهيرة بحليب طازج غني، تذوب في الفم بنعومة لا تقاوم.', 'Smooth and creamy milk chocolate bar made with a glass and a half of fresh milk.', 48.00, 55.00, 'قطعة', 'piece', 140, true, true, '[{"url": "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80", "alt_ar": "كادبوري ديري ميلك شوكولاتة بالحليب ناعمة", "alt_en": "Cadbury Dairy Milk Chocolate Bar 90g"}]'::jsonb
FROM public.categories WHERE slug = 'chocolates-candies'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CHO-KITKAT-4F-01', id, 'كيت كات ويفر مقرمش بالشوكولاتة 4 أصابع 41.5 جم', 'KitKat 4 Finger Milk Chocolate Wafer Bar 41.5g', 'أصابع ويفر مقرمشة ومغطاة بشوكولاتة الحليب الفاخرة، خذ لك بريك!', 'Crisp wafer fingers coated in smooth milk chocolate. Have a break, have a KitKat.', 22.00, NULL, 'قطعة', 'piece', 170, false, true, '[{"url": "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80", "alt_ar": "كيت كات ويفر مقرمش بالشوكولاتة 4 أصابع 4", "alt_en": "KitKat 4 Finger Milk Chocolate Wafer Bar"}]'::jsonb
FROM public.categories WHERE slug = 'chocolates-candies'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BEV-COCA-CAN-330', id, 'كوكاكولا مشروب غازي كانز أصلي 330 مل', 'Coca-Cola Original Taste Can 330ml', 'المذاق المنعش الأصلي لكوكاكولا، يروي العطش مع كل رشفة مثلجة.', 'Original refreshing taste of Coca-Cola, perfectly carbonated and chilled.', 15.00, NULL, 'كانز', 'can', 250, true, true, '[{"url": "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&auto=format&fit=crop&q=80", "alt_ar": "كوكاكولا مشروب غازي كانز أصلي 330 مل", "alt_en": "Coca-Cola Original Taste Can 330ml"}]'::jsonb
FROM public.categories WHERE slug = 'soft-drinks-juices'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BEV-SCHWEPPES-POM-01', id, 'شويبس مشروب غازي رمان كانز 330 مل', 'Schweppes Pomegranate Sparkling Drink Can 330ml', 'انتعاش فريد بنكهة الرمان اللذيذة والفقاعات الفوارة المنعشة.', 'Sparkling pomegranate soda with sophisticated zesty notes and fine bubbles.', 16.00, NULL, 'كانز', 'can', 180, false, true, '[{"url": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80", "alt_ar": "شويبس مشروب غازي رمان كانز 330 مل", "alt_en": "Schweppes Pomegranate Sparkling Drink Ca"}]'::jsonb
FROM public.categories WHERE slug = 'soft-drinks-juices'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'WAT-AQUA-1500-01', id, 'مياه أكوافينا نقية طبيعية 1.5 لتر', 'Aquafina Pure Bottled Drinking Water 1.5L', 'مياه شرب نقية مصفاة بنظام التنقية الدقيق المكون من 7 مراحل لترطيب مثالي.', 'Pure drinking water purified through a rigorous 7-step Hydro-7 filtration process.', 9.00, NULL, 'زجاجة', 'bottle', 300, false, true, '[{"url": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80", "alt_ar": "مياه أكوافينا نقية طبيعية 1.5 لتر", "alt_en": "Aquafina Pure Bottled Drinking Water 1.5"}]'::jsonb
FROM public.categories WHERE slug = 'water'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'WAT-AQUA-PACK-12', id, 'كرتونة مياه أكوافينا 1.5 لتر (عرض 12 زجاجة)', 'Aquafina Bottled Water 1.5L (Case of 12)', 'كرتونة توفير مياه أكوافينا للمنزل والمكتب بأفضل سعر.', 'Convenient value case of 12 1.5-liter bottles of pure Aquafina water.', 98.00, 108.00, 'كرتونة 12 زجاجة', 'case', 110, true, true, '[{"url": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80", "alt_ar": "كرتونة مياه أكوافينا 1.5 لتر (عرض 12 زجا", "alt_en": "Aquafina Bottled Water 1.5L (Case of 12)"}]'::jsonb
FROM public.categories WHERE slug = 'water'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HOT-AROSA-TEA-250', id, 'شاي العروسة أسود ناعم أصلي 250 جم', 'El Arosa Original Black Dust Tea 250g', 'شاي مصر الأول ذو النكهة القوية الأصيلة واللون الكهرماني الجذاب.', 'Egypt''s most popular black dust tea delivering a robust and deeply aromatic brew.', 55.00, 60.00, 'علبة', 'pack', 190, true, true, '[{"url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80", "alt_ar": "شاي العروسة أسود ناعم أصلي 250 جم", "alt_en": "El Arosa Original Black Dust Tea 250g"}]'::jsonb
FROM public.categories WHERE slug = 'coffee-tea'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HOT-NESCAFE-GOLD-200', id, 'نسكافيه جولد قهوة سريعة التحضير برطمان 200 جم', 'Nescafe Gold Rich & Smooth Instant Coffee Jar 200g', 'قهوة أرابيكا محمصة ببطء لتقديم نكهة غنية ورائحة زكية لا تقاوم.', 'Carefully selected mountain-grown Arabica beans roasted to golden perfection.', 280.00, 310.00, 'برطمان', 'jar', 45, false, true, '[{"url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80", "alt_ar": "نسكافيه جولد قهوة سريعة التحضير برطمان 2", "alt_en": "Nescafe Gold Rich & Smooth Instant Coffe"}]'::jsonb
FROM public.categories WHERE slug = 'coffee-tea'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'ICE-MEGA-ALMOND-01', id, 'ميجا آيس كريم فانيليا مغطى بالشوكولاتة واللوز 95 مل', 'Mega Vanilla Ice Cream with Milk Chocolate & Almonds Stick 95ml', 'آيس كريم فانيليا كريمي ناعم مغطى بطبقة سميكة من شوكولاتة الحليب وقطع اللوز المحمص.', 'Velvety vanilla dairy ice cream dipped in thick cracking Belgian chocolate and roasted almonds.', 28.00, NULL, 'قطعة', 'piece', 80, false, true, '[{"url": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&auto=format&fit=crop&q=80", "alt_ar": "ميجا آيس كريم فانيليا مغطى بالشوكولاتة و", "alt_en": "Mega Vanilla Ice Cream with Milk Chocola"}]'::jsonb
FROM public.categories WHERE slug = 'ice-creams'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HOU-FAIRY-LEMON-650', id, 'فيري سائل غسيل الصحون المركز بالليمون 650 مل', 'Fairy Original Concentrated Lemon Dishwashing Liquid 650ml', 'قوة مضاعفة لتفتيت الدهون العنيدة برائحة الليمون المنعشة ونعومة على اليدين.', 'Ultra-concentrated dish soap with grease-cutting power and zesty lemon freshness.', 48.00, 55.00, 'زجاجة', 'bottle', 130, false, true, '[{"url": "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&auto=format&fit=crop&q=80", "alt_ar": "فيري سائل غسيل الصحون المركز بالليمون 65", "alt_en": "Fairy Original Concentrated Lemon Dishwa"}]'::jsonb
FROM public.categories WHERE slug = 'household-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HOU-DETTOL-DISINF-500', id, 'ديتول سائل مطهر ومعقم متعدد الاستخدامات 500 مل', 'Dettol Antiseptic & Disinfectant Liquid 500ml', 'حماية موثوقة بنسبة 99.9% ضد الجراثيم والبكتيريا لنظافة المنزل والتعقيم.', 'Trusted first-aid and household antiseptic protecting family against 99.9% of germs.', 85.00, 95.00, 'زجاجة', 'bottle', 70, true, true, '[{"url": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80", "alt_ar": "ديتول سائل مطهر ومعقم متعدد الاستخدامات ", "alt_en": "Dettol Antiseptic & Disinfectant Liquid "}]'::jsonb
FROM public.categories WHERE slug = 'household-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HYG-SENSO-REPAIR-75', id, 'سنسوداين معجون أسنان ترميم وحماية متقدم 75 مل', 'Sensodyne Repair & Protect Advanced Toothpaste 75ml', 'تقنية نوفامين المتطورة لبناء طبقة حماية وإصلاح الأسنان الحساسة وتبييضها.', 'Powered by NovaMin technology to form a protective mineral repair layer over sensitive areas.', 68.00, 78.00, 'قطعة', 'piece', 95, false, true, '[{"url": "https://images.unsplash.com/photo-1559591937-e10b1a0cb3ea?w=600&auto=format&fit=crop&q=80", "alt_ar": "سنسوداين معجون أسنان ترميم وحماية متقدم ", "alt_en": "Sensodyne Repair & Protect Advanced Toot"}]'::jsonb
FROM public.categories WHERE slug = 'hygiene-personal-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BOD-NIVEA-LOTION-400', id, 'نيفيا لوشن للجسم بزبدة الكاكاو وترطيب مكثف 400 مل', 'Nivea Cocoa Butter Deep Moisture Body Lotion 400ml', 'ترطيب يدوم 48 ساعة للبشرة الجافة مع إشراقة طبيعية ورائحة كاكاو ساحرة.', 'Infused with deep moisture serum and nourishing cocoa butter for 48-hour hydration.', 135.00, 155.00, 'زجاجة', 'bottle', 55, false, true, '[{"url": "https://images.unsplash.com/photo-1608248597359-ffef6613915f?w=600&auto=format&fit=crop&q=80", "alt_ar": "نيفيا لوشن للجسم بزبدة الكاكاو وترطيب مك", "alt_en": "Nivea Cocoa Butter Deep Moisture Body Lo"}]'::jsonb
FROM public.categories WHERE slug = 'body-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'FAC-GARNIER-MICELLAR-400', id, 'غارنييه ماء ميسيلار منظف ومزيل للمكياج للبشرة الحساسة 400 مل', 'Garnier SkinActive Micellar Cleansing Water 400ml', 'يزيل المكياج وينظف البشرة بلطف بدون فرك أو شطف، خالي من العطور والكحول.', 'All-in-1 facial cleanser that removes makeup and soothes skin without harsh rubbing.', 125.00, 145.00, 'زجاجة', 'bottle', 60, false, true, '[{"url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80", "alt_ar": "غارنييه ماء ميسيلار منظف ومزيل للمكياج ل", "alt_en": "Garnier SkinActive Micellar Cleansing Wa"}]'::jsonb
FROM public.categories WHERE slug = 'facial-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'SHA-PANTENE-MILKY-400', id, 'بانتين برو-في شامبو علاج ملكي للتلف 400 مل', 'Pantene Pro-V Milky Damage Repair Shampoo 400ml', 'يغذي الشعر الجاف والتالف من الجذور حتى الأطراف ويمنحه لمعاناً ونعومة حريرية.', 'Deeply moisturizes and helps lock in hydration to protect hair against damage.', 95.00, 110.00, 'زجاجة', 'bottle', 85, true, true, '[{"url": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80", "alt_ar": "بانتين برو-في شامبو علاج ملكي للتلف 400 ", "alt_en": "Pantene Pro-V Milky Damage Repair Shampo"}]'::jsonb
FROM public.categories WHERE slug = 'shampoos-hair-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BAB-PAMPERS-PREM-3', id, 'بامبرز عناية مميزة حفاضات أطفال مقاس 3 (عبوة جامبو 60 حفاضة)', 'Pampers Premium Care Diapers Size 3 (Jumbo Pack 60 Diapers)', 'نعومة فائقة ومواد تتنفس لحماية بشرة طفلك الحساسة مع امتصاص جاف يدوم 12 ساعة.', 'Feather-like softness and ultra-absorbent core ensuring dry protection for up to 12 hours.', 275.00, 310.00, 'عبوة 60 حفاضة', 'pack', 50, true, true, '[{"url": "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80", "alt_ar": "بامبرز عناية مميزة حفاضات أطفال مقاس 3 (", "alt_en": "Pampers Premium Care Diapers Size 3 (Jum"}]'::jsonb
FROM public.categories WHERE slug = 'baby-care'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BAK-DOHA-FLOUR-1K', id, 'الضحى دقيق فاخر لجميع الأغراض 1 كجم', 'Al Doha Premium All-Purpose White Wheat Flour 1kg', 'دقيق نقي منقى ومطحون من أفضل حبات القمح، رائع للكيك والبيتزا والمعجنات.', 'Super-fine white wheat flour, ideal for baking gourmet bread, pizza dough and cakes.', 32.00, NULL, 'كيس 1 كجم', 'bag', 140, false, true, '[{"url": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80", "alt_ar": "الضحى دقيق فاخر لجميع الأغراض 1 كجم", "alt_en": "Al Doha Premium All-Purpose White Wheat "}]'::jsonb
FROM public.categories WHERE slug = 'home-baking'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CER-KELLOGGS-CORN-375', id, 'كيلوجز كورن فليكس حبوب الذرة الذهبية المقرمشة 375 جم', 'Kellogg''s Classic Corn Flakes Breakfast Cereal 375g', 'رقائق الذرة الذهبية الكلاسيكية المقرمشة الغنية بـ 8 فيتامينات ومعادن أساسية.', 'Crispy golden toasted corn flakes packed with essential vitamins and iron for breakfast.', 85.00, 95.00, 'علبة', 'box', 65, false, true, '[{"url": "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=600&auto=format&fit=crop&q=80", "alt_ar": "كيلوجز كورن فليكس حبوب الذرة الذهبية الم", "alt_en": "Kellogg''s Classic Corn Flakes Breakfast "}]'::jsonb
FROM public.categories WHERE slug = 'cereals-packets'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'MEA-BEEF-MINCED-1K', id, 'لحم بقري بلدي مفروم طازج قليل الدهن 1 كجم', 'Fresh Local Lean Minced Beef 1kg', 'لحم بقري طازج ومفروم يومياً عند الطلب، ممتاز للكفتة والمكرونة البشاميل.', 'Premium lean minced beef ground fresh daily, antibiotic-free and 100% halal.', 360.00, 390.00, 'كغ', 'kg', 40, true, true, '[{"url": "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80", "alt_ar": "لحم بقري بلدي مفروم طازج قليل الدهن 1 كج", "alt_en": "Fresh Local Lean Minced Beef 1kg"}]'::jsonb
FROM public.categories WHERE slug = 'meat-fish'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'MEA-CHICK-BREAST-1K', id, 'صدور دجاج بانيه طازجة نظيفة مخلية 1 كجم', 'Fresh Boneless Skinless Chicken Breast Fillets 1kg', 'صدور دجاج طازجة مخلية ونظيفة تماماً، مغذية ومثالية للشواء والقلي والدايت.', 'Tender boneless chicken fillets, fresh daily and trimmed for quick meal prep.', 210.00, 230.00, 'كغ', 'kg', 70, true, true, '[{"url": "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80", "alt_ar": "صدور دجاج بانيه طازجة نظيفة مخلية 1 كجم", "alt_en": "Fresh Boneless Skinless Chicken Breast F"}]'::jsonb
FROM public.categories WHERE slug = 'meat-fish'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CAN-HEINZ-PASTE-360', id, 'هاينز معجون صلصة طماطم بيوريه برطمان 360 جم', 'Heinz Pure Tomato Paste Glass Jar 360g', 'صلصة طماطم غنية ومركزة بلون أحمر طبيعي ومذاق الطماطم الطازجة بدون مواد حافظة.', 'Rich concentrated tomato paste made from 100% Mediterranean sun-ripened tomatoes.', 28.00, NULL, 'برطمان', 'jar', 160, false, true, '[{"url": "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80", "alt_ar": "هاينز معجون صلصة طماطم بيوريه برطمان 360", "alt_en": "Heinz Pure Tomato Paste Glass Jar 360g"}]'::jsonb
FROM public.categories WHERE slug = 'cans-jars'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'CAN-TUNA-SUN-185', id, 'صن شاين تونة قطعة واحدة في زيت دوار الشمس 185 جم', 'Sunshine Solid Light Tuna in Sunflower Oil 185g', 'لحم تونة فاخر قطعة واحدة غني بالأوميغا 3 والبروتين الصافي، بدون زفارة.', 'Solid white light meat tuna chunks in sunflower oil, high in natural omega-3.', 62.00, 70.00, 'علبة', 'can', 110, false, true, '[{"url": "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&auto=format&fit=crop&q=80", "alt_ar": "صن شاين تونة قطعة واحدة في زيت دوار الشم", "alt_en": "Sunshine Solid Light Tuna in Sunflower O"}]'::jsonb
FROM public.categories WHERE slug = 'cans-jars'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PAS-DOHA-RICE-1K', id, 'الضحى أرز مصري فاخر منقى كاملاً 1 كجم', 'Al Doha Premium Egyptian White Rice 1kg', 'أرز مصري حبة عريضة ناصع البياض مغسول ومنقى 100% وجاهز للطبخ مباشرة.', 'Top grade polished Egyptian short grain rice, triple cleaned and ready to cook.', 38.00, 42.00, 'كيس 1 كجم', 'bag', 250, true, true, '[{"url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80", "alt_ar": "الضحى أرز مصري فاخر منقى كاملاً 1 كجم", "alt_en": "Al Doha Premium Egyptian White Rice 1kg"}]'::jsonb
FROM public.categories WHERE slug = 'pasta-rice'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PAS-MALEKA-PENNE-400', id, 'الملكة مكرونة قلم فرن فاخرة 400 جم', 'El Maleka Penne Rigate Pasta 400g', 'مكرونة مصنوعة من أجود أنواع دقيق القمح الصلب لا تتعجن وسريعة التحضير.', 'High quality ridged penne pasta crafted from premium durum wheat semolina.', 14.00, NULL, 'كيس 400 جم', 'bag', 220, false, true, '[{"url": "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?w=600&auto=format&fit=crop&q=80", "alt_ar": "الملكة مكرونة قلم فرن فاخرة 400 جم", "alt_en": "El Maleka Penne Rigate Pasta 400g"}]'::jsonb
FROM public.categories WHERE slug = 'pasta-rice'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'ATW-OLDELPASO-TACO-12', id, 'أولد إل باسو رقائق تاكو مكسيكية مقرمشة (12 قطعة)', 'Old El Paso Crunchy Taco Shells (Box of 12)', 'تاكو شيلز ذرة مقرمشة ومستوردة لسهرات المطبخ المكسيكي الشهية في المنزل.', 'Imported crunchy yellow corn taco shells for festive Mexican dinner nights.', 110.00, 130.00, 'علبة', 'box', 35, false, true, '[{"url": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80", "alt_ar": "أولد إل باسو رقائق تاكو مكسيكية مقرمشة (", "alt_en": "Old El Paso Crunchy Taco Shells (Box of "}]'::jsonb
FROM public.categories WHERE slug = 'around-the-world'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HEA-IMTENAN-HONEY-500', id, 'امتنان عسل نحل طبيعي حبة البركة نقي 500 جم', 'Imtenan Pure Black Seed Flower Honey 500g', 'عسل طبيعي نقي 100% مغذي ومقوي للمناعة غني بمضادات الأكسدة والإنزيمات.', 'Raw, unfiltered black seed blossom honey promoting vitality and natural immunity.', 145.00, 165.00, 'برطمان', 'jar', 60, true, true, '[{"url": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80", "alt_ar": "امتنان عسل نحل طبيعي حبة البركة نقي 500 ", "alt_en": "Imtenan Pure Black Seed Flower Honey 500"}]'::jsonb
FROM public.categories WHERE slug = 'healthy-organic'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HRB-DOHA-BLACKPEP-100', id, 'الضحى فلفل أسود حب نقي مطحون فاخر 100 جم', 'Al Doha Premium Ground Black Pepper 100g', 'فلفل أسود نقي برائحة نفاذة ونكهة حارة طبيعية بدون أي إضافات.', 'Pungent, freshly ground black peppercorns delivering bold spice to your culinary creations.', 48.00, NULL, 'برطمان', 'jar', 110, false, true, '[{"url": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80", "alt_ar": "الضحى فلفل أسود حب نقي مطحون فاخر 100 جم", "alt_en": "Al Doha Premium Ground Black Pepper 100g"}]'::jsonb
FROM public.categories WHERE slug = 'herbs-spices'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'FRO-FARMF-FRIES-1K', id, 'فارم فريتس بطاطس نصف مقلية مقرمشة 1 كجم', 'Farm Frites Crunchy Pre-Fried French Fries 1kg', 'أصابع بطاطس ذهبية مقرمشة ولذيذة جاهزة للقلي أو القلاية الهوائية في دقائق.', 'Crispy golden pre-fried potato french fries, ready in minutes for snacking.', 68.00, 78.00, 'كيس 1 كجم', 'bag', 130, true, true, '[{"url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80", "alt_ar": "فارم فريتس بطاطس نصف مقلية مقرمشة 1 كجم", "alt_en": "Farm Frites Crunchy Pre-Fried French Fri"}]'::jsonb
FROM public.categories WHERE slug = 'frozen'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'COS-MAYBELLINE-MASC-01', id, 'ميبيلين لاش سينساشيونال ماسكارا سواد فاحم مكثفة للرموش', 'Maybelline Lash Sensational Very Black Mascara', 'فرشاة مروحية من 10 طبقات تمنح الرموش كثافة وطولاً درامياً بدون تكتل.', 'Full fan effect mascara capturing every lash layer for dramatic multiplied volume.', 285.00, 320.00, 'قطعة', 'piece', 40, false, true, '[{"url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80", "alt_ar": "ميبيلين لاش سينساشيونال ماسكارا سواد فاح", "alt_en": "Maybelline Lash Sensational Very Black M"}]'::jsonb
FROM public.categories WHERE slug = 'cosmetics'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'HLT-HANSAPLAST-STRIPS-20', id, 'هانزابلاست لاصقات جروح مرنة ومقاومة للماء (علبة 20 لاصقة)', 'Hansaplast Water Resistant Elastic Plasters (Box of 20)', 'حماية سريعة للجروح والخدوش مع وسادة مهدئة لا تلتصق بالجلد.', 'Breathable flexible wound plaster strips protecting cuts against dirt and bacteria.', 42.00, NULL, 'علبة', 'box', 85, false, true, '[{"url": "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&auto=format&fit=crop&q=80", "alt_ar": "هانزابلاست لاصقات جروح مرنة ومقاومة للما", "alt_en": "Hansaplast Water Resistant Elastic Plast"}]'::jsonb
FROM public.categories WHERE slug = 'general-health'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'MOR-BALLOON-PARTY-50', id, 'بالونات أعياد ميلاد ملونة ومبهجة (كيس 50 بالونة)', 'Multi-Color Festive Birthday Balloons (Pack of 50)', 'ألوان زاهية ومطاط متين للاحتفالات والمناسبات وأعياد الميلاد المنزلية.', 'Vibrant assorted latex party balloons for celebrations and birthdays.', 45.00, NULL, 'كيس 50 بالونة', 'pack', 60, false, true, '[{"url": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80", "alt_ar": "بالونات أعياد ميلاد ملونة ومبهجة (كيس 50", "alt_en": "Multi-Color Festive Birthday Balloons (P"}]'::jsonb
FROM public.categories WHERE slug = 'more'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'ELE-ENERGIZER-AA-4', id, 'إنرجايزر بطاريات قلوية ماكس مقاس AA (باكت 4 بطاريات)', 'Energizer Max Alkaline AA Batteries (Pack of 4)', 'طاقة تدوم طويلاً للأجهزة المنزلية وألعاب الأطفال وأجهزة التحكم عن بعد.', 'Long-lasting power leak protection batteries for household remotes and toys.', 75.00, 85.00, 'باكت 4 بطاريات', 'pack', 90, false, true, '[{"url": "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80", "alt_ar": "إنرجايزر بطاريات قلوية ماكس مقاس AA (باك", "alt_en": "Energizer Max Alkaline AA Batteries (Pac"}]'::jsonb
FROM public.categories WHERE slug = 'electronics'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'KIT-FOIL-HEAVY-20M', id, 'ورق ألومنيوم قصدير شديد التحمل للمطبخ والشواء 20 متر', 'Heavy Duty Kitchen Aluminum Foil Roll 20m', 'قصدير سميك مقاوم للحرارة العالية ممتاز للفرن وحفظ الطعام والشواء.', 'Tear-resistant heavy gauge aluminum foil for oven baking, roasting and food wrap.', 68.00, 78.00, 'رول', 'roll', 70, false, true, '[{"url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80", "alt_ar": "ورق ألومنيوم قصدير شديد التحمل للمطبخ وا", "alt_en": "Heavy Duty Kitchen Aluminum Foil Roll 20"}]'::jsonb
FROM public.categories WHERE slug = 'kitchen-pantry'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'BBQ-CHARCOAL-BAG-5K', id, 'فحم شواء طبيعي ممتاز سريع الاشتعال 5 كجم', 'Premium Natural Lump Hardwood BBQ Charcoal 5kg', 'فحم نباتي نقي يدوم طويلاً بدرجة حرارة ثابتة وبدون دخان مزعج للشواء الممتع.', 'High heat, clean-burning natural hardwood lump charcoal for outdoor barbecue grilling.', 120.00, 140.00, 'شيكارة 5 كجم', 'bag', 45, true, true, '[{"url": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80", "alt_ar": "فحم شواء طبيعي ممتاز سريع الاشتعال 5 كجم", "alt_en": "Premium Natural Lump Hardwood BBQ Charco"}]'::jsonb
FROM public.categories WHERE slug = 'camping-bbq'
ON CONFLICT (sku) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  description_ar = EXCLUDED.description_ar,
  description_en = EXCLUDED.description_en,
  price = EXCLUDED.price,
  compare_at_price = EXCLUDED.compare_at_price,
  unit_label_ar = EXCLUDED.unit_label_ar,
  unit_label_en = EXCLUDED.unit_label_en,
  stock_quantity = EXCLUDED.stock_quantity,
  is_featured = EXCLUDED.is_featured,
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
