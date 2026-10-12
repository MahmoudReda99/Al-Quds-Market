-- ==============================================================================;
-- Al Quds Market — Comprehensive Supermarket Catalog & Image Migration;
-- Inspired by InstaShop supermarket hierarchy (9 departments, 25 subcategories, 35+ products);
-- 100% idempotent: safe to run repeatedly via Supabase SQL Editor or migration runner;
-- ==============================================================================;

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('fresh-produce', 'خضر وفواكه طازجة', 'Fresh Produce', '🥦', 1, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'vegetables', 'خضار طازجة', 'Vegetables', '🥕', 1, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'fruits', 'فواكه موسمية', 'Fresh Fruits', '🍎', 2, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'herbs-leaves', 'ورقيات وأعشاب', 'Herbs & Greens', '🌿', 3, id, true
FROM public.categories WHERE slug = 'fresh-produce'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('dairy-eggs', 'ألبان وبيض', 'Dairy & Eggs', '🥛', 2, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'milk-cream', 'حليب وقشطة', 'Milk & Cream', '🥛', 1, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'cheese-labneh', 'أجبان ولبنة بلدية', 'Cheese & Labneh', '🧀', 2, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'eggs-butter', 'بيض وزبدة', 'Eggs & Butter', '🥚', 3, id, true
FROM public.categories WHERE slug = 'dairy-eggs'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('bakery', 'مخبوزات طازجة', 'Fresh Bakery', '🍞', 3, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'pita-bread', 'خبز عربي وكعك القدس', 'Pita & Jerusalem Bread', '🫓', 1, id, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'pastries', 'معجنات ومناقيش', 'Pastries & Manakish', '🥐', 2, id, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'cakes-sweets', 'كيك وحلويات شرقية', 'Cakes & Sweets', '🧁', 3, id, true
FROM public.categories WHERE slug = 'bakery'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('meat-poultry', 'لحوم ودواجن', 'Meat & Poultry', '🥩', 4, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'fresh-chicken', 'دواجن طازجة', 'Fresh Chicken', '🍗', 1, id, true
FROM public.categories WHERE slug = 'meat-poultry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'beef-lamb', 'لحوم حمراء طازجة', 'Beef & Lamb', '🥩', 2, id, true
FROM public.categories WHERE slug = 'meat-poultry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'cold-cuts', 'مرتديلا ونقانق', 'Cold Cuts & Sausages', '🌭', 3, id, true
FROM public.categories WHERE slug = 'meat-poultry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('pantry', 'مواد تموينية وبقوليات', 'Pantry & Grains', '🫒', 5, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'oils-ghee', 'زيوت وسمن بلدي', 'Oils & Ghee', '🫒', 1, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'rice-grains', 'أرز وبقوليات', 'Rice & Pulses', '🌾', 2, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'pasta-sauces', 'معكرونة وصلصات', 'Pasta & Tomato Sauces', '🍝', 3, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'canned-goods', 'معلبات وتونة', 'Canned Food & Tuna', '🥫', 4, id, true
FROM public.categories WHERE slug = 'pantry'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('beverages', 'مشروبات وعصائر', 'Beverages & Juices', '🧃', 6, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'water', 'مياه معدنية', 'Mineral Water', '💧', 1, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'juices', 'عصائر طبيعية', 'Fresh Juices', '🍊', 2, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'soft-drinks', 'مشروبات غازية', 'Soft Drinks', '🥤', 3, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'hot-drinks', 'شاي وقهوة', 'Coffee & Tea', '☕', 4, id, true
FROM public.categories WHERE slug = 'beverages'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('snacks-sweets', 'وجبات خفيفة ومسليات', 'Snacks & Confectionery', '🍫', 7, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'chocolates', 'شوكولاتة وبسكويت', 'Chocolates & Biscuits', '🍫', 1, id, true
FROM public.categories WHERE slug = 'snacks-sweets'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'chips-crisps', 'شيبس ومقرمشات', 'Chips & Crisps', '🍿', 2, id, true
FROM public.categories WHERE slug = 'snacks-sweets'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'nuts-dates', 'مكسرات وتمور', 'Nuts & Medjool Dates', '🥜', 3, id, true
FROM public.categories WHERE slug = 'snacks-sweets'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('household', 'منظفات وعناية منزلية', 'Household & Cleaning', '🧹', 8, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'laundry', 'غسيل الملابس', 'Laundry Detergents', '🧺', 1, id, true
FROM public.categories WHERE slug = 'household'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'dishwashing', 'تنظيف الأطباق والأسطح', 'Dishwashing & Surface', '🧴', 2, id, true
FROM public.categories WHERE slug = 'household'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'paper-products', 'ورقيات وأكياس نفايات', 'Paper & Garbage Bags', '🧻', 3, id, true
FROM public.categories WHERE slug = 'household'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)
VALUES ('personal-care', 'عناية شخصية', 'Personal Care', '🧼', 9, true)
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'hair-body', 'شامبو واستحمام', 'Hair & Body Wash', '🚿', 1, id, true
FROM public.categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)
SELECT 'oral-care', 'صحة الفم والأسنان', 'Oral Care & Toothpaste', '🪥', 2, id, true
FROM public.categories WHERE slug = 'personal-care'
ON CONFLICT (slug) DO UPDATE SET
  name_ar = EXCLUDED.name_ar,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  is_active = true,
  updated_at = now();

INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)
SELECT 'VEG-TOM-01', id, 'طماطم مزارع طازجة نخب أول', 'Fresh Farm Tomatoes Grade A', 'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية من مزارع فلسطين.', 'Ripe red farm tomatoes, hand-picked and ideal for salads and daily cooking.', 6.50, 8.00, 'كغ', 'kg', 180, true, true, '[{"url":"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80","alt_ar":"طماطم طازجة","alt_en":"Fresh Tomatoes"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'VEG-CUC-01', id, 'خيار بلدي مقرمش صغير', 'Baby Crisp Cucumbers', 'خيار مقرمش طازج يومياً، مثالي للسلطات والمقبلات الصحية.', 'Crisp, fresh baby cucumbers harvested daily, perfect for fresh salads.', 5.50, 7.00, 'كغ', 'kg', 160, false, true, '[{"url":"https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80","alt_ar":"خيار بلدي","alt_en":"Cucumbers"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'VEG-POT-01', id, 'بطاطا بلدية صفراء للطبخ والقلي', 'Local Golden Cooking Potatoes', 'بطاطا طازجة ممتازة للقلي والخبز والطبخ المنزلي، حبات متوسطة ونظيفة.', 'All-purpose golden potatoes, ideal for roasting, boiling, and frying.', 4.50, NULL, 'كغ', 'kg', 250, false, true, '[{"url":"https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80","alt_ar":"بطاطا طازجة","alt_en":"Golden Potatoes"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'FRT-APP-01', id, 'تفاح أحمر مقرمش سكري', 'Crisp Red Sweet Apples', 'تفاح أحمر حلو ومقرمش، قطاف يومي طازج وغني بالفيتامينات.', 'Crisp and juicy sweet red apples, packed with natural flavor and vitamins.', 11.50, 14.00, 'كغ', 'kg', 140, true, true, '[{"url":"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80","alt_ar":"تفاح أحمر","alt_en":"Red Apples"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'FRT-BAN-01', id, 'موز استوائي نخب ممتاز', 'Premium Cavendish Bananas', 'موز أصفر ناضج غني بالبوتاسيوم والطاقة، مثالي للفطور والرياضيين.', 'Fresh naturally ripened bananas, packed with potassium and natural sweetness.', 7.50, NULL, 'كغ', 'kg', 190, true, true, '[{"url":"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80","alt_ar":"موز طازج","alt_en":"Bananas"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'FRT-ORG-01', id, 'برتقال أبو صرة بلدي عصير ومائدة', 'Local Navel Juicy Oranges', 'برتقال محلي ممتلئ بالعصير الطبيعي، غني بفيتامين C لتعزيز المناعة.', 'Sweet and juicy fresh navel oranges, full of Vitamin C.', 6.00, 7.50, 'كغ', 'kg', 170, false, true, '[{"url":"https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80","alt_ar":"برتقال بلدي","alt_en":"Navel Oranges"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'HRB-MNT-01', id, 'نعناع بلدي أخضر فواح', 'Fresh Local Green Mint Bunch', 'باقة نعناع أخضر فواح برائحة زكية، قطاف الصباح لشاي الصباح والسلطات.', 'Aromatic fresh green mint bunch, picked this morning for tea and salads.', 2.50, NULL, 'ضمة', 'bunch', 80, false, true, '[{"url":"https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=600&auto=format&fit=crop&q=80","alt_ar":"نعناع بلدي","alt_en":"Fresh Mint"}]'::jsonb
FROM public.categories WHERE slug = 'fresh-produce'
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
SELECT 'DAI-MLK-01', id, 'حليب أبقار طازج كامل الدسم (1 لتر)', 'Fresh Full Cream Cow Milk 1L', 'حليب طازج مبستر 100% طبيعي بدون مواد حافظة، غني بالكالسيوم والبروتين.', '100% pure fresh pasteurized whole milk, rich in calcium and essential vitamins.', 9.00, NULL, 'لتر', 'liter', 95, true, true, '[{"url":"https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80","alt_ar":"حليب طازج","alt_en":"Full Cream Milk"}]'::jsonb
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
SELECT 'DAI-EGG-01', id, 'طبق بيض مزارع طازج نخب أول (30 بيضة)', 'Fresh Farm Grade-A Eggs Tray (30 Pcs)', 'بيض مزارع طازج نخب أول، مفحوص ومختار بعناية لفطور عائلي متكامل.', 'Fresh grade-A farm eggs carton containing 30 pieces, protein packed.', 24.00, 28.00, 'طبق 30 بيضة', 'tray 30pcs', 85, true, true, '[{"url":"https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80","alt_ar":"طبق بيض طازج","alt_en":"Farm Eggs"}]'::jsonb
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
SELECT 'DAI-CHS-01', id, 'جبنة بيضاء نابلسية بلدية مغلية (500غ)', 'Traditional Nabulsi Boiled White Cheese (500g)', 'جبنة نابلسية أصيلة مغلية بحبة البركة والمستكة، طعم لا يُقاوم للمعجنات والتوست.', 'Traditional Palestinian white brined cheese with nigella seeds and mastic, 500g vacuum pack.', 22.00, 26.00, '500غ', '500g', 65, true, true, '[{"url":"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80","alt_ar":"جبنة نابلسية","alt_en":"Nabulsi Cheese"}]'::jsonb
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
SELECT 'DAI-LAB-01', id, 'لبنة بلدية حامضة بزيت الزيتون (500غ)', 'Traditional Artisan Labneh (500g)', 'لبنة بلدية كثيفة ومصنوعة من حليب طازج 100%، مثالية مع رشة زعتر وزيت.', 'Thick traditional creamy labneh made from pure fresh milk, 500g tub.', 15.00, 17.50, '500غ', '500g', 50, false, true, '[{"url":"https://images.unsplash.com/photo-1576186726580-a816e8b12896?w=600&auto=format&fit=crop&q=80","alt_ar":"لبنة بلدية","alt_en":"Fresh Labneh"}]'::jsonb
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
SELECT 'DAI-BTR-01', id, 'زبدة طبيعية غير مملحة (200غ)', 'Pure Unsalted Natural Butter (200g)', 'زبدة طبيعية نقية 100% من قشطة الحليب الطازج، مثالية للحلويات والطبخ.', 'Pure 100% natural cream butter block without salt, 200g foil pack.', 9.50, NULL, '200غ', '200g', 70, false, true, '[{"url":"https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80","alt_ar":"زبدة طبيعية","alt_en":"Pure Butter"}]'::jsonb
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
SELECT 'BAK-BRD-01', id, 'خبز كماج عربي ساخن (ربطة 8 أرغفة)', 'Fresh Arabic Pita Bread (8 Pack)', 'خبز عربي أبيض طازج من الفرن مباشرة يومياً، ربطة تحتوي على 8 أرغفة طرية.', 'Freshly baked traditional Arabic pita bread, bag of 8 soft loaves.', 4.50, NULL, 'ربطة', 'pack', 130, true, true, '[{"url":"https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80","alt_ar":"خبز كماج","alt_en":"Arabic Pita Bread"}]'::jsonb
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
SELECT 'BAK-KAAK-01', id, 'كعك القدس بالسمسم طازج ومقرمش', 'Authentic Jerusalem Sesame Kaak Bread', 'كعك القدس الشهير المخبوز على الحطب بالسمسم الذهبي، نكهة باب العمود الأصيلة.', 'Iconic Jerusalem wood-fired sesame bread rings, crispy outside and soft inside.', 5.00, NULL, 'رغيف', 'piece', 90, true, true, '[{"url":"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80","alt_ar":"كعك القدس","alt_en":"Jerusalem Kaak"}]'::jsonb
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
SELECT 'BAK-MAN-01', id, 'مناقيش زعتر بلدي بزيت الزيتون (حبة)', 'Fresh Zaatar & Olive Oil Manousheh', 'منقوشة زعتر فلسطيني أصيل مخلوط بزيت الزيتون البكر، مخبوزة على الطابون.', 'Warm flatbread topped with fragrant wild thyme zaatar blend and virgin olive oil.', 7.00, 9.00, 'قطعة', 'piece', 60, false, true, '[{"url":"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80","alt_ar":"منقوشة زعتر","alt_en":"Zaatar Manousheh"}]'::jsonb
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
SELECT 'BAK-CRS-01', id, 'كرواسون زبدة فرنسي فاخر (قطعتين)', 'French Butter Croissant (2 Pcs)', 'كرواسون هش ومورق ومخبوز بالزبدة الطبيعية الغنية، مثالي مع القهوة الصباحية.', 'Flaky golden artisanal butter croissants baked fresh, pack of 2.', 12.00, 15.00, 'عبوة قطعتين', '2pcs pack', 45, false, true, '[{"url":"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80","alt_ar":"كرواسون زبدة","alt_en":"Butter Croissant"}]'::jsonb
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
SELECT 'MEA-CHK-01', id, 'دجاج طازج كامل مذبوح حلال ومغسول (1.2 كغ)', 'Fresh Whole Cleaned Halal Chicken (1.2kg)', 'دجاج مزارع طازج مذبوح ومجهز حلال يومياً، منتقى بعناية ونظيف وجاهز للطبخ.', 'Fresh farm-raised whole chicken, 100% Halal slaughtered and cleaned, ~1.2kg.', 26.00, 30.00, 'حبة (1.2كغ)', 'piece (1.2kg)', 65, true, true, '[{"url":"https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80","alt_ar":"دجاج طازج كامل","alt_en":"Whole Chicken"}]'::jsonb
FROM public.categories WHERE slug = 'meat-poultry'
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
SELECT 'MEA-BRS-01', id, 'صدور دجاج فيليه طازجة بدون عظم (1 كغ)', 'Fresh Boneless Chicken Breast Fillet (1kg)', 'صدور دجاج طازجة مخلية من العظم والجلد، عالية البروتين ومثالية للشوي والطهي الصحي.', 'Tender skinless and boneless chicken breast fillets, packed with lean protein, 1kg.', 38.00, 44.00, 'كغ', 'kg', 50, true, true, '[{"url":"https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80","alt_ar":"صدور دجاج فيليه","alt_en":"Chicken Breast"}]'::jsonb
FROM public.categories WHERE slug = 'meat-poultry'
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
SELECT 'MEA-BEEF-01', id, 'لحم عجل بلدي مفروم طازج (1 كغ)', 'Fresh Minced Beef Veal (1kg)', 'لحم عجل طازج مفروم أمامك بدهن متوازن 15%، مثالي للكفتة والبرغر والصواني.', 'Freshly ground premium beef veal, optimal 85/15 lean ratio, 1kg pack.', 65.00, 75.00, 'كغ', 'kg', 40, false, true, '[{"url":"https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop&q=80","alt_ar":"لحم عجل مفروم","alt_en":"Minced Beef"}]'::jsonb
FROM public.categories WHERE slug = 'meat-poultry'
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
SELECT 'PAN-OIL-01', id, 'زيت زيتون فلسطيني بكر ممتاز عصرة أولى (1 لتر)', 'Palestinian Extra Virgin Olive Oil 1L', 'زيت زيتون بلدي معصور على البارد من جبال القدس، نكهة أصيلة ورائحة زكية وقيمة غذائية عالية.', 'First cold-pressed extra virgin olive oil from Palestinian mountain groves, 1L bottle.', 36.00, 42.00, 'لتر', 'liter', 110, true, true, '[{"url":"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80","alt_ar":"زيت زيتون بكر","alt_en":"Extra Virgin Olive Oil"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
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
SELECT 'PAN-RIC-01', id, 'أرز بسمتي هندي حبة طويلة فاخر (5 كغ)', 'Premium Indian Basmati Rice (5kg)', 'أرز بسمتي عالي الجودة حبة طويلة ناصع البياض ورائحة زكية، كيس خيش 5 كغم.', 'Aromatic long-grain aged Indian basmati rice, 5kg sturdy bag.', 48.00, 55.00, 'كيس 5كغ', '5kg bag', 80, true, true, '[{"url":"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80","alt_ar":"أرز بسمتي فاخر","alt_en":"Basmati Rice"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
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
SELECT 'PAN-PST-01', id, 'معكرونة سباغيتي إيطالية قمح قاسي (500غ)', 'Italian Durum Wheat Spaghetti (500g)', 'معكرونة سباغيتي كلاسيكية مصنوعة من سميد القمح القاسي 100%، قوام متماسك ولذيذ.', 'Classic 100% durum wheat semolina Italian spaghetti, 500g packet.', 5.50, 7.00, '500غ', '500g', 140, false, true, '[{"url":"https://images.unsplash.com/photo-1621996346565-e3d5d6281295?w=600&auto=format&fit=crop&q=80","alt_ar":"معكرونة سباغيتي","alt_en":"Spaghetti Pasta"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
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
SELECT 'PAN-TOM-01', id, 'معجون طماطم مركز مضاعف (400غ)', 'Double Concentrated Tomato Paste (400g)', 'صلصة طماطم كثيفة ولون أحمر غني، طبيعية وخالية من المواد الحافظة للطبخ والشوربات.', 'Rich double-concentrated pure tomato paste can, 400g tin.', 4.00, NULL, 'علبة 400غ', '400g tin', 160, false, true, '[{"url":"https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&auto=format&fit=crop&q=80","alt_ar":"معجون طماطم","alt_en":"Tomato Paste"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
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
SELECT 'PAN-TUN-01', id, 'تونة لحم أبيض بزيت الزيتون (160غ)', 'Solid White Tuna in Olive Oil (160g)', 'تونة قطع كاملة لحم أبيض فاخرة محفوظة في زيت الزيتون الصافي، غنية بأوميغا 3.', 'Premium solid light tuna chunks packed in pure olive oil, 160g can.', 8.50, 10.50, 'علبة', 'can', 120, false, true, '[{"url":"https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=600&auto=format&fit=crop&q=80","alt_ar":"تونة بزيت الزيتون","alt_en":"Tuna in Olive Oil"}]'::jsonb
FROM public.categories WHERE slug = 'pantry'
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
SELECT 'BEV-WTR-01', id, 'طرد مياه ينابيع معدنية نقية (6 × 1.5 لتر)', 'Natural Spring Mineral Water Pack (6 x 1.5L)', 'مياه شرب طبيعية نقية متوازنة المعادن، طرد اقتصادي يحتوي على 6 زجاجات سعة 1.5 لتر.', 'Pure natural spring drinking water, value pack of 6 bottles x 1.5L each.', 13.50, 16.00, 'طرد 6 قناني', 'pack of 6', 150, true, true, '[{"url":"https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80","alt_ar":"مياه معدنية","alt_en":"Mineral Water"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
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
SELECT 'BEV-JUC-01', id, 'عصير برتقال طبيعي 100% طازج (1 لتر)', '100% Pure Fresh Squeezed Orange Juice 1L', 'عصير برتقال طبيعي معصور طازج بدون سكر مضاف أو ماء، غني بفيتامين C.', '100% freshly squeezed pure orange juice without added sugar, 1L bottle.', 11.00, 13.50, 'لتر', 'liter', 75, true, true, '[{"url":"https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80","alt_ar":"عصير برتقال","alt_en":"Orange Juice"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
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
SELECT 'BEV-TEA-01', id, 'شاي سيلاني أسود فاخر (100 كيس)', 'Premium Ceylon Black Tea (100 Bags)', 'شاي سيلاني أصلي منتقى من أجود مزارع الشاي، لون ذهبي غامق ونكهة غنية منعشة.', 'Finest pure Ceylon black tea, 100 enveloped tea bags for rich aromatic taste.', 16.00, 19.00, 'علبة 100 كيس', 'box 100 bags', 90, false, true, '[{"url":"https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80","alt_ar":"شاي أسود","alt_en":"Black Tea"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
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
SELECT 'BEV-COF-01', id, 'قهوة مقدسية بالهيل مطحونة طازجة (250غ)', 'Jerusalem Roasted Coffee with Cardamom (250g)', 'بن تركي مقدسي محمص ومطحون طازجاً وممزوج بحبات الهيل الخضراء الفواحة.', 'Artisan freshly ground Jerusalem roast coffee blended with aromatic cardamom, 250g.', 18.00, 22.00, '250غ', '250g', 85, true, true, '[{"url":"https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80","alt_ar":"قهوة بالهيل","alt_en":"Arabic Coffee"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
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
SELECT 'BEV-COLA-01', id, 'كوكا كولا علبة باردة (330 مل)', 'Coca-Cola Classic Can (330ml)', 'مشروب غازي منعش بالنكهة الكلاسيكية المميزة، علبة معدنية 330 مل.', 'Refreshing original taste sparkling cola drink, 330ml aluminum can.', 3.50, NULL, 'علبة 330مل', 'can 330ml', 200, false, true, '[{"url":"https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80","alt_ar":"كوكا كولا","alt_en":"Coca Cola Can"}]'::jsonb
FROM public.categories WHERE slug = 'beverages'
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
SELECT 'SNK-CHP-01', id, 'شيبس بطاطا مقرمش بالملح البحري (150غ)', 'Crunchy Kettle Sea Salt Potato Chips (150g)', 'رقائق بطاطا طبيعية مقلية بزيت نقي ومتبلة بالملح الخفيف، قرمشة مثالية.', 'Golden crispy natural potato chips seasoned with fine sea salt, 150g bag.', 6.50, NULL, 'كيس 150غ', '150g bag', 110, true, true, '[{"url":"https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80","alt_ar":"شيبس بطاطا","alt_en":"Potato Chips"}]'::jsonb
FROM public.categories WHERE slug = 'snacks-sweets'
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
SELECT 'SNK-DAT-01', id, 'تمر مجهول فلسطيني فاخر حبة كبيرة (1 كغ)', 'Premium Palestinian Medjool Dates Jumbo (1kg)', 'تمر مجهول أريحا الطبيعي حبة ملكية جامبو، طري وغني بالحلاوة الطبيعية والحديد.', 'Jumbo Royal Medjool dates harvested from Jericho, naturally sweet and soft, 1kg box.', 38.00, 45.00, 'علبة 1كغ', '1kg box', 95, true, true, '[{"url":"https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&auto=format&fit=crop&q=80","alt_ar":"تمر مجهول فاخر","alt_en":"Medjool Dates"}]'::jsonb
FROM public.categories WHERE slug = 'snacks-sweets'
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
SELECT 'SNK-NUT-01', id, 'مكسرات مشكلة محمصة ومملحة خفيف (300غ)', 'Roasted Lightly Salted Mixed Nuts (300g)', 'تشكيلة مكسرات فاخرة (كاجو، لوز، فستق حلبي، فندق) محمصة طازجة ومقرمشة.', 'Premium mix of roasted almonds, cashews, pistachios and hazelnuts, 300g zipper pouch.', 26.00, 32.00, '300غ', '300g', 70, false, true, '[{"url":"https://images.unsplash.com/photo-1536591375315-1b83683e327d?w=600&auto=format&fit=crop&q=80","alt_ar":"مكسرات مشكلة","alt_en":"Mixed Nuts"}]'::jsonb
FROM public.categories WHERE slug = 'snacks-sweets'
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
SELECT 'SNK-CHO-01', id, 'لوح شوكولاتة بالحليب والبندق الفاخر (100غ)', 'Swiss Milk Chocolate with Whole Hazelnuts (100g)', 'شوكولاتة سويسرية حريرية غنية بالحليب الطبيعي وقطع البندق الكاملة المحمصة.', 'Silky smooth milk chocolate bar packed with whole crunchy roasted hazelnuts, 100g.', 9.00, 11.50, 'لوح 100غ', '100g bar', 130, false, true, '[{"url":"https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80","alt_ar":"شوكولاتة بالحليب","alt_en":"Chocolate Bar"}]'::jsonb
FROM public.categories WHERE slug = 'snacks-sweets'
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
SELECT 'HOU-DET-01', id, 'جل غسيل ملابس مركز برائحة اللافندر (3 لتر)', 'Concentrated Liquid Laundry Detergent Gel 3L', 'سائل غسيل قوي لإزالة البقع العميقة برائحة زهور اللافندر المنعشة للغسالات الأوتوماتيك.', 'Deep-cleaning concentrated liquid laundry detergent with lavender scent, 3 Liters bottle.', 34.00, 42.00, 'جالون 3 لتر', '3L bottle', 80, true, true, '[{"url":"https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80","alt_ar":"سائل غسيل ملابس","alt_en":"Laundry Detergent"}]'::jsonb
FROM public.categories WHERE slug = 'household'
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
SELECT 'HOU-DSH-01', id, 'سائل جلي صحون فعال بالليمون الأخضر (1 لتر)', 'Grease-Cutting Dishwashing Liquid Lemon 1L', 'سائل غسيل صحون قوي يقضي على الدهون بسرعة ولطيف على اليدين برائحة الليمون.', 'High-foaming grease-cutting dishwashing liquid soap with fresh lemon extract, 1L bottle.', 8.50, 10.00, 'لتر', 'liter', 120, false, true, '[{"url":"https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?w=600&auto=format&fit=crop&q=80","alt_ar":"سائل جلي صحون","alt_en":"Dishwashing Soap"}]'::jsonb
FROM public.categories WHERE slug = 'household'
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
SELECT 'HOU-PAP-01', id, 'محارم مطبخ ورقية سميكة ماصة (4 رولات)', 'Heavy Duty Kitchen Paper Towels (4 Rolls)', 'ورق مطبخ فائق الامتصاص مكون من طبقتين سميكتين لمسح السوائل والزيوت.', 'Ultra-absorbent 2-ply embossed kitchen paper towels, pack of 4 giant rolls.', 14.00, 17.00, 'طرد 4 رولات', '4 rolls pack', 90, false, true, '[{"url":"https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=600&auto=format&fit=crop&q=80","alt_ar":"محارم مطبخ","alt_en":"Paper Towels"}]'::jsonb
FROM public.categories WHERE slug = 'household'
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
SELECT 'PER-SHM-01', id, 'شامبو مغذٍ ومقوٍ للشعر بزيت الأرغان (400 مل)', 'Nourishing Argan Oil Hair Shampoo 400ml', 'شامبو مقوٍ ومغذٍ للشعر الجاف والتالف بخلاصة زيت الأرغان الطبيعي وفيتامين E.', 'Moisture-rich restorative shampoo infused with Moroccan argan oil and vitamin E, 400ml.', 19.00, 24.00, '400مل', '400ml', 75, true, true, '[{"url":"https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80","alt_ar":"شامبو للشعر","alt_en":"Hair Shampoo"}]'::jsonb
FROM public.categories WHERE slug = 'personal-care'
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
SELECT 'PER-DNT-01', id, 'معجون أسنان حماية متكاملة وانتعاش (100 مل)', 'Complete Protection Fresh Mint Toothpaste 100ml', 'معجون أسنان طبي لتبييض الأسنان وحماية اللثة ومحاربة التسوس بانتعاش النعناع.', 'Multi-action fluoride toothpaste for cavity protection and long-lasting fresh breath, 100ml tube.', 11.50, 14.00, 'أنبوب 100مل', '100ml tube', 110, false, true, '[{"url":"https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop&q=80","alt_ar":"معجون أسنان","alt_en":"Toothpaste"}]'::jsonb
FROM public.categories WHERE slug = 'personal-care'
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
SELECT 'PER-SOP-01', id, 'صابون غار بلدي طبيعي بزيت الزيتون (قطعتين)', 'Natural Olive Oil & Laurel Herbal Soap (2 Pcs)', 'صابون نابلسي بلدي طبيعي 100% بزيت الزيتون البكر والغار، لطيف ومرطب للبشرة.', 'Handmade 100% natural olive oil and laurel soap bars, pack of 2.', 10.00, NULL, 'عبوة قطعتين', 'pack of 2', 90, false, true, '[{"url":"https://images.unsplash.com/photo-1607006314605-aac089ffb594?w=600&auto=format&fit=crop&q=80","alt_ar":"صابون غار بلدي","alt_en":"Olive Oil Soap"}]'::jsonb
FROM public.categories WHERE slug = 'personal-care'
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
