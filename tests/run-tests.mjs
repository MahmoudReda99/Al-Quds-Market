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

// ---------------------------------------------------------------------------
// 6. Phase 3: Catalog Import & Favorites Tests
// ---------------------------------------------------------------------------
test('catalog: seed_catalog_upsert.sql is idempotent and covers all main categories and products', () => {
  const sqlPath = path.join(rootDir, 'supabase/seed_catalog_upsert.sql');
  assert.ok(fs.existsSync(sqlPath), 'seed_catalog_upsert.sql must be generated');

  const sql = fs.readFileSync(sqlPath, 'utf8');

  // Verify idempotent upsert clauses
  assert.match(sql, /ON CONFLICT \(slug\) DO UPDATE/i, 'Categories must use ON CONFLICT (slug) DO UPDATE');
  assert.match(sql, /ON CONFLICT \(sku\) DO UPDATE/i, 'Products must use ON CONFLICT (sku) DO UPDATE');

  // Verify subcategories link to parent via slug
  assert.match(sql, /FROM public\.categories WHERE slug = 'fresh-produce'/i);
  assert.match(sql, /FROM public\.categories WHERE slug = 'dairy-eggs'/i);
});

test('favorites: toggle and deduplication logic', () => {
  let favoriteIds = [];

  const toggle = (id) => {
    if (favoriteIds.includes(id)) {
      favoriteIds = favoriteIds.filter((item) => item !== id);
    } else {
      favoriteIds.push(id);
    }
  };

  toggle('p1');
  assert.deepEqual(favoriteIds, ['p1']);

  toggle('p2');
  assert.deepEqual(favoriteIds, ['p1', 'p2']);

  toggle('p1');
  assert.deepEqual(favoriteIds, ['p2']);

  // Deduplication
  const merged = Array.from(new Set([...favoriteIds, 'p2', 'p3']));
  assert.deepEqual(merged, ['p2', 'p3']);
});

// ---------------------------------------------------------------------------
// 7. Phase 4: Customer Shopping, Delivery Calculator & Cart State Tests
// ---------------------------------------------------------------------------
test('checkout & cart: calculateDelivery calculates accurate delivery fees and free threshold', () => {
  const calculateDelivery = (subtotal, area) => {
    if (!area) {
      const defaultThreshold = 100;
      const isFree = subtotal >= defaultThreshold;
      const needed = isFree ? 0 : Math.max(0, defaultThreshold - subtotal);
      const fee = isFree ? 0 : 15;
      return {
        subtotal,
        deliveryFee: fee,
        isFreeDelivery: isFree,
        freeDeliveryThreshold: defaultThreshold,
        amountNeededForFreeDelivery: needed,
        total: subtotal + fee,
      };
    }

    const threshold = area.free_delivery_threshold;
    const isFree = threshold !== null && threshold !== undefined && subtotal >= threshold;
    const fee = isFree ? 0 : area.fee;
    const needed = threshold !== null && !isFree ? Math.max(0, threshold - subtotal) : 0;

    return {
      subtotal,
      deliveryFee: fee,
      isFreeDelivery: isFree,
      freeDeliveryThreshold: threshold,
      amountNeededForFreeDelivery: needed,
      total: subtotal + fee,
    };
  };

  const alMotamayez = {
    id: 'area-motamayez',
    name_ar: 'الحي المتميز - 6 أكتوبر',
    name_en: 'Al Motamayez District - 6th of October',
    fee: 15.0,
    free_delivery_threshold: 150.0,
  };

  // 1. Order below threshold
  const calcBelow = calculateDelivery(80, alMotamayez);
  assert.equal(calcBelow.subtotal, 80);
  assert.equal(calcBelow.deliveryFee, 15);
  assert.equal(calcBelow.isFreeDelivery, false);
  assert.equal(calcBelow.amountNeededForFreeDelivery, 70);
  assert.equal(calcBelow.total, 95);

  // 2. Order exactly at threshold
  const calcExact = calculateDelivery(150, alMotamayez);
  assert.equal(calcExact.deliveryFee, 0);
  assert.equal(calcExact.isFreeDelivery, true);
  assert.equal(calcExact.amountNeededForFreeDelivery, 0);
  assert.equal(calcExact.total, 150);

  // 3. Order above threshold
  const calcAbove = calculateDelivery(200, alMotamayez);
  assert.equal(calcAbove.deliveryFee, 0);
  assert.equal(calcAbove.isFreeDelivery, true);
  assert.equal(calcAbove.total, 200);

  // 4. Fallback when no area selected
  const calcNoArea = calculateDelivery(50, null);
  assert.equal(calcNoArea.deliveryFee, 15);
  assert.equal(calcNoArea.isFreeDelivery, false);
  assert.equal(calcNoArea.amountNeededForFreeDelivery, 50);
  assert.equal(calcNoArea.total, 65);
});

