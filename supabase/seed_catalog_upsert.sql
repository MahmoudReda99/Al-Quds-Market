-- ==============================================================================;
-- Al Quds Market — 100% Idempotent Catalog & Images Upsert Script;
-- Run directly in Supabase SQL Editor to bypass client RLS restriction;
-- ==============================================================================;

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('fresh-produce', 'خضر وفواكه طازجة', 'Fresh Produce', '🥦', 1, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'vegetables', 'خضار طازجة', 'Vegetables', '🥕', 1, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'fruits', 'فواكه موسمية', 'Fresh Fruits', '🍎', 2, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'herbs-leaves', 'ورقيات وأعشاب', 'Herbs & Leaves', '🌿', 3, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('dairy-eggs', 'ألبان وبيض', 'Dairy & Eggs', '🥛', 2, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'milk-cream', 'حليب وقشطة', 'Milk & Cream', '🥛', 1, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'cheese-labneh', 'أجبان ولبنة بلدية', 'Cheese & Labneh', '🧀', 2, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'eggs', 'بيض مزارع', 'Eggs', '🥚', 3, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('bakery', 'مخبوزات طازجة', 'Fresh Bakery', '🍞', 3, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'pita-bread', 'خبز كماج وطابون', 'Pita & Flatbread', '🫓', 1, id, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'pastries', 'معجنات وفطائر', 'Pastries & Pies', '🥐', 2, id, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('meat-poultry', 'لحوم ودواجن', 'Meat & Poultry', '🥩', 4, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'fresh-chicken', 'دواجن طازجة', 'Fresh Chicken', '🍗', 1, id, true
FROM public.categories WHERE slug = 'meat-poultry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'beef-lamb', 'لحوم حمراء طازجة', 'Beef & Lamb', '🥩', 2, id, true
FROM public.categories WHERE slug = 'meat-poultry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('pantry', 'مواد تموينية وبقوليات', 'Pantry & Grains', '🫒', 5, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'oils-ghee', 'زيوت وسمن بلدي', 'Oils & Ghee', '🫒', 1, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'rice-grains', 'أرز وبقوليات', 'Rice & Grains', '🌾', 2, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'spices', 'بهارات وتوابل', 'Spices & Seasonings', '🧂', 3, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('beverages', 'مشروبات وعصائر', 'Beverages & Juices', '🧃', 6, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'water', 'مياه معدنية', 'Mineral Water', '💧', 1, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'juices', 'عصائر طبيعية', 'Fresh Juices', '🍊', 2, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'hot-drinks', 'شاي وقهوة', 'Coffee & Tea', '☕', 3, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('snacks-sweets', 'وجبات خفيفة وحلويات', 'Snacks & Sweets', '🍫', 7, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'chocolates', 'شوكولاتة وبسكويت', 'Chocolates & Biscuits', '🍫', 1, id, true
FROM public.categories WHERE slug = 'snacks-sweets'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'chips', 'شيبس ومقرمشات', 'Chips & Crackers', '🍿', 2, id, true
FROM public.categories WHERE slug = 'snacks-sweets'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('household', 'منظفات وعناية منزلية', 'Household & Cleaning', '🧹', 8, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'detergents', 'مساحيق ومنظفات', 'Detergents & Cleaners', '🧴', 1, id, true
FROM public.categories WHERE slug = 'household'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'paper-products', 'ورقيات وأكياس', 'Paper & Bags', '🧻', 2, id, true
FROM public.categories WHERE slug = 'household'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-APP-01', id, 'تفاح أحمر بلدي طازج', 'Fresh Local Red Apples', 'تفاح أحمر مقرمش ولذيذ، قطاف يومي طازج من أفضل المزارع.', 'Crisp and delicious sweet red apples, picked fresh daily from premium local farms.', 12.50, 15.00, 'كغ', 'kg', 150, true, true, '[{"url":"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80","alt_ar":"تفاح أحمر","alt_en":"Red Apples"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-BAN-01', id, 'موز استوائي نخب أول', 'Premium Bananas', 'موز طازج غني بالطاقة والبوتاسيوم، ناضج ومثالي للاستهلاك اليومي.', 'Fresh, naturally ripened sweet bananas packed with energy and potassium.', 8.00, NULL, 'كغ', 'kg', 200, true, true, '[{"url":"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80","alt_ar":"موز طازج","alt_en":"Fresh Bananas"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-TOM-01', id, 'طماطم مزارع طازجة', 'Fresh Vine Tomatoes', 'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية.', 'Ripe red farm tomatoes, ideal for salads and home cooking.', 6.50, 8.00, 'كغ', 'kg', 180, true, true, '[{"url":"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80","alt_ar":"طماطم طازجة","alt_en":"Fresh Tomatoes"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-CUC-01', id, 'خيار بلدي صغير', 'Baby Cucumbers', 'خيار مقرمش طازج ومثالي للمقبلات والسلطات.', 'Crisp fresh cucumbers, hand-picked daily for salads.', 5.50, 7.00, 'كغ', 'kg', 160, false, true, '[{"url":"https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80","alt_ar":"خيار بلدي","alt_en":"Cucumbers"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-MLK-01', id, 'حليب طازج كامل الدسم', 'Fresh Full Cream Milk', 'حليب مبستر طبيعي 100% غني بالكالسيوم، سعة 1 لتر.', '100% pure fresh pasteurized milk rich in calcium, 1 Liter bottle.', 9.00, NULL, 'لتر', 'liter', 90, true, true, '[{"url":"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80","alt_ar":"حليب كامل الدسم","alt_en":"Full Cream Milk"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-EGG-01', id, 'طبق بيض مزارع طازج (30 بيضة)', 'Fresh Farm Eggs Carton (30 Pcs)', 'بيض مزارع طازج نخب أول، مغذٍ وصحي لوجبة فطور متكاملة.', 'Fresh grade-A farm eggs, 30 pieces carton.', 24.00, 28.00, 'طبق', 'carton', 75, true, true, '[{"url":"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80","alt_ar":"طبق بيض","alt_en":"Eggs Carton"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-CHS-01', id, 'جبنة بيضاء بلدية مغلية', 'Traditional White Brined Cheese', 'جبنة نابلسية بلدية مغلية مع حبة البركة والمستكة، وزن 500 غرام.', 'Traditional white artisanal cheese with black seed and mastic, 500g.', 22.00, 26.00, '500غ', '500g', 60, false, true, '[{"url":"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80","alt_ar":"جبنة بيضاء","alt_en":"White Cheese"}]'::jsonb
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-BRD-01', id, 'خبز عربي كماج ساخن', 'Fresh Arabic Pita Bread', 'خبز عربي طازج من الفرن مباشرة، ربطة من 8 أرغفة.', 'Freshly baked traditional Arabic pita bread, pack of 8.', 4.50, NULL, 'ربطة', 'pack', 120, true, true, '[{"url":"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80","alt_ar":"خبز عربي","alt_en":"Arabic Bread"}]'::jsonb
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-OIL-01', id, 'زيت زيتون فلسطيني بكر ممتاز', 'Extra Virgin Palestinian Olive Oil', 'زيت زيتون معصور على البارد من جبال القدس، نكهة أصيلة وقيمة غذائية عالية، سعة 1 لتر.', 'Cold-pressed extra virgin Palestinian olive oil, 1 Liter glass bottle.', 35.00, 42.00, 'لتر', 'liter', 110, true, true, '[{"url":"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80","alt_ar":"زيت زيتون بكر","alt_en":"Olive Oil"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-RIC-01', id, 'أرز بسمتي حبة طويلة (5 كغ)', 'Basmati Long Grain Rice (5kg)', 'أرز بسمتي هندي فاخر حبة طويلة ناصع البياض، كيس 5 كغم.', 'Premium Indian long grain basmati rice, 5kg bag.', 48.00, 55.00, 'كيس 5كغ', '5kg bag', 80, false, true, '[{"url":"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80","alt_ar":"أرز بسمتي","alt_en":"Basmati Rice"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-JUC-01', id, 'عصير برتقال طبيعي 100%', 'Fresh Orange Juice 100%', 'عصير برتقال معصور طازج بدون سكر مضاف، سعة 1 لتر.', 'Fresh squeezed orange juice without added sugar, 1L bottle.', 11.00, 13.00, 'لتر', 'liter', 65, true, true, '[{"url":"https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80","alt_ar":"عصير برتقال","alt_en":"Orange Juice"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'PROD-WTR-01', id, 'طرد مياه معدنية (6 × 1.5 لتر)', 'Mineral Water Pack (6 x 1.5L)', 'مياه ينابيع طبيعية نقية وصحية، طرد من 6 زجاجات سعة 1.5 لتر.', 'Pure natural spring mineral water, pack of 6 bottles 1.5L each.', 14.00, NULL, 'طرد', 'pack', 140, false, true, '[{"url":"https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80","alt_ar":"مياه معدنية","alt_en":"Mineral Water"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (sku) DO UPDATE SET
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
  images = EXCLUDED.images,
  updated_at = now();
