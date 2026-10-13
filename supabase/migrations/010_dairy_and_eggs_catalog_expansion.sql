-- ==============================================================================;
-- Migration 010: Authentic InstaShop 'Dairy & Eggs' Products Catalog Expansion;
-- Directly extracted from InstaShop 'El Wekala Al Ahly' screenshots (96 items).
-- Includes real product image crops in /products/dairy/, exact EGP prices,
-- accurate weights, packaging, and bilingual Arabic/English details.;
-- 100% Idempotent: safe to run repeatedly via Supabase SQL Editor.;
-- ==============================================================================;

-- Ensure dairy-eggs category exists
INSERT INTO public.categories (slug, name_ar, name_en, icon, image_url, sort_order, is_active)
VALUES ('dairy-eggs', 'ألبان وبيض', 'Dairy & Eggs', '🥛', '/categories/dairy-eggs.png', 4, true)
ON CONFLICT (slug) DO UPDATE SET is_active = true;

-- UPSERT PRODUCTS
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DAN-GRE-170', id, 'دانون زبادي يوناني سادة 10 جم بروتين 170 جم', 'Danone 10g Protein Plain Greek Yogurt', 'زبادي يوناني سادة غني بالبروتين الطبيعي وقليل الدسم.', 'Plain greek yogurt rich in natural protein.', 38.00, NULL, '170 جم', '170 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DAN-GRE-170.png", "alt_ar": "دانون زبادي يوناني سادة 10 جم بروتين 170", "alt_en": "Danone 10g Protein Plain Greek Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-FULL-1L', id, 'جهينة حليب كامل الدسم طويل الأجل (3% دسم) 1 لتر', 'Juhayna Long Life Full Cream Milk (3% Fat) - no added milk powder', 'حليب أبقار طبيعي مبستر خالي من البودرة المضافة.', 'Pure natural long life cow milk with no milk powder added.', 52.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-FULL-1L.png", "alt_ar": "جهينة حليب كامل الدسم طويل الأجل (3% دسم", "alt_en": "Juhayna Long Life Full Cream Milk (3% Fa"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-RUMY-MED-250', id, 'جبنة رومي وسط شرائح فاخرة 250 جم', 'Medium Rumy Cheese Slices', 'جبنة رومي مصرية معتقة وسط مقطعة شرائح للساندوتشات.', 'Medium aged traditional Egyptian Rumy cheese slices.', 68.75, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-RUMY-MED-250.png", "alt_ar": "جبنة رومي وسط شرائح فاخرة 250 جم", "alt_en": "Medium Rumy Cheese Slices"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-FULL-1L', id, 'المراعي حليب كامل الدسم طويل الأجل 1 لتر', 'Almarai Long Life Full Fat Milk - no added milk powder', 'حليب المراعي الطبيعي كامل الدسم المبستر عالي الجودة.', 'Almarai premium whole milk without added powder.', 53.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-FULL-1L.png", "alt_ar": "المراعي حليب كامل الدسم طويل الأجل 1 لتر", "alt_en": "Almarai Long Life Full Fat Milk - no add"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAM-FULL-1L', id, 'لمار حليب كامل الدسم طويل الأجل 1 لتر', 'Lamar Long Life Full Cream Milk - no added powder', 'حليب لمار طبيعي 100% معقم بدون إضافة ماء أو بودرة.', 'Lamar 100% pure long life milk without additives.', 50.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-LAM-FULL-1L.png", "alt_ar": "لمار حليب كامل الدسم طويل الأجل 1 لتر", "alt_en": "Lamar Long Life Full Cream Milk - no add"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-RUMY-BAT-250', id, 'جبنة رومي قديم بطارخ شرائح نخب أول 250 جم', 'Special Old Rumy Batarekh Cheese Slices', 'جبنة رومي قديمة بطارخ بطعم قوي أصيل ونكهة مميزة.', 'Special aged Batarekh Rumy cheese extra mature slices.', 76.25, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-RUMY-BAT-250.png", "alt_ar": "جبنة رومي قديم بطارخ شرائح نخب أول 250 ج", "alt_en": "Special Old Rumy Batarekh Cheese Slices"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-BEK-1L', id, 'جهينة بخيره حليب كامل الدسم معقم 1 لتر', 'Juhayna Bekhero Long Life Full Cream Milk', 'حليب بخيره كامل الدسم الكلاسيكي من جهينة.', 'Classic Juhayna Bekhero full cream milk pouch/carton.', 44.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-BEK-1L.png", "alt_ar": "جهينة بخيره حليب كامل الدسم معقم 1 لتر", "alt_en": "Juhayna Bekhero Long Life Full Cream Mil"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-CHED-WHT-250', id, 'جبنة شيدر أبيض شرائح 250 جم', 'White Cheddar Cheese Slices', 'شرائح جبنة شيدر أبيض ناعمة وغنية تذوب بسهولة.', 'Imported white cheddar cheese slices for burgers and toast.', 125.00, 153.13, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-CHED-WHT-250.png", "alt_ar": "جبنة شيدر أبيض شرائح 250 جم", "alt_en": "White Cheddar Cheese Slices"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-YOG-6P', id, 'جهينة زبادي طبيعي (عرض 5+1 مجاناً) 6 × 105 جم', 'Juhayna Natural Yogurt (5+1 Free)', 'زبادي جهينة الطبيعي الطازج كامل الدسم عرض التوفير.', 'Juhayna plain natural yogurt value bundle pack.', 55.00, NULL, '6 × 105 جم', '6 x 105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-YOG-6P.png", "alt_ar": "جهينة زبادي طبيعي (عرض 5+1 مجاناً) 6 × 1", "alt_en": "Juhayna Natural Yogurt (5+1 Free)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-YOG-165', id, 'المراعي زبادي طازج كامل الدسم 165 جم', 'Almarai Fresh Full Fat Yogurt', 'زبادي المراعي الطازج اللذيذ بقوام كريمي ناعم.', 'Fresh whole milk yogurt with rich smooth texture.', 16.00, NULL, '165 جم', '165 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-YOG-165.png", "alt_ar": "المراعي زبادي طازج كامل الدسم 165 جم", "alt_en": "Almarai Fresh Full Fat Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-MOZZ-280', id, 'دومتي جبنة موتزاريلا مبشورة طبيعية 280 جم', 'Domty Plain Shredded Mozzarella Cheese', 'جبنة موتزاريلا مبشورة مثالية للبيتزا والمكرونة والمخبوزات.', 'Shredded mozzarella cheese perfect for pizza and pasta.', 78.00, NULL, '280 جم', '280 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-MOZZ-280.png", "alt_ar": "دومتي جبنة موتزاريلا مبشورة طبيعية 280 ج", "alt_en": "Domty Plain Shredded Mozzarella Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-BAR-350', id, 'جبنة براميلي طبيعية سادة قالب 350 جم', 'Fresh Baramily Cheese Block', 'جبنة براميلي فلاحي طبيعية بيضاء بنكهة مصرية أصيلة.', 'Authentic Egyptian Baramily white cheese block.', 61.25, NULL, '350 جم', '350 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-BAR-350.png", "alt_ar": "جبنة براميلي طبيعية سادة قالب 350 جم", "alt_en": "Fresh Baramily Cheese Block"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-BEK-500', id, 'جهينة بخيره حليب كامل الدسم 500 مل', 'Juhayna Bekhero Long Life Full Fat Milk', 'عبوة حليب بخيره الاقتصادية اليومية.', 'Compact Bekhero full fat milk 500ml.', 24.00, NULL, '500 مل', '500 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-BEK-500.png", "alt_ar": "جهينة بخيره حليب كامل الدسم 500 مل", "alt_en": "Juhayna Bekhero Long Life Full Fat Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-MIX-CHO-200', id, 'جهينة ميكس حليب شوكولاتة معقم 200 مل', 'Juhayna Mix Long Life Chocolate Milk', 'مشروب حليب ولذيذ بالشوكولاتة بدون مواد حافظة.', 'Delicious chocolate milk free from preservatives.', 12.95, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-MIX-CHO-200.png", "alt_ar": "جهينة ميكس حليب شوكولاتة معقم 200 مل", "alt_en": "Juhayna Mix Long Life Chocolate Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-SKIM-1L', id, 'جهينة حليب خالي الدسم (0.5% دسم) 1 لتر', 'Juhayna Long Life Skimmed Milk (0.5% Fat)', 'حليب خالي الدسم غني بالكالسيوم والبروتين ومناسب للدايت.', 'Skimmed milk suitable for low-calorie healthy diets.', 52.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-SKIM-1L.png", "alt_ar": "جهينة حليب خالي الدسم (0.5% دسم) 1 لتر", "alt_en": "Juhayna Long Life Skimmed Milk (0.5% Fat"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-BUT-NZ-200', id, 'زبدة طبيعية نيوزيلندي قالب 200 جم', 'Butter Block New Zealand', 'زبدة طبيعية نقية 100% غير مملحة ممتازة للحلويات والطهي.', '100% pure New Zealand natural unsalted butter block.', 90.00, NULL, '200 جم', '200 gr', 120, false, true, '[{"url": "/products/dairy/DAI-BUT-NZ-200.png", "alt_ar": "زبدة طبيعية نيوزيلندي قالب 200 جم", "alt_en": "Butter Block New Zealand"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-GRE-180', id, 'جهينة زبادي يوناني 15 جم بروتين (0.2% دسم) 180 جم', 'Juhayna 15g Protein Greek Yogurt (0.2% Fat)', 'زبادي يوناني جهينة عالي البروتين وخالي من الدهون.', 'Juhayna high protein fat free Greek yogurt.', 43.00, NULL, '180 جم', '180 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-GRE-180.png", "alt_ar": "جهينة زبادي يوناني 15 جم بروتين (0.2% دس", "alt_en": "Juhayna 15g Protein Greek Yogurt (0.2% F"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAM-SEMI-1L', id, 'لمار حليب نصف دسم طويل الأجل 1 لتر', 'Lamar Long Life Semi-Skimmed Milk', 'حليب لمار نصف دسم مبستر متوازن وخفيف.', 'Lamar semi-skimmed pasteurized milk 1L.', 50.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-LAM-SEMI-1L.png", "alt_ar": "لمار حليب نصف دسم طويل الأجل 1 لتر", "alt_en": "Lamar Long Life Semi-Skimmed Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-COOK-200', id, 'جهينة المطبخ السعيد كريمة طهي 200 مل', 'Juhayna Happy Kitchen Cooking Cream', 'كريمة طهي غنية للشوربات والباستا والصوصات البيضاء.', 'Rich cooking cream for gourmet pasta and creamy soups.', 70.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-COOK-200.png", "alt_ar": "جهينة المطبخ السعيد كريمة طهي 200 مل", "alt_en": "Juhayna Happy Kitchen Cooking Cream"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAM-SKIM-1L', id, 'لمار حليب خالي الدسم طويل الأجل 1 لتر', 'Lamar Long Life Skimmed Milk - no added powder', 'حليب لمار خالي الدسم نقي بدون أي إضافات بودرة.', 'Lamar pure skimmed cow milk 1L.', 50.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-LAM-SKIM-1L.png", "alt_ar": "لمار حليب خالي الدسم طويل الأجل 1 لتر", "alt_en": "Lamar Long Life Skimmed Milk - no added "}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-COT-250', id, 'جبنة قريش فلاحي طازجة صحية 250 جم', 'Fresh Cottage Cheese', 'جبنة قريش طبيعية قليلة الملح والدسم غنية بالبروتين.', 'Fresh Egyptian Karish cottage cheese low in salt.', 27.50, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-COT-250.png", "alt_ar": "جبنة قريش فلاحي طازجة صحية 250 جم", "alt_en": "Fresh Cottage Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-FULL-15L', id, 'المراعي حليب كامل الدسم طويل الأجل 1.5 لتر', 'Almarai Long Life Full Fat Milk - no added milk powder', 'حجم عائلي اقتصادي من حليب المراعي الطبيعي كامل الدسم.', 'Family size 1.5L carton of pure Almarai whole milk.', 80.00, NULL, '1.5 لتر', '1.5 L', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-FULL-15L.png", "alt_ar": "المراعي حليب كامل الدسم طويل الأجل 1.5 ل", "alt_en": "Almarai Long Life Full Fat Milk - no add"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-BAR-PEP-350', id, 'جبنة براميلي بالفلفل الأخضر الحار قالب 350 جم', 'Fresh Baramily Cheese with Pepper', 'جبنة براميلي طبيعية مع قطف الفلفل الأخضر الحار اللذيذ.', 'Authentic Baramily white cheese infused with green chili.', 61.25, NULL, '350 جم', '350 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-BAR-PEP-350.png", "alt_ar": "جبنة براميلي بالفلفل الأخضر الحار قالب 3", "alt_en": "Fresh Baramily Cheese with Pepper"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-COOK-200', id, 'المراعي كريمة طهي خالية من المواد الحافظة 200 مل', 'Almarai Cooking Cream - preservatives free', 'كريمة طهي المراعي الفاخرة للطبخ المنزلي المتقن.', 'Almarai premium cooking cream without preservatives.', 70.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-COOK-200.png", "alt_ar": "المراعي كريمة طهي خالية من المواد الحافظ", "alt_en": "Almarai Cooking Cream - preservatives fr"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-OBR-FULL-1L', id, 'عبور لاند حليب كامل الدسم معقم 1 لتر', 'Obour Land Long Life Full Cream Milk', 'حليب عبور لاند كامل الدسم خالي من المواد الحافظة والبودرة.', 'Obour Land long life full cream cow milk.', 48.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-OBR-FULL-1L.png", "alt_ar": "عبور لاند حليب كامل الدسم معقم 1 لتر", "alt_en": "Obour Land Long Life Full Cream Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-MIX-STR-200', id, 'جهينة ميكس حليب فراولة معقم 200 مل', 'Juhayna Mix Long Life Strawberry Milk', 'حليب جهينة بالفراولة الطبيعية المنعشة والمحبوبة.', 'Strawberry flavored milk with natural fruit taste.', 12.95, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-MIX-STR-200.png", "alt_ar": "جهينة ميكس حليب فراولة معقم 200 مل", "alt_en": "Juhayna Mix Long Life Strawberry Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-KHO-WHT-250', id, 'خشالة جبنة شيدر أبيض قالب 250 جم', 'Khoshala White Cheddar Cheese', 'جبنة شيدر أبيض فاخرة للساندوتشات والوجبات الخفيفة.', 'Premium white cheddar cheese block.', 125.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-KHO-WHT-250.png", "alt_ar": "خشالة جبنة شيدر أبيض قالب 250 جم", "alt_en": "Khoshala White Cheddar Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-GRE-BER-180', id, 'جهينة زبادي يوناني ميكس توت قليل الدسم 12 جم بروتين 180 جم', 'Juhayna Low Fat 12g Protein Mixed Berry Greek Yogurt', 'زبادي يوناني بقطع التوت المشكل غني بمضادات الأكسدة.', 'Mixed berry Greek yogurt high protein low fat.', 46.00, NULL, '180 جم', '180 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-GRE-BER-180.png", "alt_ar": "جهينة زبادي يوناني ميكس توت قليل الدسم 1", "alt_en": "Juhayna Low Fat 12g Protein Mixed Berry "}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-LGT-6P', id, 'جهينة زبادي لايت قليل الدسم (5+1 مجاناً) 6 × 105 جم', 'Juhayna Light Yogurt (5+1 Free)', 'زبادي لايت خفيف ولذيذ عرض توفير عائلي.', 'Juhayna light diet yogurt value pack.', 55.00, NULL, '6 × 105 جم', '6 x 105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-LGT-6P.png", "alt_ar": "جهينة زبادي لايت قليل الدسم (5+1 مجاناً)", "alt_en": "Juhayna Light Yogurt (5+1 Free)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-GRE-5FAT-180', id, 'جهينة زبادي يوناني 12 جم بروتين (5% دسم) 180 جم', 'Juhayna 12g Protein Greek Yogurt (5% Fat)', 'زبادي يوناني كامل الدسم بقوام سميك كريمي فاخر.', 'Full fat thick creamy Greek yogurt 12g protein.', 43.00, NULL, '180 جم', '180 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-GRE-5FAT-180.png", "alt_ar": "جهينة زبادي يوناني 12 جم بروتين (5% دسم)", "alt_en": "Juhayna 12g Protein Greek Yogurt (5% Fat"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-KAT-LOW-250', id, 'قتيلو جبنة بيضاء طبيعية قليلة الملح 250 جم', 'Katilo White Cheese - low salt', 'جبنة قتيلو الدمياطي الشهيرة خفيفة الملح من حليب طبيعي.', 'Katilo famous Damietta white cheese with low salt.', 40.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-KAT-LOW-250.png", "alt_ar": "قتيلو جبنة بيضاء طبيعية قليلة الملح 250 ", "alt_en": "Katilo White Cheese - low salt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-BUT-FERN-1K', id, 'فيرن سمن / زبدة طبيعية خليط نقية 1 كجم', 'Fern Pure Butter', 'زبدة فيرن الطبيعية للحلويات الشرقية والطبخ برائحة زكية.', 'Fern premium butter blend for oriental desserts and cooking.', 170.00, NULL, '1 كجم', '1 kg', 120, false, true, '[{"url": "/products/dairy/DAI-BUT-FERN-1K.png", "alt_ar": "فيرن سمن / زبدة طبيعية خليط نقية 1 كجم", "alt_en": "Fern Pure Butter"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-AVN-SMK-250', id, 'أفانتي جبنة شيدر مدخن شرائح 250 جم', 'Avanti Smoked Cheddar Cheese Slices', 'شرائح شيدر مدخن بنكهة خشبية مميزة وسلسة.', 'Avanti smoked cheddar cheese deli slices.', 90.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-AVN-SMK-250.png", "alt_ar": "أفانتي جبنة شيدر مدخن شرائح 250 جم", "alt_en": "Avanti Smoked Cheddar Cheese Slices"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-KIR-SQU-6P', id, 'كيري جبنة مربعات بالقشطة الطازجة (6 قطع) 100 جم', 'Kiri Cream Cheese Square (6 Portions)', 'جبنة كيري الكريمية الغنية بالقشطة الطازجة والمحبوبة للأطفال.', 'Kiri soft cream cheese portions made with fresh cream.', 93.00, NULL, '100 جم', '100 gr', 120, false, true, '[{"url": "/products/dairy/DAI-KIR-SQU-6P.png", "alt_ar": "كيري جبنة مربعات بالقشطة الطازجة (6 قطع)", "alt_en": "Kiri Cream Cheese Square (6 Portions)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-RAY-220', id, 'المراعي لبن رايب طازج مهضم 220 جم', 'Almarai Fresh Laban Rayeb', 'لبن رايب طازج خفيف يساعد على الهضم وراحة المعدة.', 'Fresh cultured buttermilk aiding healthy digestion.', 20.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-RAY-220.png", "alt_ar": "المراعي لبن رايب طازج مهضم 220 جم", "alt_en": "Almarai Fresh Laban Rayeb"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-GRE-STR-180', id, 'جهينة زبادي يوناني بالفراولة 12 جم بروتين 180 جم', 'Juhayna Low Fat 12g Protein Strawberry Greek Yogurt - low sugar', 'زبادي يوناني بالفراولة قليل السكر وعالي البروتين.', 'Greek yogurt with strawberry pieces and low sugar.', 46.00, NULL, '180 جم', '180 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-GRE-STR-180.png", "alt_ar": "جهينة زبادي يوناني بالفراولة 12 جم بروتي", "alt_en": "Juhayna Low Fat 12g Protein Strawberry G"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MIR-POW-400', id, 'ميرو حليب مجفف كامل الدسم سريع الذوبان 400 جم', 'Miro Full Cream Instant Milk Powder', 'حليب بودرة كامل الدسم غني بالكالسيوم والفيتامينات.', 'Instant full cream powdered milk for drinks and baking.', 165.00, NULL, '400 جم', '400 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MIR-POW-400.png", "alt_ar": "ميرو حليب مجفف كامل الدسم سريع الذوبان 4", "alt_en": "Miro Full Cream Instant Milk Powder"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MIR-POW-700', id, 'ميرو حليب بودرة كامل الدسم كيس اقتصادي 700 جم', 'Miro Full Cream Powdered Milk', 'عبوة توفير عائلية من حليب ميرو البودرة المجفف.', 'Large family pack instant dried milk powder.', 279.00, NULL, '700 جم', '700 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MIR-POW-700.png", "alt_ar": "ميرو حليب بودرة كامل الدسم كيس اقتصادي 7", "alt_en": "Miro Full Cream Powdered Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-RAY-TOT-220', id, 'جهينة توتال بالانس لبن رايب أصلي بروبيوتيك 220 جم', 'Juhayna Total Balance Original Laban Rayeb with 3 Active Probiotics', 'رايب معزز بثلاثة أنواع من البكتيريا النافعة لصحة الأمعاء.', 'Cultured probiotic milk with 3 active digestive cultures.', 19.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-RAY-TOT-220.png", "alt_ar": "جهينة توتال بالانس لبن رايب أصلي بروبيوت", "alt_en": "Juhayna Total Balance Original Laban Ray"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-GRE-2FAT-170', id, 'المراعي زبادي يوناني سادة 10 جم بروتين (2% دسم) 170 جم', 'Almarai 10g Protein Plain Greek Yogurt (2% Fat)', 'زبادي يوناني نقي من المراعي خالي من المواد الحافظة.', 'Almarai natural Greek yogurt 10g protein.', 44.00, NULL, '170 جم', '170 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-GRE-2FAT-170.png", "alt_ar": "المراعي زبادي يوناني سادة 10 جم بروتين (", "alt_en": "Almarai 10g Protein Plain Greek Yogurt ("}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-FULL-200M', id, 'المراعي حليب كامل الدسم طويل الأجل 200 مل', 'Almarai Long Life Full Fat Milk - no added milk powder', 'عبوة حليب المراعي الصغيرة سهلة الحمل للمدرسة والعمل.', 'Pocket size whole milk carton 200ml.', 15.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-FULL-200M.png", "alt_ar": "المراعي حليب كامل الدسم طويل الأجل 200 م", "alt_en": "Almarai Long Life Full Fat Milk - no add"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-YOG-1K', id, 'جهينة المطبخ السعيد زبادي طبيعي سطل توفير 1 كجم', 'Juhayna Happy Kitchen Natural Yogurt (Save 25%)', 'سطل زبادي جهينة العائلي للطهي وصواني الأرز والفتة.', 'Juhayna jumbo 1kg natural cooking yogurt tub.', 95.00, NULL, '1 كجم', '1 kg', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-YOG-1K.png", "alt_ar": "جهينة المطبخ السعيد زبادي طبيعي سطل توفي", "alt_en": "Juhayna Happy Kitchen Natural Yogurt (Sa"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-PLU-VEG-500', id, 'دومتي بلس جبنة فيتا بدهن نباتي 500 جم', 'Domty Plus Feta Cheese with Vegetable Fat', 'جبنة فيتا دومتي سهلة الفرد بنكهة محبوبة.', 'Domty feta cheese with vegetable fats.', 52.00, NULL, '500 جم', '500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-PLU-VEG-500.png", "alt_ar": "دومتي بلس جبنة فيتا بدهن نباتي 500 جم", "alt_en": "Domty Plus Feta Cheese with Vegetable Fa"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-RAY-PRO-1L', id, 'جهينة لبن رايب طبيعي كامل الدسم بروبيوتيك 1 لتر', 'Juhayna Natural Full Cream Laban Rayeb with Probiotics', 'لبن رايب جهينة العائلي المنعش مع الوجبات الدسمة.', 'Refreshing 1L probiotic rayeb bottle for digestion.', 55.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-RAY-PRO-1L.png", "alt_ar": "جهينة لبن رايب طبيعي كامل الدسم بروبيوتي", "alt_en": "Juhayna Natural Full Cream Laban Rayeb w"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-MIX-BAN-200', id, 'جهينة ميكس حليب بالموز معقم 200 مل', 'Juhayna Mix Long Life Banana Milk', 'حليب جهينة بنكهة الموز اللذيذة خالي من الألوان الصناعية.', 'Sweet banana flavored milk without artificial colors.', 12.95, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-MIX-BAN-200.png", "alt_ar": "جهينة ميكس حليب بالموز معقم 200 مل", "alt_en": "Juhayna Mix Long Life Banana Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-LAC-FRE-1L', id, 'جهينة حليب خالي اللاكتوز معقم 1 لتر', 'Juhayna Long Life Skimmed Milk (0.5% Fat) - lactose free', 'حليب معقم خالي من اللاكتوز لمرضى حساسية الحليب والهضم الحساس.', 'Lactose-free ultra-pasteurized cow milk for easy digestion.', 110.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-LAC-FRE-1L.png", "alt_ar": "جهينة حليب خالي اللاكتوز معقم 1 لتر", "alt_en": "Juhayna Long Life Skimmed Milk (0.5% Fat"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-TRT-BER-105', id, 'المراعي تريتس زبادي بالتوت المشكل 105 جم', 'Almarai Treats Berries Yogurt', 'زبادي محلى بقطع التوت اللذيذة سناك حلو ومغذي.', 'Flavored yogurt with sweet berry compote chunks.', 15.00, NULL, '105 جم', '105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-TRT-BER-105.png", "alt_ar": "المراعي تريتس زبادي بالتوت المشكل 105 جم", "alt_en": "Almarai Treats Berries Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-WHI-200', id, 'جهينة المطبخ السعيد كريمة خفق للحلويات 200 مل', 'Juhayna Happy Kitchen Whipping Cream', 'كريمة خفق متماسكة لتزيين التورت والحلويات والكيك.', 'Rich dessert whipping cream for frosting and mousse.', 70.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-WHI-200.png", "alt_ar": "جهينة المطبخ السعيد كريمة خفق للحلويات 2", "alt_en": "Juhayna Happy Kitchen Whipping Cream"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-YOG-STR-220', id, 'المراعي يو جو مشروب زبادي بالفراولة وقطع الفاكهة 220 جم', 'Almarai Yo Go Strawberry Yogurt Drink with Fruit Pieces', 'مشروب زبادي منعش بقطع الفراولة الطبيعية.', 'Smooth yogurt smoothie with real strawberry bits.', 19.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-YOG-STR-220.png", "alt_ar": "المراعي يو جو مشروب زبادي بالفراولة وقطع", "alt_en": "Almarai Yo Go Strawberry Yogurt Drink wi"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-FET-250', id, 'دومتي بلس جبنة فيتا 250 جم', 'Domty Plus Feta Cheese', 'علبة جبنة فيتا دومتي صغيرة عملية.', 'Compact 250g feta cheese pack.', 27.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-FET-250.png", "alt_ar": "دومتي بلس جبنة فيتا 250 جم", "alt_en": "Domty Plus Feta Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JIB-ABU-8P', id, 'جبنة أبو الولد مثلثات قابلة للدهن (8 مثلثات) 104 جم', 'Jibnet Abu Al Walad Cheese Triangles (8 Portions)', 'الجبنة المثلثات المحبوبة للأطفال وساندوتشات المدرسة.', 'Famous cheese spread triangles for kids'' snacks.', 37.00, NULL, '104 جم', '104 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JIB-ABU-8P.png", "alt_ar": "جبنة أبو الولد مثلثات قابلة للدهن (8 مثل", "alt_en": "Jibnet Abu Al Walad Cheese Triangles (8 "}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-OBR-FET-500', id, 'عبور لاند جبنة فيتا بيضاء ناعمة 500 جم', 'Obour Land Feta Cheese', 'جبنة فيتا عبور لاند خفيفة وشهية للسلطة والفطور.', 'Smooth creamy feta cheese tub from Obour Land.', 52.00, NULL, '500 جم', '500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-OBR-FET-500.png", "alt_ar": "عبور لاند جبنة فيتا بيضاء ناعمة 500 جم", "alt_en": "Obour Land Feta Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-GRE-5FAT-170', id, 'المراعي زبادي يوناني سادة (5% دسم) 170 جم', 'Almarai 10g Protein Plain Greek Yogurt (5% Fat)', 'زبادي يوناني كامل الدسم بنعومة ونكهة غنية.', 'Almarai full cream plain Greek yogurt 10g protein.', 44.00, NULL, '170 جم', '170 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-GRE-5FAT-170.png", "alt_ar": "المراعي زبادي يوناني سادة (5% دسم) 170 ج", "alt_en": "Almarai 10g Protein Plain Greek Yogurt ("}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-ROQ-200', id, 'جبنة ريكفورد زرقاء دنماركي فاخرة 200 جم', 'Danish Roquefort Blue Cheese', 'جبنة زرقاء معتقة بنكهة قوية مميزة لعشاق الأجبان.', 'Premium imported blue cheese with bold piquant flavor.', 145.00, NULL, '200 جم', '200 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-ROQ-200.png", "alt_ar": "جبنة ريكفورد زرقاء دنماركي فاخرة 200 جم", "alt_en": "Danish Roquefort Blue Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-AVN-OLI-250', id, 'أفانتي جبنة شيدر شرائح بالزيتون 250 جم', 'Avanti Cheddar Cheese Slices with Olives', 'شيدر شرائح ممزوج بقطع الزيتون الأخضر والأسود.', 'Processed cheddar cheese slices blended with sliced olives.', 87.50, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-AVN-OLI-250.png", "alt_ar": "أفانتي جبنة شيدر شرائح بالزيتون 250 جم", "alt_en": "Avanti Cheddar Cheese Slices with Olives"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-TRT-TAR-105', id, 'المراعي تريتس زبادي تارت الفراولة 105 جم', 'Almarai Treats Strawberry Tart Yogurt', 'زبادي بنكهة تارت الفراولة وقرمشة خفيفة.', 'Sweet strawberry tart dessert yogurt cup.', 15.00, NULL, '105 جم', '105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-TRT-TAR-105.png", "alt_ar": "المراعي تريتس زبادي تارت الفراولة 105 جم", "alt_en": "Almarai Treats Strawberry Tart Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-ZAB-PEA-220', id, 'جهينة زبادو مشروب زبادي بالخوخ 220 جم', 'Juhayna Zabado Peach Yogurt Drink', 'مشروب زبادو المنعش بقطع وخلاصة الخوخ الطبيعي.', 'Zabado refreshing peach flavored yogurt drink.', 18.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-ZAB-PEA-220.png", "alt_ar": "جهينة زبادو مشروب زبادي بالخوخ 220 جم", "alt_en": "Juhayna Zabado Peach Yogurt Drink"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-HLF-1L', id, 'جهينة حليب نصف دسم (1.5% دسم) معقم 1 لتر', 'Juhayna Long Life Half Cream Milk (1.5% Fat)', 'حليب جهينة نصف دسم خفيف وصحي للاستخدام اليومي.', 'Juhayna half cream semi-skimmed milk.', 56.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-HLF-1L.png", "alt_ar": "جهينة حليب نصف دسم (1.5% دسم) معقم 1 لتر", "alt_en": "Juhayna Long Life Half Cream Milk (1.5% "}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-YOG-12P', id, 'المراعي زبادي طازج كامل الدسم (عرض 9+3 مجاناً) 12 × 105 جم', 'Almarai Fresh Full Fat Yogurt (9+3 Free)', 'كرتونة توفير عائلية كبرى من زبادي المراعي الطازج.', 'Family mega value pack 12 yogurt cups.', 110.00, NULL, '12 × 105 جم', '12 x 105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-YOG-12P.png", "alt_ar": "المراعي زبادي طازج كامل الدسم (عرض 9+3 م", "alt_en": "Almarai Fresh Full Fat Yogurt (9+3 Free)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-GRE-STR-170', id, 'المراعي زبادي يوناني بالفراولة وقطع الفاكهة 8 جم بروتين 170 جم', 'Almarai 8g Protein Strawberry Greek Yogurt with Real Fruit Pieces', 'زبادي يوناني طبيعي ممزوج بقطع الفراولة الطبيعية.', 'Almarai Greek yogurt filled with real strawberry fruit.', 44.00, NULL, '170 جم', '170 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-GRE-STR-170.png", "alt_ar": "المراعي زبادي يوناني بالفراولة وقطع الفا", "alt_en": "Almarai 8g Protein Strawberry Greek Yogu"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-BUT-100', id, 'المراعي زبدة طبيعية غير مملحة 100 جم', 'Almarai Unsalted Natural Butter', 'زبدة المراعي الطبيعية الفاخرة للطبخ الفندقي والحلويات.', 'Almarai premium pure unsalted natural dairy butter.', 115.00, NULL, '100 جم', '100 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-BUT-100.png", "alt_ar": "المراعي زبدة طبيعية غير مملحة 100 جم", "alt_en": "Almarai Unsalted Natural Butter"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-FULL-15L', id, 'جهينة حليب كامل الدسم طويل الأجل 1.5 لتر', 'Juhayna Long Life Full Fat Milk (3% Fat) - no added milk powder', 'عبوة جهينة الكبيرة الموفرة للأسرة.', 'Juhayna 1.5L economy family milk pack.', 75.00, NULL, '1.5 لتر', '1.5 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-FULL-15L.png", "alt_ar": "جهينة حليب كامل الدسم طويل الأجل 1.5 لتر", "alt_en": "Juhayna Long Life Full Fat Milk (3% Fat)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-COOK-500', id, 'المراعي كريمة طهي خالية من المواد الحافظة 500 مل', 'Almarai Cooking Cream - preservatives free', 'حجم كبير من كريمة طهي المراعي لجميع وجبات العائلة.', 'Large 500ml cooking cream carton for family meals.', 155.00, NULL, '500 مل', '500 ml', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-COOK-500.png", "alt_ar": "المراعي كريمة طهي خالية من المواد الحافظ", "alt_en": "Almarai Cooking Cream - preservatives fr"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-AVN-JAL-250', id, 'أفانتي جبنة شرائح بالفلفل الهالبينو الحار 250 جم', 'Avanti Cheese Slices with Jalapeno Pepper', 'شرائح جبنة شيدر متبلة بقطع الفلفل الهالبينو المكسيكي.', 'Spicy cheddar slices blended with fiery jalapenos.', 87.50, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-AVN-JAL-250.png", "alt_ar": "أفانتي جبنة شرائح بالفلفل الهالبينو الحا", "alt_en": "Avanti Cheese Slices with Jalapeno Peppe"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-RAY-900', id, 'المراعي لبن رايب طازج عائلي 900 جم', 'Almarai Fresh Full Fat Laban Rayeb', 'زجاجة لبن رايب عائلية كبيرة ومنعشة.', 'Large 900g bottle of fresh probiotic rayeb.', 55.00, NULL, '900 جم', '900 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-RAY-900.png", "alt_ar": "المراعي لبن رايب طازج عائلي 900 جم", "alt_en": "Almarai Fresh Full Fat Laban Rayeb"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-MIX-VAN-200', id, 'جهينة ميكس حليب بالفانيليا 200 مل', 'Juhayna Mix Long Life Vanilla Milk', 'حليب بنكهة الفانيليا الفرنسية الناعمة واللذيذة.', 'Aromatic sweet vanilla flavored milk box.', 12.95, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-MIX-VAN-200.png", "alt_ar": "جهينة ميكس حليب بالفانيليا 200 مل", "alt_en": "Juhayna Mix Long Life Vanilla Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-LGT-500', id, 'دومتي بلس جبنة فيتا لايت قليلة الملح والدسم 500 جم', 'Domty Plus Light Feta Cheese', 'جبنة فيتا لايت مثالية لأنظمة الدايت والصحة والرشاقة.', 'Light feta cheese with lower salt and fat content.', 52.00, NULL, '500 جم', '500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-LGT-500.png", "alt_ar": "دومتي بلس جبنة فيتا لايت قليلة الملح وال", "alt_en": "Domty Plus Light Feta Cheese"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-TEA-TRI-8P', id, 'طعمة ميلك جبنة مثلثات (8 مثلثات) 100 جم', 'Teama Milk Cheese Triangles (8 Portions)', 'جبنة مثلثات طعمة الغنية بالحليب والمغذية.', 'Teama creamy triangle cheese spread 8 portions.', 40.00, NULL, '100 جم', '100 gr', 120, false, true, '[{"url": "/products/dairy/DAI-TEA-TRI-8P.png", "alt_ar": "طعمة ميلك جبنة مثلثات (8 مثلثات) 100 جم", "alt_en": "Teama Milk Cheese Triangles (8 Portions)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-SPR-PLA-220', id, 'دومتي جبنة كريمي سبريد سادة برطمان 220 جم', 'Domty Creamy Plain Cheese Spread', 'جبنة قابلة للدهن ناعمة خالية من الزيوت النباتية.', 'Pure cream cheese spread free from vegetable oil.', 90.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-SPR-PLA-220.png", "alt_ar": "دومتي جبنة كريمي سبريد سادة برطمان 220 ج", "alt_en": "Domty Creamy Plain Cheese Spread"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-ZAB-BER-220', id, 'جهينة زبادو مشروب زبادي بالتوت المشكل 220 جم', 'Juhayna Zabado Mixed Berries Yogurt Drink', 'مشروب زبادو توت مشكل منعش ولذيذ.', 'Mixed berries flavored smooth yogurt drink.', 18.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-ZAB-BER-220.png", "alt_ar": "جهينة زبادو مشروب زبادي بالتوت المشكل 22", "alt_en": "Juhayna Zabado Mixed Berries Yogurt Drin"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-BUT-200', id, 'المراعي زبدة طبيعية غير مملحة قالب 200 جم', 'Almarai Unsalted Natural Butter', 'قالب زبدة طبيعية المراعي 200 جم للطهي الفاخر.', 'Premium natural unsalted dairy butter block 200g.', 225.00, NULL, '200 جم', '200 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-BUT-200.png", "alt_ar": "المراعي زبدة طبيعية غير مملحة قالب 200 ج", "alt_en": "Almarai Unsalted Natural Butter"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MIR-POW-250', id, 'ميرو حليب مجفف كامل الدسم كيس 250 جم', 'Miro Full Cream Powdered Milk', 'حليب مجفف نقي سهل الذوبان للمشروبات الساخنة.', 'Pure instant whole milk powder 250g.', 115.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MIR-POW-250.png", "alt_ar": "ميرو حليب مجفف كامل الدسم كيس 250 جم", "alt_en": "Miro Full Cream Powdered Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-KAT-NAT-500', id, 'قتيلو جبنة طبيعية دمياطي قليلة الملح 500 جم', 'Katilo Natural Cheese - low salt', 'جبنة بيضاء طبيعية معتقة على الطريقة الدمياطية التراثية.', 'Authentic Damietta natural aged white cheese block.', 175.00, NULL, '500 جم', '500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-KAT-NAT-500.png", "alt_ar": "قتيلو جبنة طبيعية دمياطي قليلة الملح 500", "alt_en": "Katilo Natural Cheese - low salt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAM-SKIM-200M', id, 'لمار حليب خالي الدسم معقم 200 مل', 'Lamar Long Life Skimmed Milk', 'عبوة حليب لمار خالي الدسم صغيرة فردية.', 'Single serve skimmed milk box 200ml.', 14.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-LAM-SKIM-200M.png", "alt_ar": "لمار حليب خالي الدسم معقم 200 مل", "alt_en": "Lamar Long Life Skimmed Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-FRI-EDAM-250', id, 'فريكو جبنة إيدام هولندي خفيفة شرائح 250 جم', 'Frico Mild Edam Cheese Slices', 'جبنة إيدام هولندية أصلية مستوردة مقطعة شرائح رفيعة.', 'Imported Dutch mild Edam cheese sandwich slices.', 157.50, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-FRI-EDAM-250.png", "alt_ar": "فريكو جبنة إيدام هولندي خفيفة شرائح 250 ", "alt_en": "Frico Mild Edam Cheese Slices"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-KAR-EGY-250', id, 'جبنة قريش مصرية طازجة مصفاة 250 جم', 'Karish Fresh Cottage Cheese Egypt', 'جبنة قريش طازجة يومياً خالية من الدهون والزيوت.', 'Fresh Egyptian traditional farm cottage cheese.', 27.50, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-KAR-EGY-250.png", "alt_ar": "جبنة قريش مصرية طازجة مصفاة 250 جم", "alt_en": "Karish Fresh Cottage Cheese Egypt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-PUK-CRE-160', id, 'بوك قشطة مائدة معدلة بدهن نباتي 160 جم', 'Puck Analogue Cream', 'قشطة بوك الغنية للحلويات الشرقية والعسل والفطير.', 'Puck rich and creamy dessert and breakfast cream.', 85.00, NULL, '160 جم', '160 gr', 120, false, true, '[{"url": "/products/dairy/DAI-PUK-CRE-160.png", "alt_ar": "بوك قشطة مائدة معدلة بدهن نباتي 160 جم", "alt_en": "Puck Analogue Cream"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-ZAB-PEA-440', id, 'جهينة زبادو مشروب زبادي بالخوخ حجم كبير 440 جم', 'Juhayna Zabado Peach Yogurt Drink', 'زجاجة زبادو خوخ كبيرة منعشة للمشاركة.', 'Large 440g Zabado peach smoothie bottle.', 32.00, NULL, '440 جم', '440 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-ZAB-PEA-440.png", "alt_ar": "جهينة زبادو مشروب زبادي بالخوخ حجم كبير ", "alt_en": "Juhayna Zabado Peach Yogurt Drink"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-YOG-STR-425', id, 'المراعي يو جو مشروب زبادي بالفراولة حجم كبير 425 جم', 'Almarai Yo Go Strawberry Yogurt Drink with Fruit Pieces', 'مشروب زبادي المراعي بحجم كبير وقطع الفراولة الوفيرة.', 'Large 425g strawberry yogurt smoothie bottle.', 32.00, NULL, '425 جم', '425 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-YOG-STR-425.png", "alt_ar": "المراعي يو جو مشروب زبادي بالفراولة حجم ", "alt_en": "Almarai Yo Go Strawberry Yogurt Drink wi"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MIR-POW-1500', id, 'ميرو حليب بودرة كامل الدسم عبوة عملاقة 1500 جم', 'Miro Powdered Milk Full Cream', 'عبوة التوفير القصوى 1.5 كجم للمنزل ومشاريع الحلويات.', 'Jumbo economy 1.5kg milk powder family pack.', 635.00, NULL, '1.5 كجم', '1500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MIR-POW-1500.png", "alt_ar": "ميرو حليب بودرة كامل الدسم عبوة عملاقة 1", "alt_en": "Miro Powdered Milk Full Cream"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-SPR-CHD-220', id, 'دومتي جبنة كريمي بطعم الشيدر برطمان 220 جم', 'Domty Creamy Cheese Spread Cheddar Flavor', 'جبنة قابلة للدهن غنية بنكهة الشيدر الصفراء.', 'Smooth cheese spread infused with sharp cheddar flavor.', 90.00, NULL, '220 جم', '220 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-SPR-CHD-220.png", "alt_ar": "دومتي جبنة كريمي بطعم الشيدر برطمان 220 ", "alt_en": "Domty Creamy Cheese Spread Cheddar Flavo"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-ACT-YOG-170', id, 'أكتيفيا زبادي طبيعي بالبروبيوتيك المعزز 170 جم', 'Activia Natural Yogurt', 'زبادي أكتيفيا المساعد على تنظيم حركة الجهاز الهضمي.', 'Activia natural probiotic yogurt for gut health.', 16.00, NULL, '170 جم', '170 gr', 120, false, true, '[{"url": "/products/dairy/DAI-ACT-YOG-170.png", "alt_ar": "أكتيفيا زبادي طبيعي بالبروبيوتيك المعزز ", "alt_en": "Activia Natural Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-YOG-BER-105', id, 'جهينة زبادي بالتوت المشكل خالي من المواد الحافظة 105 جم', 'Juhayna Mixed Berry Yogurt', 'زبادي فاكهة طبيعي ولذيذ بقطع التوت الصحي.', 'Fruity natural yogurt cup with real berries.', 13.00, NULL, '105 جم', '105 gr', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-YOG-BER-105.png", "alt_ar": "جهينة زبادي بالتوت المشكل خالي من المواد", "alt_en": "Juhayna Mixed Berry Yogurt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DOM-FET-OLI-500', id, 'دومتي بلس جبنة فيتا بقطع الزيتون الطبيعي 500 جم', 'Domty Plus Feta Cheese with Olives', 'جبنة فيتا بيضاء بنكهة الزيتون المتوسطي الرائعة.', 'Feta cheese loaded with Mediterranean olive bits.', 52.00, NULL, '500 جم', '500 gr', 120, false, true, '[{"url": "/products/dairy/DAI-DOM-FET-OLI-500.png", "alt_ar": "دومتي بلس جبنة فيتا بقطع الزيتون الطبيعي", "alt_en": "Domty Plus Feta Cheese with Olives"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-WHI-200', id, 'المراعي كريمة خفق للحلويات 200 مل', 'Almarai Whipping Cream', 'كريمة خفق متماسكة لتزيين التورت والكيك والآيس كريم.', 'Premium dairy whipping cream for fine bakery topping.', 70.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-WHI-200.png", "alt_ar": "المراعي كريمة خفق للحلويات 200 مل", "alt_en": "Almarai Whipping Cream"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-KIR-SQU-24P', id, 'كيري مربعات جبنة بالقشطة (24 قطعة) 400 جم', 'Kiri Cream Cheese Square (24 Portions)', 'عبوة كيري الكبيرة العائلية 24 قطعة للتشيز كيك والفطور.', 'Family size 24 portions of Kiri cream cheese.', 325.00, NULL, '400 جم', '400 gr', 120, false, true, '[{"url": "/products/dairy/DAI-KIR-SQU-24P.png", "alt_ar": "كيري مربعات جبنة بالقشطة (24 قطعة) 400 ج", "alt_en": "Kiri Cream Cheese Square (24 Portions)"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-AVN-CUM-250', id, 'أفانتي جبنة شيدر شرائح بالكمون الطبيعي 250 جم', 'Avanti Cheddar Cheese Slices with Cumin', 'شرائح شيدر ممزوجة بحبوب الكمون البلدي العطرية.', 'Cheddar slices infused with aromatic cumin seeds.', 90.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-AVN-CUM-250.png", "alt_ar": "أفانتي جبنة شيدر شرائح بالكمون الطبيعي 2", "alt_en": "Avanti Cheddar Cheese Slices with Cumin"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-KAT-100-250', id, 'قتيلو جبنة طبيعية 100% قليلة الملح 250 جم', 'Katilo 100% Natural Cheese - low salt', 'جبنة بيضاء طبيعية نقية 100% من حليب أبقار مصري ممتاز.', '100% natural low-salt Egyptian white cheese.', 95.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-KAT-100-250.png", "alt_ar": "قتيلو جبنة طبيعية 100% قليلة الملح 250 ج", "alt_en": "Katilo 100% Natural Cheese - low salt"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-PRE-SPR-240', id, 'بريزيدون جبنة كريمي قابلة للدهن برطمان 240 جم', 'President Cream Cheese Spread', 'جبنة بريزيدون الفرنسية الأصلية السلسة الغنية بالقشطة.', 'President smooth French cream cheese spread jar.', 175.00, NULL, '240 جم', '240 gr', 120, false, true, '[{"url": "/products/dairy/DAI-PRE-SPR-240.png", "alt_ar": "بريزيدون جبنة كريمي قابلة للدهن برطمان 2", "alt_en": "President Cream Cheese Spread"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-DAR-COC-400', id, 'داريا حليب جوز الهند الطبيعي معلب 400 مل', 'Daria Coconut Milk', 'حليب جوز هند استوائي غني للحلويات والصلصات والشوربات الآسيوية.', 'Canned rich coconut milk for culinary and dessert uses.', 95.00, NULL, '400 مل', '400 ml', 120, false, true, '[{"url": "/products/dairy/DAI-DAR-COC-400.png", "alt_ar": "داريا حليب جوز الهند الطبيعي معلب 400 مل", "alt_en": "Daria Coconut Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-KIR-SPR-150', id, 'كيري جبنة كريمي سهلة الدهن عبوة 150 جم', 'Kiri Creamy Cheese Spread', 'كيري في عبوة سهلة الفرد على التوست والتوست المقرمش.', 'Kiri spreadable tub for smooth bread spread.', 113.00, NULL, '150 جم', '150 gr', 120, false, true, '[{"url": "/products/dairy/DAI-KIR-SPR-150.png", "alt_ar": "كيري جبنة كريمي سهلة الدهن عبوة 150 جم", "alt_en": "Kiri Creamy Cheese Spread"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-TEA-TRI-16P', id, 'طعمة ميلك جبنة مثلثات (16 مثلث) 200 جم', 'Teama Milk Cheese Triangles (16 Portions)', 'عبوة توفير 16 قطعة من جبنة طعمة المثلثات المغذية.', 'Double pack 16 portions Teama triangle cheese.', 80.00, NULL, '200 جم', '200 gr', 120, false, true, '[{"url": "/products/dairy/DAI-TEA-TRI-16P.png", "alt_ar": "طعمة ميلك جبنة مثلثات (16 مثلث) 200 جم", "alt_en": "Teama Milk Cheese Triangles (16 Portions"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-LAM-CHO-200M', id, 'لمار حليب شوكولاتة معقم 200 مل', 'Lamar Long Life Chocolate Milk', 'حليب لمار بالشوكولاتة السويسرية الغنية.', 'Lamar rich chocolate flavored long life milk.', 15.00, NULL, '200 مل', '200 ml', 120, false, true, '[{"url": "/products/dairy/DAI-LAM-CHO-200M.png", "alt_ar": "لمار حليب شوكولاتة معقم 200 مل", "alt_en": "Lamar Long Life Chocolate Milk"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-MAR-TRT-STR-150', id, 'المراعي تريتس زبادي طازج بقطع الفراولة 150 جم', 'Almarai Treats Fresh Yogurt with Strawberry Pieces', 'زبادي الفواكه الكريمي من المراعي مع قطع الفراولة الكبيرة.', 'Fresh creamy yogurt packed with real strawberry pieces.', 19.00, NULL, '150 جم', '150 gr', 120, false, true, '[{"url": "/products/dairy/DAI-MAR-TRT-STR-150.png", "alt_ar": "المراعي تريتس زبادي طازج بقطع الفراولة 1", "alt_en": "Almarai Treats Fresh Yogurt with Strawbe"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-CHE-CHD-NZ-250', id, 'جبنة شيدر أبيض نيوزيلندي طبيعي فاخر 250 جم', 'White Cheddar Cheese New Zealand', 'شيدر نيوزيلندي عالي الجودة بنكهة معتقة رائعة.', 'Finest New Zealand sharp white cheddar block.', 125.00, NULL, '250 جم', '250 gr', 120, false, true, '[{"url": "/products/dairy/DAI-CHE-CHD-NZ-250.png", "alt_ar": "جبنة شيدر أبيض نيوزيلندي طبيعي فاخر 250 ", "alt_en": "White Cheddar Cheese New Zealand"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'DAI-JUH-COOK-1L', id, 'جهينة المطبخ السعيد كريمة طهي أصلية 1 لتر', 'Juhayna Happy Kitchen Original Cooking Cream', 'عبوة شيف 1 لتر من كريمة طهي جهينة للمطابخ والمناسبات.', 'Jumbo 1-liter chef cooking cream carton.', 280.00, NULL, '1 لتر', '1 L', 120, false, true, '[{"url": "/products/dairy/DAI-JUH-COOK-1L.png", "alt_ar": "جهينة المطبخ السعيد كريمة طهي أصلية 1 لت", "alt_en": "Juhayna Happy Kitchen Original Cooking C"}]'::jsonb
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
  is_active = true,
  images = EXCLUDED.images,
  updated_at = now();