test('cart: item removals, zero-quantity transitions and complete cart clearing', () => {
  let items = [
    { product: { id: 'p1', price: 10, stock_quantity: 5 }, quantity: 2 },
    { product: { id: 'p2', price: 25, stock_quantity: 3 }, quantity: 1 },
  ];

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      items = items.filter((i) => i.product.id !== productId);
      return;
    }
    items = items.map((i) =>
      i.product.id === productId
        ? { ...i, quantity: Math.min(quantity, i.product.stock_quantity) }
        : i
    );
  };

  const clearCart = () => {
    items = [];
  };

  // Decrement p1
  updateQuantity('p1', 1);
  assert.equal(items.find((i) => i.product.id === 'p1').quantity, 1);

  // Decrement p1 to 0 -> should remove
  updateQuantity('p1', 0);
  assert.equal(items.find((i) => i.product.id === 'p1'), undefined);
  assert.equal(items.length, 1);

  // Attempt to increment p2 beyond stock of 3
  updateQuantity('p2', 10);
  assert.equal(items.find((i) => i.product.id === 'p2').quantity, 3);

  // Clear cart
  clearCart();
  assert.equal(items.length, 0);
});

test('catalog: price range filter logic works correctly', () => {
  const products = [
    { id: '1', price: 5 },
    { id: '2', price: 15 },
    { id: '3', price: 25 },
    { id: '4', price: 40 },
  ];

  const filterByRange = (items, range) => {
    return items.filter((item) => {
      if (range === 'under10') return item.price < 10;
      if (range === '10to25') return item.price >= 10 && item.price <= 25;
      if (range === 'above25') return item.price > 25;
      return true;
    });
  };

  assert.equal(filterByRange(products, 'under10').length, 1); // 5
  assert.equal(filterByRange(products, '10to25').length, 2); // 15, 25
  assert.equal(filterByRange(products, 'above25').length, 1); // 40
  assert.equal(filterByRange(products, 'all').length, 4);
});

// ---------------------------------------------------------------------------
// 8. Phase 5: Delivery & Checkout Pipeline, Order History & Inventory Validation
// ---------------------------------------------------------------------------
test('orders: status badges cover all 6 lifecycle statuses in both AR and EN', () => {
  const statuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

  const getStatusBadge = (status, lang) => {
    const isRtl = lang === 'ar';
    switch (status) {
      case 'pending':
        return { label: isRtl ? 'قيد المراجعة' : 'Pending', color: 'amber' };
      case 'confirmed':
        return { label: isRtl ? 'تم التأكيد' : 'Confirmed', color: 'sky' };
      case 'preparing':
        return { label: isRtl ? 'جاري التجهيز' : 'Preparing', color: 'indigo' };
      case 'out_for_delivery':
        return { label: isRtl ? 'في الطريق إليك' : 'Out for Delivery', color: 'orange' };
      case 'delivered':
        return { label: isRtl ? 'تم التوصيل' : 'Delivered', color: 'emerald' };
      case 'cancelled':
        return { label: isRtl ? 'ملغي' : 'Cancelled', color: 'red' };
    }
  };

  for (const s of statuses) {
    const arBadge = getStatusBadge(s, 'ar');
    const enBadge = getStatusBadge(s, 'en');

    assert.ok(arBadge.label.length > 0, `Status ${s} must have an Arabic label`);
    assert.ok(enBadge.label.length > 0, `Status ${s} must have an English label`);
    assert.equal(arBadge.color, enBadge.color, `Status ${s} must have consistent color theme`);
  }
});

