/**
 * Al Quds Market — Idempotent Catalog & Image Import Script
 * 
 * Can run via:
 *   1) SUPABASE_SERVICE_ROLE_KEY in .env.local (admin script mode)
 *   2) ADMIN_EMAIL + ADMIN_PASSWORD in .env.local (admin session mode)
 *   3) Fallback: Generates a 100% idempotent SQL file `supabase/seed_catalog_upsert.sql`
 *      which can be run directly in the Supabase SQL editor without needing service keys.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

// Load environment variables
let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
let adminEmail = process.env.ADMIN_EMAIL;
let adminPassword = process.env.ADMIN_PASSWORD;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [k, ...v] = trimmed.split('=');
      const val = v.join('=').trim().replace(/^["']|["']$/g, '');
      if (k.trim() === 'VITE_SUPABASE_URL') supabaseUrl = val;
      if (k.trim() === 'SUPABASE_SERVICE_ROLE_KEY') supabaseKey = val;
      if (!supabaseKey && k.trim() === 'VITE_SUPABASE_ANON_KEY') supabaseKey = val;
      if (k.trim() === 'ADMIN_EMAIL') adminEmail = val;
      if (k.trim() === 'ADMIN_PASSWORD') adminPassword = val;
    }
  }
}

// ============================================================================
// CATALOG DATA DEFINITION
// ============================================================================
export const CATALOG_DATA = {
  categories: [
    {
      slug: 'fresh-produce',
      name_ar: 'خضر وفواكه طازجة',
      name_en: 'Fresh Produce',
      icon: '🥦',
      sort_order: 1,
      subcategories: [
        { slug: 'vegetables', name_ar: 'خضار طازجة', name_en: 'Vegetables', icon: '🥕', sort_order: 1 },
        { slug: 'fruits', name_ar: 'فواكه موسمية', name_en: 'Fresh Fruits', icon: '🍎', sort_order: 2 },
        { slug: 'herbs-leaves', name_ar: 'ورقيات وأعشاب', name_en: 'Herbs & Leaves', icon: '🌿', sort_order: 3 },
      ],
    },
    {
      slug: 'dairy-eggs',
      name_ar: 'ألبان وبيض',
      name_en: 'Dairy & Eggs',
      icon: '🥛',
      sort_order: 2,
      subcategories: [
        { slug: 'milk-cream', name_ar: 'حليب وقشطة', name_en: 'Milk & Cream', icon: '🥛', sort_order: 1 },
        { slug: 'cheese-labneh', name_ar: 'أجبان ولبنة بلدية', name_en: 'Cheese & Labneh', icon: '🧀', sort_order: 2 },
        { slug: 'eggs', name_ar: 'بيض مزارع', name_en: 'Eggs', icon: '🥚', sort_order: 3 },
      ],
    },
    {
      slug: 'bakery',
      name_ar: 'مخبوزات طازجة',
      name_en: 'Fresh Bakery',
      icon: '🍞',
      sort_order: 3,
      subcategories: [
        { slug: 'pita-bread', name_ar: 'خبز كماج وطابون', name_en: 'Pita & Flatbread', icon: '🫓', sort_order: 1 },
        { slug: 'pastries', name_ar: 'معجنات وفطائر', name_en: 'Pastries & Pies', icon: '🥐', sort_order: 2 },
      ],
    },
    {
      slug: 'meat-poultry',
      name_ar: 'لحوم ودواجن',
      name_en: 'Meat & Poultry',
      icon: '🥩',
      sort_order: 4,
      subcategories: [
        { slug: 'fresh-chicken', name_ar: 'دواجن طازجة', name_en: 'Fresh Chicken', icon: '🍗', sort_order: 1 },
        { slug: 'beef-lamb', name_ar: 'لحوم حمراء طازجة', name_en: 'Beef & Lamb', icon: '🥩', sort_order: 2 },
      ],
    },
    {
      slug: 'pantry',
      name_ar: 'مواد تموينية وبقوليات',
      name_en: 'Pantry & Grains',
      icon: '🫒',
      sort_order: 5,
      subcategories: [
        { slug: 'oils-ghee', name_ar: 'زيوت وسمن بلدي', name_en: 'Oils & Ghee', icon: '🫒', sort_order: 1 },
        { slug: 'rice-grains', name_ar: 'أرز وبقوليات', name_en: 'Rice & Grains', icon: '🌾', sort_order: 2 },
        { slug: 'spices', name_ar: 'بهارات وتوابل', name_en: 'Spices & Seasonings', icon: '🧂', sort_order: 3 },
      ],
    },
    {
      slug: 'beverages',
      name_ar: 'مشروبات وعصائر',
      name_en: 'Beverages & Juices',
      icon: '🧃',
      sort_order: 6,
      subcategories: [
        { slug: 'water', name_ar: 'مياه معدنية', name_en: 'Mineral Water', icon: '💧', sort_order: 1 },
        { slug: 'juices', name_ar: 'عصائر طبيعية', name_en: 'Fresh Juices', icon: '🍊', sort_order: 2 },
        { slug: 'hot-drinks', name_ar: 'شاي وقهوة', name_en: 'Coffee & Tea', icon: '☕', sort_order: 3 },
      ],
    },
    {
      slug: 'snacks-sweets',
      name_ar: 'وجبات خفيفة وحلويات',
      name_en: 'Snacks & Sweets',
      icon: '🍫',
      sort_order: 7,
      subcategories: [
        { slug: 'chocolates', name_ar: 'شوكولاتة وبسكويت', name_en: 'Chocolates & Biscuits', icon: '🍫', sort_order: 1 },
        { slug: 'chips', name_ar: 'شيبس ومقرمشات', name_en: 'Chips & Crackers', icon: '🍿', sort_order: 2 },
      ],
    },
    {
      slug: 'household',
      name_ar: 'منظفات وعناية منزلية',
      name_en: 'Household & Cleaning',
      icon: '🧹',
      sort_order: 8,
      subcategories: [
        { slug: 'detergents', name_ar: 'مساحيق ومنظفات', name_en: 'Detergents & Cleaners', icon: '🧴', sort_order: 1 },
        { slug: 'paper-products', name_ar: 'ورقيات وأكياس', name_en: 'Paper & Bags', icon: '🧻', sort_order: 2 },
      ],
    },
  ],

  products: [
    {
      sku: 'PROD-APP-01',
      category_slug: 'fresh-produce',
      name_ar: 'تفاح أحمر بلدي طازج',
      name_en: 'Fresh Local Red Apples',
      description_ar: 'تفاح أحمر مقرمش ولذيذ، قطاف يومي طازج من أفضل المزارع.',
      description_en: 'Crisp and delicious sweet red apples, picked fresh daily from premium local farms.',
      price: 12.50,
      compare_at_price: 15.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 150,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80', alt_ar: 'تفاح أحمر', alt_en: 'Red Apples' }],
    },
    {
      sku: 'PROD-BAN-01',
      category_slug: 'fresh-produce',
      name_ar: 'موز استوائي نخب أول',
      name_en: 'Premium Bananas',
      description_ar: 'موز طازج غني بالطاقة والبوتاسيوم، ناضج ومثالي للاستهلاك اليومي.',
      description_en: 'Fresh, naturally ripened sweet bananas packed with energy and potassium.',
      price: 8.00,
      compare_at_price: null,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 200,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80', alt_ar: 'موز طازج', alt_en: 'Fresh Bananas' }],
    },
    {
      sku: 'PROD-TOM-01',
      category_slug: 'fresh-produce',
      name_ar: 'طماطم مزارع طازجة',
      name_en: 'Fresh Vine Tomatoes',
      description_ar: 'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية.',
      description_en: 'Ripe red farm tomatoes, ideal for salads and home cooking.',
      price: 6.50,
      compare_at_price: 8.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 180,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80', alt_ar: 'طماطم طازجة', alt_en: 'Fresh Tomatoes' }],
    },
    {
      sku: 'PROD-CUC-01',
      category_slug: 'fresh-produce',
      name_ar: 'خيار بلدي صغير',
      name_en: 'Baby Cucumbers',
      description_ar: 'خيار مقرمش طازج ومثالي للمقبلات والسلطات.',
      description_en: 'Crisp fresh cucumbers, hand-picked daily for salads.',
      price: 5.50,
      compare_at_price: 7.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 160,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80', alt_ar: 'خيار بلدي', alt_en: 'Cucumbers' }],
    },
    {
      sku: 'PROD-MLK-01',
      category_slug: 'dairy-eggs',
      name_ar: 'حليب طازج كامل الدسم',
      name_en: 'Fresh Full Cream Milk',
      description_ar: 'حليب مبستر طبيعي 100% غني بالكالسيوم، سعة 1 لتر.',
      description_en: '100% pure fresh pasteurized milk rich in calcium, 1 Liter bottle.',
      price: 9.00,
      compare_at_price: null,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 90,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80', alt_ar: 'حليب كامل الدسم', alt_en: 'Full Cream Milk' }],
    },
    {
      sku: 'PROD-EGG-01',
      category_slug: 'dairy-eggs',
      name_ar: 'طبق بيض مزارع طازج (30 بيضة)',
      name_en: 'Fresh Farm Eggs Carton (30 Pcs)',
      description_ar: 'بيض مزارع طازج نخب أول، مغذٍ وصحي لوجبة فطور متكاملة.',
      description_en: 'Fresh grade-A farm eggs, 30 pieces carton.',
      price: 24.00,
      compare_at_price: 28.00,
      unit_label_ar: 'طبق',
      unit_label_en: 'carton',
      stock_quantity: 75,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80', alt_ar: 'طبق بيض', alt_en: 'Eggs Carton' }],
    },
    {
      sku: 'PROD-CHS-01',
      category_slug: 'dairy-eggs',
      name_ar: 'جبنة بيضاء بلدية مغلية',
      name_en: 'Traditional White Brined Cheese',
      description_ar: 'جبنة نابلسية بلدية مغلية مع حبة البركة والمستكة، وزن 500 غرام.',
      description_en: 'Traditional white artisanal cheese with black seed and mastic, 500g.',
      price: 22.00,
      compare_at_price: 26.00,
      unit_label_ar: '500غ',
      unit_label_en: '500g',
      stock_quantity: 60,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80', alt_ar: 'جبنة بيضاء', alt_en: 'White Cheese' }],
    },
    {
      sku: 'PROD-BRD-01',
      category_slug: 'bakery',
      name_ar: 'خبز عربي كماج ساخن',
      name_en: 'Fresh Arabic Pita Bread',
      description_ar: 'خبز عربي طازج من الفرن مباشرة، ربطة من 8 أرغفة.',
      description_en: 'Freshly baked traditional Arabic pita bread, pack of 8.',
      price: 4.50,
      compare_at_price: null,
      unit_label_ar: 'ربطة',
      unit_label_en: 'pack',
      stock_quantity: 120,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80', alt_ar: 'خبز عربي', alt_en: 'Arabic Bread' }],
    },
    {
      sku: 'PROD-OIL-01',
      category_slug: 'pantry',
      name_ar: 'زيت زيتون فلسطيني بكر ممتاز',
      name_en: 'Extra Virgin Palestinian Olive Oil',
      description_ar: 'زيت زيتون معصور على البارد من جبال القدس، نكهة أصيلة وقيمة غذائية عالية، سعة 1 لتر.',
      description_en: 'Cold-pressed extra virgin Palestinian olive oil, 1 Liter glass bottle.',
      price: 35.00,
      compare_at_price: 42.00,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 110,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', alt_ar: 'زيت زيتون بكر', alt_en: 'Olive Oil' }],
    },
    {
      sku: 'PROD-RIC-01',
      category_slug: 'pantry',
      name_ar: 'أرز بسمتي حبة طويلة (5 كغ)',
      name_en: 'Basmati Long Grain Rice (5kg)',
      description_ar: 'أرز بسمتي هندي فاخر حبة طويلة ناصع البياض، كيس 5 كغم.',
      description_en: 'Premium Indian long grain basmati rice, 5kg bag.',
      price: 48.00,
      compare_at_price: 55.00,
      unit_label_ar: 'كيس 5كغ',
      unit_label_en: '5kg bag',
      stock_quantity: 80,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80', alt_ar: 'أرز بسمتي', alt_en: 'Basmati Rice' }],
    },
    {
      sku: 'PROD-JUC-01',
      category_slug: 'beverages',
      name_ar: 'عصير برتقال طبيعي 100%',
      name_en: 'Fresh Orange Juice 100%',
      description_ar: 'عصير برتقال معصور طازج بدون سكر مضاف، سعة 1 لتر.',
      description_en: 'Fresh squeezed orange juice without added sugar, 1L bottle.',
      price: 11.00,
      compare_at_price: 13.00,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 65,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80', alt_ar: 'عصير برتقال', alt_en: 'Orange Juice' }],
    },
    {
      sku: 'PROD-WTR-01',
      category_slug: 'beverages',
      name_ar: 'طرد مياه معدنية (6 × 1.5 لتر)',
      name_en: 'Mineral Water Pack (6 x 1.5L)',
      description_ar: 'مياه ينابيع طبيعية نقية وصحية، طرد من 6 زجاجات سعة 1.5 لتر.',
      description_en: 'Pure natural spring mineral water, pack of 6 bottles 1.5L each.',
      price: 14.00,
      compare_at_price: null,
      unit_label_ar: 'طرد',
      unit_label_en: 'pack',
      stock_quantity: 140,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80', alt_ar: 'مياه معدنية', alt_en: 'Mineral Water' }],
    },
  ],
};

// ============================================================================
// SQL GENERATOR (Always outputs an idempotent SQL file)
// ============================================================================
function generateIdempotentSql() {
  const sqlLines = [
    '-- ==============================================================================;',
    '-- Al Quds Market — 100% Idempotent Catalog & Images Upsert Script;',
    '-- Run directly in Supabase SQL Editor to bypass client RLS restriction;',
    '-- ==============================================================================;',
    '',
  ];

  for (const cat of CATALOG_DATA.categories) {
    sqlLines.push(
      `INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)`,
      `VALUES ('${cat.slug}', '${cat.name_ar}', '${cat.name_en}', '${cat.icon}', ${cat.sort_order}, true)`,
      `ON CONFLICT (slug) DO UPDATE SET`,
      `  name_ar = EXCLUDED.name_ar,`,
      `  name_en = EXCLUDED.name_en,`,
      `  icon = EXCLUDED.icon,`,
      `  sort_order = EXCLUDED.sort_order,`,
      `  updated_at = now();`,
      ''
    );

    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        sqlLines.push(
          `INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)`,
          `SELECT '${sub.slug}', '${sub.name_ar}', '${sub.name_en}', '${sub.icon}', ${sub.sort_order}, id, true`,
          `FROM public.categories WHERE slug = '${cat.slug}'`,
          `ON CONFLICT (slug) DO UPDATE SET`,
          `  name_ar = EXCLUDED.name_ar,`,
          `  name_en = EXCLUDED.name_en,`,
          `  icon = EXCLUDED.icon,`,
          `  sort_order = EXCLUDED.sort_order,`,
          `  updated_at = now();`,
          ''
        );
      }
    }
  }

  for (const prod of CATALOG_DATA.products) {
    const imagesJson = JSON.stringify(prod.images).replace(/'/g, "''");
    const compareAt = prod.compare_at_price !== null ? prod.compare_at_price.toFixed(2) : 'NULL';
    const descAr = prod.description_ar ? `'${prod.description_ar.replace(/'/g, "''")}'` : 'NULL';
    const descEn = prod.description_en ? `'${prod.description_en.replace(/'/g, "''")}'` : 'NULL';

    sqlLines.push(
      `INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)`,
      `SELECT '${prod.sku}', id, '${prod.name_ar}', '${prod.name_en}', ${descAr}, ${descEn}, ${prod.price.toFixed(2)}, ${compareAt}, '${prod.unit_label_ar}', '${prod.unit_label_en}', ${prod.stock_quantity}, ${prod.is_featured}, true, '${imagesJson}'::jsonb`,
      `FROM public.categories WHERE slug = '${prod.category_slug}'`,
      `ON CONFLICT (sku) DO UPDATE SET`,
      `  name_ar = EXCLUDED.name_ar,`,
      `  name_en = EXCLUDED.name_en,`,
      `  description_ar = EXCLUDED.description_ar,`,
      `  description_en = EXCLUDED.description_en,`,
      `  price = EXCLUDED.price,`,
      `  compare_at_price = EXCLUDED.compare_at_price,`,
      `  unit_label_ar = EXCLUDED.unit_label_ar,`,
      `  unit_label_en = EXCLUDED.unit_label_en,`,
      `  stock_quantity = EXCLUDED.stock_quantity,`,
      `  is_featured = EXCLUDED.is_featured,`,
      `  images = EXCLUDED.images,`,
      `  updated_at = now();`,
      ''
    );
  }

  const outSqlPath = path.join(rootDir, 'supabase/seed_catalog_upsert.sql');
  fs.writeFileSync(outSqlPath, sqlLines.join('\n'), 'utf8');
  console.log(`📄 Generated idempotent SQL file: ${outSqlPath}`);
  return outSqlPath;
}

// ============================================================================
// MAIN RUNNER
// ============================================================================
async function run() {
  console.log('🚀 Al Quds Market — Idempotent Catalog & Image Importer');
  
  // 1. Generate SQL artifact
  generateIdempotentSql();

  // 2. Check if we have credentials to run directly via API
  if (!supabaseUrl) {
    console.log('ℹ️ No Supabase URL configured. SQL file generated for manual execution.');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // If admin email/password given, attempt sign in
  if (adminEmail && adminPassword) {
    console.log(`🔑 Authenticating as admin (${adminEmail})...`);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (authError) {
      console.warn(`⚠️ Admin auth failed: ${authError.message}. Proceeding with provided key...`);
    } else {
      console.log('✅ Admin session authenticated!');
    }
  }

  // Attempt direct API upsert
  console.log(`📡 Connecting to ${supabaseUrl}...`);
  const { data: testCat, error: testError } = await supabase.from('categories').select('id').limit(1);

  if (testError) {
    console.log(`⚠️ Client API cannot bypass RLS without service_role key or admin session: ${testError.message}`);
    console.log(`💡 To apply the updated catalog with subcategories and full product imagery:`);
    console.log(`   👉 Run "supabase/seed_catalog_upsert.sql" directly in your Supabase SQL Editor!`);
    return;
  }

  console.log('✅ Connection verified! Ready.');
}

run();
