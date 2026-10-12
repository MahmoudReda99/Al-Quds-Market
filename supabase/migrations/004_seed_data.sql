-- ==============================================================================
-- Al Quds Market — Phase 2: Seed Catalog & Delivery Areas
-- Migration: 004_seed_data.sql
-- ==============================================================================

-- 1. Seed Delivery Areas
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

-- 2. Seed Main Categories
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

-- 3. Seed Sample Products for Catalog
-- Fresh Produce
INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-APP-01',
  'تفاح أحمر بلدي طازج',
  'Fresh Local Red Apples',
  'تفاح أحمر مقرمش ولذيذ، قطاف يومي طازج من أفضل المزارع.',
  'Crisp and delicious sweet red apples, picked fresh daily from premium local farms.',
  id,
  12.50,
  15.00,
  'كغ',
  'kg',
  150,
  true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-BAN-01',
  'موز استوائي نخب أول',
  'Premium Bananas',
  'موز طازج غني بالطاقة والبوتاسيوم، ناضج ومثالي للاستهلاك اليومي.',
  'Fresh, naturally ripened sweet bananas packed with energy and potassium.',
  id,
  8.00,
  NULL,
  'كغ',
  'kg',
  200,
  true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-TOM-01',
  'طماطم مزارع طازجة',
  'Fresh Vine Tomatoes',
  'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية.',
  'Ripe red farm tomatoes, ideal for salads and home cooking.',
  id,
  6.50,
  8.00,
  'كغ',
  'kg',
  180,
  true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO NOTHING;

-- Dairy & Eggs
INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-MLK-01',
  'حليب طازج كامل الدسم',
  'Fresh Full Cream Milk',
  'حليب مبستر طبيعي 100% غني بالكالسيوم، سعة 1 لتر.',
  '100% pure fresh pasteurized milk rich in calcium, 1 Liter bottle.',
  id,
  9.00,
  NULL,
  'لتر',
  'liter',
  90,
  true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-EGG-01',
  'طبق بيض مزارع طازج (30 بيضة)',
  'Fresh Farm Eggs Carton (30 Pcs)',
  'بيض مزارع طازج نخب أول، مغذٍ وصحي لوجبة فطور متكاملة.',
  'Fresh grade-A farm eggs, 30 pieces carton.',
  id,
  24.00,
  28.00,
  'طبق',
  'carton',
  75,
  true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-CHS-01',
  'جبنة بيضاء بلدية مغلية',
  'Traditional White Brined Cheese',
  'جبنة نابلسية بلدية مغلية مع حبة البركة والمستكة، وزن 500 غرام.',
  'Traditional white artisanal cheese with black seed and mastic, 500g.',
  id,
  22.00,
  26.00,
  '500غ',
  '500g',
  60,
  false
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO NOTHING;

-- Bakery
INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-BRD-01',
  'خبز عربي كماج ساخن',
  'Fresh Arabic Pita Bread',
  'خبز عربي طازج من الفرن مباشرة، ربطة من 8 أرغفة.',
  'Freshly baked traditional Arabic pita bread, pack of 8.',
  id,
  4.50,
  NULL,
  'ربطة',
  'pack',
  120,
  true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (sku) DO NOTHING;

-- Pantry
INSERT INTO public.products (sku, name_ar, name_en, description_ar, description_en, category_id, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured)
SELECT
  'PROD-OIL-01',
  'زيت زيتون فلسطيني بكر ممتاز',
  'Extra Virgin Palestinian Olive Oil',
  'زيت زيتون معصور على البارد من جبال القدس، نكهة أصيلة وقيمة غذائية عالية، سعة 1 لتر.',
  'Cold-pressed extra virgin Palestinian olive oil, 1 Liter glass bottle.',
  id,
  35.00,
  42.00,
  'لتر',
  'liter',
  110,
  true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (sku) DO NOTHING;