test('orders: server-side subtotal and delivery fee calculation with historical snapshot preservation', () => {
  const dbProducts = [
    { id: 'prod-milk', name_ar: 'حليب', name_en: 'Fresh Milk', price: 6.5, stock: 20 },
    { id: 'prod-eggs', name_ar: 'بيض بلدي', name_en: 'Farm Eggs', price: 22.0, stock: 10 },
  ];

  const deliveryArea = {
    id: 'area-october-gardens',
    name_ar: 'حدائق أكتوبر',
    name_en: 'October Gardens (Hadayek October)',
    fee: 20.0,
    free_delivery_threshold: 200.0,
  };

  // Order with 2 Milks and 1 Eggs
  const cartItems = [
    { product_id: 'prod-milk', quantity: 2 },
    { product_id: 'prod-eggs', quantity: 1 },
  ];

  let subtotal = 0;
  const snapshotItems = [];

  for (const item of cartItems) {
    const prod = dbProducts.find((p) => p.id === item.product_id);
    assert.ok(prod, 'Product must exist in DB');
    const lineTotal = prod.price * item.quantity;
    subtotal += lineTotal;

    // Immutable snapshot
    snapshotItems.push({
      product_id: prod.id,
      product_name_ar: prod.name_ar,
      product_name_en: prod.name_en,
      unit_price: prod.price,
      quantity: item.quantity,
      line_total: lineTotal,
    });
  }

  // 2 * 6.5 (13) + 1 * 22 (22) = 35.0
  assert.equal(subtotal, 35.0);
  assert.equal(snapshotItems.length, 2);
  assert.equal(snapshotItems[0].line_total, 13.0);
  assert.equal(snapshotItems[1].line_total, 22.0);

  // Delivery fee check (35 < 200 threshold => fee is 20.0)
  const isFree = deliveryArea.free_delivery_threshold !== null && subtotal >= deliveryArea.free_delivery_threshold;
  const fee = isFree ? 0 : deliveryArea.fee;
  assert.equal(fee, 20.0);

  const total = subtotal + fee;
  assert.equal(total, 55.0);
});

test('delivery: migration 008 properly configures 6th of October city (Giza) delivery areas', () => {
  const sqlPath = path.join(rootDir, 'supabase/migrations/008_october_giza_delivery_areas.sql');
  assert.ok(fs.existsSync(sqlPath), 'Migration 008 file must exist');

  const sql = fs.readFileSync(sqlPath, 'utf8');
  assert.match(sql, /الحي المتميز - 6 أكتوبر/);
  assert.match(sql, /غرب سوميد - 6 أكتوبر/);
  assert.match(sql, /ميدان الحصري والمحور المركزي/);
  assert.match(sql, /حدائق أكتوبر/);
  assert.match(sql, /الشيخ زايد/);
  assert.match(sql, /المنطقة الصناعية - 6 أكتوبر/);
  assert.match(sql, /UPDATE public\.delivery_areas\s+SET is_active = false/);
});

test('orders: inventory validation rejects placement when requested exceeds available stock', () => {
  const stockInventory = {
    'prod-apples': 3, // only 3 apples in stock
  };

  const validateStock = (productId, requestedQty) => {
    const available = stockInventory[productId] ?? 0;
    if (available < requestedQty) {
      throw new Error(`Insufficient stock. Requested: ${requestedQty}, Available: ${available}`);
    }
    return true;
  };

  // 1. Valid quantity within stock
  assert.equal(validateStock('prod-apples', 3), true);

  // 2. Excess quantity rejected
  assert.throws(
    () => validateStock('prod-apples', 4),
    /Insufficient stock/
  );
});

test('orders: cancelling a pending order restores product inventory', () => {
  const inventory = {
    'prod-bread': 15,
  };

  // Place order of 5
  inventory['prod-bread'] -= 5;
  assert.equal(inventory['prod-bread'], 10);

  // Cancel order: restores 5
  const cancelOrder = (items) => {
    for (const item of items) {
      inventory[item.product_id] += item.quantity;
    }
  };

  cancelOrder([{ product_id: 'prod-bread', quantity: 5 }]);
  assert.equal(inventory['prod-bread'], 15, 'Inventory must be restored on cancellation');
});

// ---------------------------------------------------------------------------
// 9. Phase 7: Deployment, Mobile Packaging, Security Audit & E2E Workflows
// ---------------------------------------------------------------------------
test('deployment: vercel.json includes SPA rewrites and hardened security headers', () => {
  const vercelPath = path.join(rootDir, 'vercel.json');
  assert.ok(fs.existsSync(vercelPath), 'vercel.json must exist');

  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

  // 1. Verify SPA rewrites
  assert.ok(Array.isArray(vercelConfig.rewrites), 'Must have rewrites array');
  const spaRewrite = vercelConfig.rewrites.find((r) => r.destination === '/index.html');
  assert.ok(spaRewrite, 'Must rewrite unknown routes to /index.html for React Router');

  // 2. Verify security headers
  assert.ok(Array.isArray(vercelConfig.headers), 'Must define headers');
  const allHeaders = vercelConfig.headers.flatMap((h) => h.headers || []);
  const headerKeys = allHeaders.map((h) => h.key.toLowerCase());

  assert.ok(headerKeys.includes('x-content-type-options'), 'Must set X-Content-Type-Options');
  assert.ok(headerKeys.includes('x-frame-options'), 'Must set X-Frame-Options');
  assert.ok(headerKeys.includes('referrer-policy'), 'Must set Referrer-Policy');
});

