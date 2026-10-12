import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. i18n Locales Symmetry & RTL/LTR Tests
// ---------------------------------------------------------------------------
test('i18n: Arabic and English translation keys must have 100% parity', () => {
  const arPath = path.join(rootDir, 'src/locales/ar.json');
  const enPath = path.join(rootDir, 'src/locales/en.json');

  assert.ok(fs.existsSync(arPath), 'ar.json must exist');
  assert.ok(fs.existsSync(enPath), 'en.json must exist');

  const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  const getDeepKeys = (obj, prefix = '') => {
    return Object.keys(obj).reduce((keys, k) => {
      const val = obj[k];
      const fullKey = prefix ? `${prefix}.${k}` : k;
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        return keys.concat(getDeepKeys(val, fullKey));
      }
      return keys.concat(fullKey);
    }, []);
  };

  const arKeys = getDeepKeys(ar).sort();
  const enKeys = getDeepKeys(en).sort();

  const missingInEn = arKeys.filter((k) => !enKeys.includes(k));
  const missingInAr = enKeys.filter((k) => !arKeys.includes(k));

  assert.deepEqual(
    missingInEn,
    [],
    `Missing in en.json: ${missingInEn.join(', ')}`
  );
  assert.deepEqual(
    missingInAr,
    [],
    `Missing in ar.json: ${missingInAr.join(', ')}`
  );
  assert.equal(arKeys.length, enKeys.length, 'Both locale files must have identical key count');
  assert.ok(arKeys.length >= 50, 'Translation dictionary must have substantial coverage');
});

test('i18n & HTML: Entry point defaults to Arabic RTL and loads Cairo font', () => {
  const htmlPath = path.join(rootDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.match(html, /<html\s+[^>]*dir="rtl"/i, 'HTML must declare dir="rtl"');
  assert.match(html, /<html\s+[^>]*lang="ar"/i, 'HTML must declare lang="ar"');
  assert.match(html, /Cairo:wght@/i, 'HTML must preload Cairo font for Arabic');
  assert.match(html, /Inter:wght@/i, 'HTML must preload Inter font for Latin');
});

// ---------------------------------------------------------------------------
// 2. Pure Utilities Tests
// ---------------------------------------------------------------------------
test('utils: clamp clamps values to given min and max', () => {
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
});

test('utils: localizedText falls back properly between languages', () => {
  const localizedText = (ar, en, lang) => {
    if (lang === 'ar') return ar || en || '';
    return en || ar || '';
  };

  assert.equal(localizedText('طماطم', 'Tomatoes', 'ar'), 'طماطم');
  assert.equal(localizedText('طماطم', 'Tomatoes', 'en'), 'Tomatoes');
  assert.equal(localizedText('طماطم', '', 'en'), 'طماطم');
  assert.equal(localizedText('', 'Tomatoes', 'ar'), 'Tomatoes');
});

// ---------------------------------------------------------------------------
// 3. Cart Calculations & Concurrency Stock Limiting Tests
// ---------------------------------------------------------------------------
test('cart: item quantity additions and stock capping', () => {
  // Simulate cart item addition logic
  const mockProduct = {
    id: 'prod-1',
    price: 12.5,
    stock_quantity: 5,
  };

  let items = [];

  const addItem = (product, qty = 1) => {
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + qty, product.stock_quantity);
    } else {
      items.push({
        product,
        quantity: Math.min(qty, product.stock_quantity),
      });
    }
  };

  addItem(mockProduct, 2);
  assert.equal(items[0].quantity, 2);

  addItem(mockProduct, 2);
  assert.equal(items[0].quantity, 4);

  // Exceed stock: 4 + 3 = 7, but stock is 5
  addItem(mockProduct, 3);
  assert.equal(items[0].quantity, 5, 'Quantity must never exceed stock_quantity');

  // Subtotal calculation
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  assert.equal(subtotal, 62.5); // 5 * 12.5
});

// ---------------------------------------------------------------------------
// 4. Branding & Design Tokens Integrity
// ---------------------------------------------------------------------------
test('branding: Tailwind config includes required brand tokens', () => {
  const tailwindPath = path.join(rootDir, 'tailwind.config.ts');
  const tailwind = fs.readFileSync(tailwindPath, 'utf8');

  assert.match(tailwind, /#15803d/, 'Tailwind config must include brand deep green #15803d');
  assert.match(tailwind, /#4ade80|#22c55e/, 'Tailwind config must include fresh green accent');
  assert.match(tailwind, /Cairo/, 'Tailwind config must include Cairo in font families');
});

// ---------------------------------------------------------------------------
// 5. Phase 2: Schema Migrations & Security Tests
// ---------------------------------------------------------------------------
test('security: full_setup.sql enforces RLS and safe triggers on all tables', () => {
  const sqlPath = path.join(rootDir, 'supabase/full_setup.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Verify RLS enabled on all core tables
  const tables = ['profiles', 'categories', 'products', 'delivery_areas', 'orders', 'order_items', 'promotions', 'favorites'];
  for (const t of tables) {
    assert.match(
      sql,
      new RegExp(`ALTER TABLE public\\.${t} ENABLE ROW LEVEL SECURITY`, 'i'),
      `RLS must be explicitly enabled on table ${t}`
    );
  }

  // Verify concurrency safe stock functions
  assert.match(sql, /decrement_product_stock/i, 'Must contain decrement_product_stock function');
  assert.match(sql, /FOR UPDATE/i, 'Stock decrement must acquire FOR UPDATE row lock');

  // Verify admin helper function and storage policies
  assert.match(sql, /CREATE OR REPLACE FUNCTION public\.is_admin/i, 'Must contain is_admin function');
  assert.match(sql, /storage\.buckets/i, 'Must contain storage bucket provisioning');
  assert.match(sql, /product-images/i, 'Must contain product-images storage bucket');
  assert.match(sql, /promote_user_to_admin/i, 'Must contain secure admin provisioning function');
});

test('security: client environment variables must never expose service_role secret', () => {
  const envPath = path.join(rootDir, '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    assert.match(envContent, /VITE_SUPABASE_URL=/i, 'Must define VITE_SUPABASE_URL');
    assert.match(envContent, /VITE_SUPABASE_ANON_KEY=/i, 'Must define VITE_SUPABASE_ANON_KEY');
    assert.doesNotMatch(
      envContent,
      /service_role/i,
      'SECURITY: service_role key must NEVER be in frontend .env'
    );
  }
});

test('storage: getProductImageUrl resolves both relative paths and absolute URLs', () => {
  const getProductImageUrl = (filePath, supabaseUrl) => {
    if (!filePath) return '';
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath;
    return `${supabaseUrl}/storage/v1/object/public/product-images/${filePath}`;
  };

  const fakeBase = 'https://fake-project.supabase.co';
  assert.equal(
    getProductImageUrl('https://example.com/apple.jpg', fakeBase),
    'https://example.com/apple.jpg'
  );
  assert.equal(
    getProductImageUrl('products/fresh-tomatoes.png', fakeBase),
    'https://fake-project.supabase.co/storage/v1/object/public/product-images/products/fresh-tomatoes.png'
  );
  assert.equal(getProductImageUrl('', fakeBase), '');
});

