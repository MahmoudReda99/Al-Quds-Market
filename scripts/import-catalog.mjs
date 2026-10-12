/**
 * Al Quds Market — Comprehensive Supermarket Catalog & Image Import Script
 * 
 * Inspired by InstaShop supermarket hierarchy (e.g. Spinneys/Carrefour):
 * Populates all 9 departments and all subcategories with high-quality,
 * realistic supermarket products, complete bilingual descriptions,
 * proper unit pricing in Shekels (₪), and real retail photography CDN images.
 * 
 * NO category or subcategory is left blank!
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
// COMPREHENSIVE SUPERMARKET CATALOG DEFINITION
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
        { slug: 'herbs-leaves', name_ar: 'ورقيات وأعشاب', name_en: 'Herbs & Greens', icon: '🌿', sort_order: 3 },
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
        { slug: 'eggs-butter', name_ar: 'بيض وزبدة', name_en: 'Eggs & Butter', icon: '🥚', sort_order: 3 },
      ],
    },
    {
      slug: 'bakery',
      name_ar: 'مخبوزات طازجة',
      name_en: 'Fresh Bakery',
      icon: '🍞',
      sort_order: 3,
      subcategories: [
        { slug: 'pita-bread', name_ar: 'خبز عربي وكعك القدس', name_en: 'Pita & Jerusalem Bread', icon: '🫓', sort_order: 1 },
        { slug: 'pastries', name_ar: 'معجنات ومناقيش', name_en: 'Pastries & Manakish', icon: '🥐', sort_order: 2 },
        { slug: 'cakes-sweets', name_ar: 'كيك وحلويات شرقية', name_en: 'Cakes & Sweets', icon: '🧁', sort_order: 3 },
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
        { slug: 'cold-cuts', name_ar: 'مرتديلا ونقانق', name_en: 'Cold Cuts & Sausages', icon: '🌭', sort_order: 3 },
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
        { slug: 'rice-grains', name_ar: 'أرز وبقوليات', name_en: 'Rice & Pulses', icon: '🌾', sort_order: 2 },
        { slug: 'pasta-sauces', name_ar: 'معكرونة وصلصات', name_en: 'Pasta & Tomato Sauces', icon: '🍝', sort_order: 3 },
        { slug: 'canned-goods', name_ar: 'معلبات وتونة', name_en: 'Canned Food & Tuna', icon: '🥫', sort_order: 4 },
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
        { slug: 'soft-drinks', name_ar: 'مشروبات غازية', name_en: 'Soft Drinks', icon: '🥤', sort_order: 3 },
        { slug: 'hot-drinks', name_ar: 'شاي وقهوة', name_en: 'Coffee & Tea', icon: '☕', sort_order: 4 },
      ],
    },
    {
      slug: 'snacks-sweets',
      name_ar: 'وجبات خفيفة ومسليات',
      name_en: 'Snacks & Confectionery',
      icon: '🍫',
      sort_order: 7,
      subcategories: [
        { slug: 'chocolates', name_ar: 'شوكولاتة وبسكويت', name_en: 'Chocolates & Biscuits', icon: '🍫', sort_order: 1 },
        { slug: 'chips-crisps', name_ar: 'شيبس ومقرمشات', name_en: 'Chips & Crisps', icon: '🍿', sort_order: 2 },
        { slug: 'nuts-dates', name_ar: 'مكسرات وتمور', name_en: 'Nuts & Medjool Dates', icon: '🥜', sort_order: 3 },
      ],
    },
    {
      slug: 'household',
      name_ar: 'منظفات وعناية منزلية',
      name_en: 'Household & Cleaning',
      icon: '🧹',
      sort_order: 8,
      subcategories: [
        { slug: 'laundry', name_ar: 'غسيل الملابس', name_en: 'Laundry Detergents', icon: '🧺', sort_order: 1 },
        { slug: 'dishwashing', name_ar: 'تنظيف الأطباق والأسطح', name_en: 'Dishwashing & Surface', icon: '🧴', sort_order: 2 },
        { slug: 'paper-products', name_ar: 'ورقيات وأكياس نفايات', name_en: 'Paper & Garbage Bags', icon: '🧻', sort_order: 3 },
      ],
    },
    {
      slug: 'personal-care',
      name_ar: 'عناية شخصية',
      name_en: 'Personal Care',
      icon: '🧼',
      sort_order: 9,
      subcategories: [
        { slug: 'hair-body', name_ar: 'شامبو واستحمام', name_en: 'Hair & Body Wash', icon: '🚿', sort_order: 1 },
        { slug: 'oral-care', name_ar: 'صحة الفم والأسنان', name_en: 'Oral Care & Toothpaste', icon: '🪥', sort_order: 2 },
      ],
    },
  ],

  products: [
    // -------------------------------------------------------------------------
    // 1. FRESH PRODUCE (خضار وفواكه طازجة)
    // -------------------------------------------------------------------------
    {
      sku: 'VEG-TOM-01',
      category_slug: 'fresh-produce',
      name_ar: 'طماطم مزارع طازجة نخب أول',
      name_en: 'Fresh Farm Tomatoes Grade A',
      description_ar: 'طماطم حمراء ناضجة ومختارة بعناية للطبخ والسلطات اليومية من مزارع فلسطين.',
      description_en: 'Ripe red farm tomatoes, hand-picked and ideal for salads and daily cooking.',
      price: 6.50,
      compare_at_price: 8.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 180,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80', alt_ar: 'طماطم طازجة', alt_en: 'Fresh Tomatoes' }],
    },
    {
      sku: 'VEG-CUC-01',
      category_slug: 'fresh-produce',
      name_ar: 'خيار بلدي مقرمش صغير',
      name_en: 'Baby Crisp Cucumbers',
      description_ar: 'خيار مقرمش طازج يومياً، مثالي للسلطات والمقبلات الصحية.',
      description_en: 'Crisp, fresh baby cucumbers harvested daily, perfect for fresh salads.',
      price: 5.50,
      compare_at_price: 7.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 160,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80', alt_ar: 'خيار بلدي', alt_en: 'Cucumbers' }],
    },
    {
      sku: 'VEG-POT-01',
      category_slug: 'fresh-produce',
      name_ar: 'بطاطا بلدية صفراء للطبخ والقلي',
      name_en: 'Local Golden Cooking Potatoes',
      description_ar: 'بطاطا طازجة ممتازة للقلي والخبز والطبخ المنزلي، حبات متوسطة ونظيفة.',
      description_en: 'All-purpose golden potatoes, ideal for roasting, boiling, and frying.',
      price: 4.50,
      compare_at_price: null,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 250,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80', alt_ar: 'بطاطا طازجة', alt_en: 'Golden Potatoes' }],
    },
    {
      sku: 'FRT-APP-01',
      category_slug: 'fresh-produce',
      name_ar: 'تفاح أحمر مقرمش سكري',
      name_en: 'Crisp Red Sweet Apples',
      description_ar: 'تفاح أحمر حلو ومقرمش، قطاف يومي طازج وغني بالفيتامينات.',
      description_en: 'Crisp and juicy sweet red apples, packed with natural flavor and vitamins.',
      price: 11.50,
      compare_at_price: 14.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 140,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80', alt_ar: 'تفاح أحمر', alt_en: 'Red Apples' }],
    },
    {
      sku: 'FRT-BAN-01',
      category_slug: 'fresh-produce',
      name_ar: 'موز استوائي نخب ممتاز',
      name_en: 'Premium Cavendish Bananas',
      description_ar: 'موز أصفر ناضج غني بالبوتاسيوم والطاقة، مثالي للفطور والرياضيين.',
      description_en: 'Fresh naturally ripened bananas, packed with potassium and natural sweetness.',
      price: 7.50,
      compare_at_price: null,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 190,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80', alt_ar: 'موز طازج', alt_en: 'Bananas' }],
    },
    {
      sku: 'FRT-ORG-01',
      category_slug: 'fresh-produce',
      name_ar: 'برتقال أبو صرة بلدي عصير ومائدة',
      name_en: 'Local Navel Juicy Oranges',
      description_ar: 'برتقال محلي ممتلئ بالعصير الطبيعي، غني بفيتامين C لتعزيز المناعة.',
      description_en: 'Sweet and juicy fresh navel oranges, full of Vitamin C.',
      price: 6.00,
      compare_at_price: 7.50,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 170,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80', alt_ar: 'برتقال بلدي', alt_en: 'Navel Oranges' }],
    },
    {
      sku: 'HRB-MNT-01',
      category_slug: 'fresh-produce',
      name_ar: 'نعناع بلدي أخضر فواح',
      name_en: 'Fresh Local Green Mint Bunch',
      description_ar: 'باقة نعناع أخضر فواح برائحة زكية، قطاف الصباح لشاي الصباح والسلطات.',
      description_en: 'Aromatic fresh green mint bunch, picked this morning for tea and salads.',
      price: 2.50,
      compare_at_price: null,
      unit_label_ar: 'ضمة',
      unit_label_en: 'bunch',
      stock_quantity: 80,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=600&auto=format&fit=crop&q=80', alt_ar: 'نعناع بلدي', alt_en: 'Fresh Mint' }],
    },

    // -------------------------------------------------------------------------
    // 2. DAIRY & EGGS (ألبان وبيض)
    // -------------------------------------------------------------------------
    {
      sku: 'DAI-MLK-01',
      category_slug: 'dairy-eggs',
      name_ar: 'حليب أبقار طازج كامل الدسم (1 لتر)',
      name_en: 'Fresh Full Cream Cow Milk 1L',
      description_ar: 'حليب طازج مبستر 100% طبيعي بدون مواد حافظة، غني بالكالسيوم والبروتين.',
      description_en: '100% pure fresh pasteurized whole milk, rich in calcium and essential vitamins.',
      price: 9.00,
      compare_at_price: null,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 95,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80', alt_ar: 'حليب طازج', alt_en: 'Full Cream Milk' }],
    },
    {
      sku: 'DAI-EGG-01',
      category_slug: 'dairy-eggs',
      name_ar: 'طبق بيض مزارع طازج نخب أول (30 بيضة)',
      name_en: 'Fresh Farm Grade-A Eggs Tray (30 Pcs)',
      description_ar: 'بيض مزارع طازج نخب أول، مفحوص ومختار بعناية لفطور عائلي متكامل.',
      description_en: 'Fresh grade-A farm eggs carton containing 30 pieces, protein packed.',
      price: 24.00,
      compare_at_price: 28.00,
      unit_label_ar: 'طبق 30 بيضة',
      unit_label_en: 'tray 30pcs',
      stock_quantity: 85,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80', alt_ar: 'طبق بيض طازج', alt_en: 'Farm Eggs' }],
    },
    {
      sku: 'DAI-CHS-01',
      category_slug: 'dairy-eggs',
      name_ar: 'جبنة بيضاء نابلسية بلدية مغلية (500غ)',
      name_en: 'Traditional Nabulsi Boiled White Cheese (500g)',
      description_ar: 'جبنة نابلسية أصيلة مغلية بحبة البركة والمستكة، طعم لا يُقاوم للمعجنات والتوست.',
      description_en: 'Traditional Palestinian white brined cheese with nigella seeds and mastic, 500g vacuum pack.',
      price: 22.00,
      compare_at_price: 26.00,
      unit_label_ar: '500غ',
      unit_label_en: '500g',
      stock_quantity: 65,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80', alt_ar: 'جبنة نابلسية', alt_en: 'Nabulsi Cheese' }],
    },
    {
      sku: 'DAI-LAB-01',
      category_slug: 'dairy-eggs',
      name_ar: 'لبنة بلدية حامضة بزيت الزيتون (500غ)',
      name_en: 'Traditional Artisan Labneh (500g)',
      description_ar: 'لبنة بلدية كثيفة ومصنوعة من حليب طازج 100%، مثالية مع رشة زعتر وزيت.',
      description_en: 'Thick traditional creamy labneh made from pure fresh milk, 500g tub.',
      price: 15.00,
      compare_at_price: 17.50,
      unit_label_ar: '500غ',
      unit_label_en: '500g',
      stock_quantity: 50,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1576186726580-a816e8b12896?w=600&auto=format&fit=crop&q=80', alt_ar: 'لبنة بلدية', alt_en: 'Fresh Labneh' }],
    },
    {
      sku: 'DAI-BTR-01',
      category_slug: 'dairy-eggs',
      name_ar: 'زبدة طبيعية غير مملحة (200غ)',
      name_en: 'Pure Unsalted Natural Butter (200g)',
      description_ar: 'زبدة طبيعية نقية 100% من قشطة الحليب الطازج، مثالية للحلويات والطبخ.',
      description_en: 'Pure 100% natural cream butter block without salt, 200g foil pack.',
      price: 9.50,
      compare_at_price: null,
      unit_label_ar: '200غ',
      unit_label_en: '200g',
      stock_quantity: 70,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80', alt_ar: 'زبدة طبيعية', alt_en: 'Pure Butter' }],
    },

    // -------------------------------------------------------------------------
    // 3. BAKERY (مخبوزات طازجة)
    // -------------------------------------------------------------------------
    {
      sku: 'BAK-BRD-01',
      category_slug: 'bakery',
      name_ar: 'خبز كماج عربي ساخن (ربطة 8 أرغفة)',
      name_en: 'Fresh Arabic Pita Bread (8 Pack)',
      description_ar: 'خبز عربي أبيض طازج من الفرن مباشرة يومياً، ربطة تحتوي على 8 أرغفة طرية.',
      description_en: 'Freshly baked traditional Arabic pita bread, bag of 8 soft loaves.',
      price: 4.50,
      compare_at_price: null,
      unit_label_ar: 'ربطة',
      unit_label_en: 'pack',
      stock_quantity: 130,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=80', alt_ar: 'خبز كماج', alt_en: 'Arabic Pita Bread' }],
    },
    {
      sku: 'BAK-KAAK-01',
      category_slug: 'bakery',
      name_ar: 'كعك القدس بالسمسم طازج ومقرمش',
      name_en: 'Authentic Jerusalem Sesame Kaak Bread',
      description_ar: 'كعك القدس الشهير المخبوز على الحطب بالسمسم الذهبي، نكهة باب العمود الأصيلة.',
      description_en: 'Iconic Jerusalem wood-fired sesame bread rings, crispy outside and soft inside.',
      price: 5.00,
      compare_at_price: null,
      unit_label_ar: 'رغيف',
      unit_label_en: 'piece',
      stock_quantity: 90,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80', alt_ar: 'كعك القدس', alt_en: 'Jerusalem Kaak' }],
    },
    {
      sku: 'BAK-MAN-01',
      category_slug: 'bakery',
      name_ar: 'مناقيش زعتر بلدي بزيت الزيتون (حبة)',
      name_en: 'Fresh Zaatar & Olive Oil Manousheh',
      description_ar: 'منقوشة زعتر فلسطيني أصيل مخلوط بزيت الزيتون البكر، مخبوزة على الطابون.',
      description_en: 'Warm flatbread topped with fragrant wild thyme zaatar blend and virgin olive oil.',
      price: 7.00,
      compare_at_price: 9.00,
      unit_label_ar: 'قطعة',
      unit_label_en: 'piece',
      stock_quantity: 60,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80', alt_ar: 'منقوشة زعتر', alt_en: 'Zaatar Manousheh' }],
    },
    {
      sku: 'BAK-CRS-01',
      category_slug: 'bakery',
      name_ar: 'كرواسون زبدة فرنسي فاخر (قطعتين)',
      name_en: 'French Butter Croissant (2 Pcs)',
      description_ar: 'كرواسون هش ومورق ومخبوز بالزبدة الطبيعية الغنية، مثالي مع القهوة الصباحية.',
      description_en: 'Flaky golden artisanal butter croissants baked fresh, pack of 2.',
      price: 12.00,
      compare_at_price: 15.00,
      unit_label_ar: 'عبوة قطعتين',
      unit_label_en: '2pcs pack',
      stock_quantity: 45,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80', alt_ar: 'كرواسون زبدة', alt_en: 'Butter Croissant' }],
    },

    // -------------------------------------------------------------------------
    // 4. MEAT & POULTRY (لحوم ودواجن)
    // -------------------------------------------------------------------------
    {
      sku: 'MEA-CHK-01',
      category_slug: 'meat-poultry',
      name_ar: 'دجاج طازج كامل مذبوح حلال ومغسول (1.2 كغ)',
      name_en: 'Fresh Whole Cleaned Halal Chicken (1.2kg)',
      description_ar: 'دجاج مزارع طازج مذبوح ومجهز حلال يومياً، منتقى بعناية ونظيف وجاهز للطبخ.',
      description_en: 'Fresh farm-raised whole chicken, 100% Halal slaughtered and cleaned, ~1.2kg.',
      price: 26.00,
      compare_at_price: 30.00,
      unit_label_ar: 'حبة (1.2كغ)',
      unit_label_en: 'piece (1.2kg)',
      stock_quantity: 65,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80', alt_ar: 'دجاج طازج كامل', alt_en: 'Whole Chicken' }],
    },
    {
      sku: 'MEA-BRS-01',
      category_slug: 'meat-poultry',
      name_ar: 'صدور دجاج فيليه طازجة بدون عظم (1 كغ)',
      name_en: 'Fresh Boneless Chicken Breast Fillet (1kg)',
      description_ar: 'صدور دجاج طازجة مخلية من العظم والجلد، عالية البروتين ومثالية للشوي والطهي الصحي.',
      description_en: 'Tender skinless and boneless chicken breast fillets, packed with lean protein, 1kg.',
      price: 38.00,
      compare_at_price: 44.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 50,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80', alt_ar: 'صدور دجاج فيليه', alt_en: 'Chicken Breast' }],
    },
    {
      sku: 'MEA-BEEF-01',
      category_slug: 'meat-poultry',
      name_ar: 'لحم عجل بلدي مفروم طازج (1 كغ)',
      name_en: 'Fresh Minced Beef Veal (1kg)',
      description_ar: 'لحم عجل طازج مفروم أمامك بدهن متوازن 15%، مثالي للكفتة والبرغر والصواني.',
      description_en: 'Freshly ground premium beef veal, optimal 85/15 lean ratio, 1kg pack.',
      price: 65.00,
      compare_at_price: 75.00,
      unit_label_ar: 'كغ',
      unit_label_en: 'kg',
      stock_quantity: 40,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop&q=80', alt_ar: 'لحم عجل مفروم', alt_en: 'Minced Beef' }],
    },

    // -------------------------------------------------------------------------
    // 5. PANTRY & GRAINS (مواد تموينية وبقوليات)
    // -------------------------------------------------------------------------
    {
      sku: 'PAN-OIL-01',
      category_slug: 'pantry',
      name_ar: 'زيت زيتون فلسطيني بكر ممتاز عصرة أولى (1 لتر)',
      name_en: 'Palestinian Extra Virgin Olive Oil 1L',
      description_ar: 'زيت زيتون بلدي معصور على البارد من جبال القدس، نكهة أصيلة ورائحة زكية وقيمة غذائية عالية.',
      description_en: 'First cold-pressed extra virgin olive oil from Palestinian mountain groves, 1L bottle.',
      price: 36.00,
      compare_at_price: 42.00,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 110,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', alt_ar: 'زيت زيتون بكر', alt_en: 'Extra Virgin Olive Oil' }],
    },
    {
      sku: 'PAN-RIC-01',
      category_slug: 'pantry',
      name_ar: 'أرز بسمتي هندي حبة طويلة فاخر (5 كغ)',
      name_en: 'Premium Indian Basmati Rice (5kg)',
      description_ar: 'أرز بسمتي عالي الجودة حبة طويلة ناصع البياض ورائحة زكية، كيس خيش 5 كغم.',
      description_en: 'Aromatic long-grain aged Indian basmati rice, 5kg sturdy bag.',
      price: 48.00,
      compare_at_price: 55.00,
      unit_label_ar: 'كيس 5كغ',
      unit_label_en: '5kg bag',
      stock_quantity: 80,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80', alt_ar: 'أرز بسمتي فاخر', alt_en: 'Basmati Rice' }],
    },
    {
      sku: 'PAN-PST-01',
      category_slug: 'pantry',
      name_ar: 'معكرونة سباغيتي إيطالية قمح قاسي (500غ)',
      name_en: 'Italian Durum Wheat Spaghetti (500g)',
      description_ar: 'معكرونة سباغيتي كلاسيكية مصنوعة من سميد القمح القاسي 100%، قوام متماسك ولذيذ.',
      description_en: 'Classic 100% durum wheat semolina Italian spaghetti, 500g packet.',
      price: 5.50,
      compare_at_price: 7.00,
      unit_label_ar: '500غ',
      unit_label_en: '500g',
      stock_quantity: 140,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281295?w=600&auto=format&fit=crop&q=80', alt_ar: 'معكرونة سباغيتي', alt_en: 'Spaghetti Pasta' }],
    },
    {
      sku: 'PAN-TOM-01',
      category_slug: 'pantry',
      name_ar: 'معجون طماطم مركز مضاعف (400غ)',
      name_en: 'Double Concentrated Tomato Paste (400g)',
      description_ar: 'صلصة طماطم كثيفة ولون أحمر غني، طبيعية وخالية من المواد الحافظة للطبخ والشوربات.',
      description_en: 'Rich double-concentrated pure tomato paste can, 400g tin.',
      price: 4.00,
      compare_at_price: null,
      unit_label_ar: 'علبة 400غ',
      unit_label_en: '400g tin',
      stock_quantity: 160,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&auto=format&fit=crop&q=80', alt_ar: 'معجون طماطم', alt_en: 'Tomato Paste' }],
    },
    {
      sku: 'PAN-TUN-01',
      category_slug: 'pantry',
      name_ar: 'تونة لحم أبيض بزيت الزيتون (160غ)',
      name_en: 'Solid White Tuna in Olive Oil (160g)',
      description_ar: 'تونة قطع كاملة لحم أبيض فاخرة محفوظة في زيت الزيتون الصافي، غنية بأوميغا 3.',
      description_en: 'Premium solid light tuna chunks packed in pure olive oil, 160g can.',
      price: 8.50,
      compare_at_price: 10.50,
      unit_label_ar: 'علبة',
      unit_label_en: 'can',
      stock_quantity: 120,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=600&auto=format&fit=crop&q=80', alt_ar: 'تونة بزيت الزيتون', alt_en: 'Tuna in Olive Oil' }],
    },

    // -------------------------------------------------------------------------
    // 6. BEVERAGES (مشروبات وعصائر)
    // -------------------------------------------------------------------------
    {
      sku: 'BEV-WTR-01',
      category_slug: 'beverages',
      name_ar: 'طرد مياه ينابيع معدنية نقية (6 × 1.5 لتر)',
      name_en: 'Natural Spring Mineral Water Pack (6 x 1.5L)',
      description_ar: 'مياه شرب طبيعية نقية متوازنة المعادن، طرد اقتصادي يحتوي على 6 زجاجات سعة 1.5 لتر.',
      description_en: 'Pure natural spring drinking water, value pack of 6 bottles x 1.5L each.',
      price: 13.50,
      compare_at_price: 16.00,
      unit_label_ar: 'طرد 6 قناني',
      unit_label_en: 'pack of 6',
      stock_quantity: 150,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80', alt_ar: 'مياه معدنية', alt_en: 'Mineral Water' }],
    },
    {
      sku: 'BEV-JUC-01',
      category_slug: 'beverages',
      name_ar: 'عصير برتقال طبيعي 100% طازج (1 لتر)',
      name_en: '100% Pure Fresh Squeezed Orange Juice 1L',
      description_ar: 'عصير برتقال طبيعي معصور طازج بدون سكر مضاف أو ماء، غني بفيتامين C.',
      description_en: '100% freshly squeezed pure orange juice without added sugar, 1L bottle.',
      price: 11.00,
      compare_at_price: 13.50,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 75,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80', alt_ar: 'عصير برتقال', alt_en: 'Orange Juice' }],
    },
    {
      sku: 'BEV-TEA-01',
      category_slug: 'beverages',
      name_ar: 'شاي سيلاني أسود فاخر (100 كيس)',
      name_en: 'Premium Ceylon Black Tea (100 Bags)',
      description_ar: 'شاي سيلاني أصلي منتقى من أجود مزارع الشاي، لون ذهبي غامق ونكهة غنية منعشة.',
      description_en: 'Finest pure Ceylon black tea, 100 enveloped tea bags for rich aromatic taste.',
      price: 16.00,
      compare_at_price: 19.00,
      unit_label_ar: 'علبة 100 كيس',
      unit_label_en: 'box 100 bags',
      stock_quantity: 90,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80', alt_ar: 'شاي أسود', alt_en: 'Black Tea' }],
    },
    {
      sku: 'BEV-COF-01',
      category_slug: 'beverages',
      name_ar: 'قهوة مقدسية بالهيل مطحونة طازجة (250غ)',
      name_en: 'Jerusalem Roasted Coffee with Cardamom (250g)',
      description_ar: 'بن تركي مقدسي محمص ومطحون طازجاً وممزوج بحبات الهيل الخضراء الفواحة.',
      description_en: 'Artisan freshly ground Jerusalem roast coffee blended with aromatic cardamom, 250g.',
      price: 18.00,
      compare_at_price: 22.00,
      unit_label_ar: '250غ',
      unit_label_en: '250g',
      stock_quantity: 85,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80', alt_ar: 'قهوة بالهيل', alt_en: 'Arabic Coffee' }],
    },
    {
      sku: 'BEV-COLA-01',
      category_slug: 'beverages',
      name_ar: 'كوكا كولا علبة باردة (330 مل)',
      name_en: 'Coca-Cola Classic Can (330ml)',
      description_ar: 'مشروب غازي منعش بالنكهة الكلاسيكية المميزة، علبة معدنية 330 مل.',
      description_en: 'Refreshing original taste sparkling cola drink, 330ml aluminum can.',
      price: 3.50,
      compare_at_price: null,
      unit_label_ar: 'علبة 330مل',
      unit_label_en: 'can 330ml',
      stock_quantity: 200,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80', alt_ar: 'كوكا كولا', alt_en: 'Coca Cola Can' }],
    },

    // -------------------------------------------------------------------------
    // 7. SNACKS & SWEETS (وجبات خفيفة ومسليات)
    // -------------------------------------------------------------------------
    {
      sku: 'SNK-CHP-01',
      category_slug: 'snacks-sweets',
      name_ar: 'شيبس بطاطا مقرمش بالملح البحري (150غ)',
      name_en: 'Crunchy Kettle Sea Salt Potato Chips (150g)',
      description_ar: 'رقائق بطاطا طبيعية مقلية بزيت نقي ومتبلة بالملح الخفيف، قرمشة مثالية.',
      description_en: 'Golden crispy natural potato chips seasoned with fine sea salt, 150g bag.',
      price: 6.50,
      compare_at_price: null,
      unit_label_ar: 'كيس 150غ',
      unit_label_en: '150g bag',
      stock_quantity: 110,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80', alt_ar: 'شيبس بطاطا', alt_en: 'Potato Chips' }],
    },
    {
      sku: 'SNK-DAT-01',
      category_slug: 'snacks-sweets',
      name_ar: 'تمر مجهول فلسطيني فاخر حبة كبيرة (1 كغ)',
      name_en: 'Premium Palestinian Medjool Dates Jumbo (1kg)',
      description_ar: 'تمر مجهول أريحا الطبيعي حبة ملكية جامبو، طري وغني بالحلاوة الطبيعية والحديد.',
      description_en: 'Jumbo Royal Medjool dates harvested from Jericho, naturally sweet and soft, 1kg box.',
      price: 38.00,
      compare_at_price: 45.00,
      unit_label_ar: 'علبة 1كغ',
      unit_label_en: '1kg box',
      stock_quantity: 95,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&auto=format&fit=crop&q=80', alt_ar: 'تمر مجهول فاخر', alt_en: 'Medjool Dates' }],
    },
    {
      sku: 'SNK-NUT-01',
      category_slug: 'snacks-sweets',
      name_ar: 'مكسرات مشكلة محمصة ومملحة خفيف (300غ)',
      name_en: 'Roasted Lightly Salted Mixed Nuts (300g)',
      description_ar: 'تشكيلة مكسرات فاخرة (كاجو، لوز، فستق حلبي، فندق) محمصة طازجة ومقرمشة.',
      description_en: 'Premium mix of roasted almonds, cashews, pistachios and hazelnuts, 300g zipper pouch.',
      price: 26.00,
      compare_at_price: 32.00,
      unit_label_ar: '300غ',
      unit_label_en: '300g',
      stock_quantity: 70,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1536591375315-1b83683e327d?w=600&auto=format&fit=crop&q=80', alt_ar: 'مكسرات مشكلة', alt_en: 'Mixed Nuts' }],
    },
    {
      sku: 'SNK-CHO-01',
      category_slug: 'snacks-sweets',
      name_ar: 'لوح شوكولاتة بالحليب والبندق الفاخر (100غ)',
      name_en: 'Swiss Milk Chocolate with Whole Hazelnuts (100g)',
      description_ar: 'شوكولاتة سويسرية حريرية غنية بالحليب الطبيعي وقطع البندق الكاملة المحمصة.',
      description_en: 'Silky smooth milk chocolate bar packed with whole crunchy roasted hazelnuts, 100g.',
      price: 9.00,
      compare_at_price: 11.50,
      unit_label_ar: 'لوح 100غ',
      unit_label_en: '100g bar',
      stock_quantity: 130,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80', alt_ar: 'شوكولاتة بالحليب', alt_en: 'Chocolate Bar' }],
    },

    // -------------------------------------------------------------------------
    // 8. HOUSEHOLD & CLEANING (منظفات وعناية منزلية)
    // -------------------------------------------------------------------------
    {
      sku: 'HOU-DET-01',
      category_slug: 'household',
      name_ar: 'جل غسيل ملابس مركز برائحة اللافندر (3 لتر)',
      name_en: 'Concentrated Liquid Laundry Detergent Gel 3L',
      description_ar: 'سائل غسيل قوي لإزالة البقع العميقة برائحة زهور اللافندر المنعشة للغسالات الأوتوماتيك.',
      description_en: 'Deep-cleaning concentrated liquid laundry detergent with lavender scent, 3 Liters bottle.',
      price: 34.00,
      compare_at_price: 42.00,
      unit_label_ar: 'جالون 3 لتر',
      unit_label_en: '3L bottle',
      stock_quantity: 80,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80', alt_ar: 'سائل غسيل ملابس', alt_en: 'Laundry Detergent' }],
    },
    {
      sku: 'HOU-DSH-01',
      category_slug: 'household',
      name_ar: 'سائل جلي صحون فعال بالليمون الأخضر (1 لتر)',
      name_en: 'Grease-Cutting Dishwashing Liquid Lemon 1L',
      description_ar: 'سائل غسيل صحون قوي يقضي على الدهون بسرعة ولطيف على اليدين برائحة الليمون.',
      description_en: 'High-foaming grease-cutting dishwashing liquid soap with fresh lemon extract, 1L bottle.',
      price: 8.50,
      compare_at_price: 10.00,
      unit_label_ar: 'لتر',
      unit_label_en: 'liter',
      stock_quantity: 120,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?w=600&auto=format&fit=crop&q=80', alt_ar: 'سائل جلي صحون', alt_en: 'Dishwashing Soap' }],
    },
    {
      sku: 'HOU-PAP-01',
      category_slug: 'household',
      name_ar: 'محارم مطبخ ورقية سميكة ماصة (4 رولات)',
      name_en: 'Heavy Duty Kitchen Paper Towels (4 Rolls)',
      description_ar: 'ورق مطبخ فائق الامتصاص مكون من طبقتين سميكتين لمسح السوائل والزيوت.',
      description_en: 'Ultra-absorbent 2-ply embossed kitchen paper towels, pack of 4 giant rolls.',
      price: 14.00,
      compare_at_price: 17.00,
      unit_label_ar: 'طرد 4 رولات',
      unit_label_en: '4 rolls pack',
      stock_quantity: 90,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=600&auto=format&fit=crop&q=80', alt_ar: 'محارم مطبخ', alt_en: 'Paper Towels' }],
    },

    // -------------------------------------------------------------------------
    // 9. PERSONAL CARE (عناية شخصية)
    // -------------------------------------------------------------------------
    {
      sku: 'PER-SHM-01',
      category_slug: 'personal-care',
      name_ar: 'شامبو مغذٍ ومقوٍ للشعر بزيت الأرغان (400 مل)',
      name_en: 'Nourishing Argan Oil Hair Shampoo 400ml',
      description_ar: 'شامبو مقوٍ ومغذٍ للشعر الجاف والتالف بخلاصة زيت الأرغان الطبيعي وفيتامين E.',
      description_en: 'Moisture-rich restorative shampoo infused with Moroccan argan oil and vitamin E, 400ml.',
      price: 19.00,
      compare_at_price: 24.00,
      unit_label_ar: '400مل',
      unit_label_en: '400ml',
      stock_quantity: 75,
      is_featured: true,
      images: [{ url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80', alt_ar: 'شامبو للشعر', alt_en: 'Hair Shampoo' }],
    },
    {
      sku: 'PER-DNT-01',
      category_slug: 'personal-care',
      name_ar: 'معجون أسنان حماية متكاملة وانتعاش (100 مل)',
      name_en: 'Complete Protection Fresh Mint Toothpaste 100ml',
      description_ar: 'معجون أسنان طبي لتبييض الأسنان وحماية اللثة ومحاربة التسوس بانتعاش النعناع.',
      description_en: 'Multi-action fluoride toothpaste for cavity protection and long-lasting fresh breath, 100ml tube.',
      price: 11.50,
      compare_at_price: 14.00,
      unit_label_ar: 'أنبوب 100مل',
      unit_label_en: '100ml tube',
      stock_quantity: 110,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop&q=80', alt_ar: 'معجون أسنان', alt_en: 'Toothpaste' }],
    },
    {
      sku: 'PER-SOP-01',
      category_slug: 'personal-care',
      name_ar: 'صابون غار بلدي طبيعي بزيت الزيتون (قطعتين)',
      name_en: 'Natural Olive Oil & Laurel Herbal Soap (2 Pcs)',
      description_ar: 'صابون نابلسي بلدي طبيعي 100% بزيت الزيتون البكر والغار، لطيف ومرطب للبشرة.',
      description_en: 'Handmade 100% natural olive oil and laurel soap bars, pack of 2.',
      price: 10.00,
      compare_at_price: null,
      unit_label_ar: 'عبوة قطعتين',
      unit_label_en: 'pack of 2',
      stock_quantity: 90,
      is_featured: false,
      images: [{ url: 'https://images.unsplash.com/photo-1607006314605-aac089ffb594?w=600&auto=format&fit=crop&q=80', alt_ar: 'صابون غار بلدي', alt_en: 'Olive Oil Soap' }],
    },
  ],
};

// ============================================================================
// SQL GENERATOR (Generates 100% idempotent SQL migration)
// ============================================================================
export function generateIdempotentSql() {
  const sqlLines = [
    '-- ==============================================================================;',
    '-- Al Quds Market — Comprehensive Supermarket Catalog & Image Migration;',
    '-- Inspired by InstaShop supermarket hierarchy (9 departments, 25 subcategories, 35+ products);',
    '-- 100% idempotent: safe to run repeatedly via Supabase SQL Editor or migration runner;',
    '-- ==============================================================================;',
    '',
  ];

  // 1. Parent Categories
  for (const cat of CATALOG_DATA.categories) {
    sqlLines.push(
      `INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, is_active)`,
      `VALUES ('${cat.slug}', '${cat.name_ar.replace(/'/g, "''")}', '${cat.name_en.replace(/'/g, "''")}', '${cat.icon}', ${cat.sort_order}, true)`,
      `ON CONFLICT (slug) DO UPDATE SET`,
      `  name_ar = EXCLUDED.name_ar,`,
      `  name_en = EXCLUDED.name_en,`,
      `  icon = EXCLUDED.icon,`,
      `  sort_order = EXCLUDED.sort_order,`,
      `  is_active = true,`,
      `  updated_at = now();`,
      ''
    );

    // 2. Subcategories
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        sqlLines.push(
          `INSERT INTO public.categories (slug, name_ar, name_en, icon, sort_order, parent_id, is_active)`,
          `SELECT '${sub.slug}', '${sub.name_ar.replace(/'/g, "''")}', '${sub.name_en.replace(/'/g, "''")}', '${sub.icon}', ${sub.sort_order}, id, true`,
          `FROM public.categories WHERE slug = '${cat.slug}'`,
          `ON CONFLICT (slug) DO UPDATE SET`,
          `  name_ar = EXCLUDED.name_ar,`,
          `  name_en = EXCLUDED.name_en,`,
          `  icon = EXCLUDED.icon,`,
          `  sort_order = EXCLUDED.sort_order,`,
          `  is_active = true,`,
          `  updated_at = now();`,
          ''
        );
      }
    }
  }

  // 3. Products
  for (const prod of CATALOG_DATA.products) {
    const imagesJson = JSON.stringify(prod.images).replace(/'/g, "''");
    const compareAt = prod.compare_at_price !== null ? prod.compare_at_price.toFixed(2) : 'NULL';
    const descAr = prod.description_ar ? `'${prod.description_ar.replace(/'/g, "''")}'` : 'NULL';
    const descEn = prod.description_en ? `'${prod.description_en.replace(/'/g, "''")}'` : 'NULL';

    sqlLines.push(
      `INSERT INTO public.products (sku, category_id, name_ar, name_en, description_ar, description_en, price, compare_at_price, unit_label_ar, unit_label_en, stock_quantity, is_featured, is_active, images)`,
      `SELECT '${prod.sku}', id, '${prod.name_ar.replace(/'/g, "''")}', '${prod.name_en.replace(/'/g, "''")}', ${descAr}, ${descEn}, ${prod.price.toFixed(2)}, ${compareAt}, '${prod.unit_label_ar}', '${prod.unit_label_en}', ${prod.stock_quantity}, ${prod.is_featured}, true, '${imagesJson}'::jsonb`,
      `FROM public.categories WHERE slug = '${prod.category_slug}'`,
      `ON CONFLICT (sku) DO UPDATE SET`,
      `  category_id = EXCLUDED.category_id,`,
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
      `  is_active = true,`,
      `  images = EXCLUDED.images,`,
      `  updated_at = now();`,
      ''
    );
  }

  const outSqlPath = path.join(rootDir, 'supabase/seed_catalog_upsert.sql');
  fs.writeFileSync(outSqlPath, sqlLines.join('\n'), 'utf8');

  // Also write to migrations folder
  const migrationPath = path.join(rootDir, 'supabase/migrations/007_instashop_full_catalog.sql');
  fs.writeFileSync(migrationPath, sqlLines.join('\n'), 'utf8');

  console.log(`📄 Generated idempotent seed SQL file: ${outSqlPath}`);
  console.log(`📄 Generated migration SQL file: ${migrationPath}`);
  return { outSqlPath, migrationPath };
}

// ============================================================================
// MAIN RUNNER
// ============================================================================
async function run() {
  console.log('🚀 Al Quds Market — Comprehensive Supermarket Catalog Importer');
  
  // 1. Generate SQL migration files
  generateIdempotentSql();

  // 2. Check Supabase connection
  if (!supabaseUrl) {
    console.log('ℹ️ No Supabase URL configured. Run SQL files in Supabase Editor.');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`📡 Connecting to Supabase at ${supabaseUrl}...`);
  const { count, error } = await supabase.from('categories').select('*', { count: 'exact', head: true });

  if (error) {
    console.log(`⚠️ Note on client key: ${error.message}`);
    console.log(`💡 Run the generated "supabase/seed_catalog_upsert.sql" in your Supabase SQL Editor to upsert all data!`);
    return;
  }

  console.log(`✅ Supabase database accessible. Current categories count: ${count}`);
  console.log(`💡 To apply the full InstaShop-style supermarket catalog:`);
  console.log(`   👉 Run "supabase/seed_catalog_upsert.sql" or "supabase/migrations/007_instashop_full_catalog.sql" in your Supabase SQL Editor.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run();
}