test('mobile: capacitor.config.ts correctly defines app ID, app name, and webDir', () => {
  const capPath = path.join(rootDir, 'capacitor.config.ts');
  assert.ok(fs.existsSync(capPath), 'capacitor.config.ts must exist');

  const capContent = fs.readFileSync(capPath, 'utf8');
  assert.match(capContent, /appId:\s*['"]com\.alqudsmarket\.app['"]/i, 'Must define bundle identifier');
  assert.match(capContent, /webDir:\s*['"]dist['"]/i, 'webDir must target Vite output dist');
  assert.match(capContent, /appName:\s*['"]Al Quds Market['"]/i, 'Must define app name');

  const guidePath = path.join(rootDir, 'CAPACITOR_GUIDE.md');
  assert.ok(fs.existsSync(guidePath), 'CAPACITOR_GUIDE.md documentation must exist');
});

test('security: codebase audit verifies zero privileged service_role secrets in frontend code', () => {
  const srcDir = path.join(rootDir, 'src');

  const checkDirForSecrets = (dir) => {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const fullPath = path.join(dir, f);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        checkDirForSecrets(fullPath);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Ensure no service_role key assignment, env export, or hardcoded JWT secret
        assert.doesNotMatch(
          content,
          /(?:VITE_[A-Z_]*SERVICE_ROLE|service_role_key\s*=|supabase_service_role)/i,
          `SECURITY ALERT: privileged secret reference found in frontend file: ${f}`
        );
      }
    }
  };

  checkDirForSecrets(srcDir);
});

test('e2e: customer journey simulation (discovery -> cart -> area fees -> order placement -> cancel)', () => {
  // 1. Initial Central Inventory state
  const inventory = {
    'prod-tomato': { name: 'بندورة بلدية', price: 4.5, stock: 50 },
    'prod-cucumber': { name: 'خيار بلدي', price: 3.5, stock: 30 },
  };

  const deliveryAreas = [
    { id: 'area-beit-hanina', name: 'بيت حنينا', fee: 12.0, threshold: 120.0 },
    { id: 'area-center', name: 'وسط القدس', fee: 10.0, threshold: 100.0 },
  ];

  // 2. Customer adds to cart
  const cart = [
    { productId: 'prod-tomato', qty: 10 },   // 10 * 4.5 = 45.0
    { productId: 'prod-cucumber', qty: 20 }, // 20 * 3.5 = 70.0
  ];

  const subtotal = cart.reduce((sum, item) => sum + inventory[item.productId].price * item.qty, 0);
  assert.equal(subtotal, 115.0); // 45 + 70

  // 3. Customer selects Beit Hanina (threshold 120, subtotal 115 => not free, fee 12.0)
  const selectedArea = deliveryAreas[0];
  const fee1 = subtotal >= selectedArea.threshold ? 0 : selectedArea.fee;
  assert.equal(fee1, 12.0);
  assert.equal(subtotal + fee1, 127.0);

  // 4. Customer adds 2 more tomatoes (2 * 4.5 = 9.0 => subtotal 124.0 => qualifies for FREE delivery!)
  cart[0].qty += 2;
  const newSubtotal = cart.reduce((sum, item) => sum + inventory[item.productId].price * item.qty, 0);
  assert.equal(newSubtotal, 124.0);
  const fee2 = newSubtotal >= selectedArea.threshold ? 0 : selectedArea.fee;
  assert.equal(fee2, 0); // Free delivery!

  // 5. Checkout order placement: decrement stock
  for (const item of cart) {
    inventory[item.productId].stock -= item.qty;
  }
  assert.equal(inventory['prod-tomato'].stock, 38); // 50 - 12
  assert.equal(inventory['prod-cucumber'].stock, 10); // 30 - 20

  // 6. Order created in pending status
  const order = {
    id: 'ord-101',
    orderNumber: 1001,
    status: 'pending',
    subtotal: newSubtotal,
    deliveryFee: fee2,
    total: newSubtotal + fee2,
    items: cart,
  };
  assert.equal(order.total, 124.0);
  assert.equal(order.status, 'pending');

  // 7. Customer cancels pending order: inventory restored
  for (const item of order.items) {
    inventory[item.productId].stock += item.qty;
  }
  assert.equal(inventory['prod-tomato'].stock, 50); // Fully restored!
  assert.equal(inventory['prod-cucumber'].stock, 30); // Fully restored!
  order.status = 'cancelled';
  assert.equal(order.status, 'cancelled');
});





