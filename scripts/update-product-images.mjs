/**
 * Al Quds Market — Batch Product Image Updater
 * 
 * Reads the enriched catalog with verified retail photography CDN URLs,
 * authenticates as the admin or uses service role key, and updates all products
 * in Supabase in batches.
 * 
 * Usage:
 *   node scripts/update-product-images.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');
const csvPath = path.join(rootDir, 'alquds_products_with_images.csv');

// Load environment variables
let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
let adminEmail = process.env.ADMIN_EMAIL || 'eroot@alqudsmarket.com';
let adminPassword = process.env.ADMIN_PASSWORD || 'Qwerty@123';

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

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration. Please check .env.local');
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.error(`❌ Products CSV file not found at: ${csvPath}`);
  process.exit(1);
}

// Simple CSV parser for our formatted file
function parseCsv(content) {
  const lines = content.replace(/^\uFEFF/, '').split('\n').filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Parse header
  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((h, idx) => {
        row[h.trim()] = values[idx];
      });
      rows.push(row);
    }
  }
  return rows;
}

function parseLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur);
  return result;
}

async function run() {
  console.log('🚀 Starting Al Quds Product Image & Icon Updater...');
  console.log(`📡 Connecting to Supabase: ${supabaseUrl}`);

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Authenticate as admin if using anon key
  if (supabaseKey === process.env.VITE_SUPABASE_ANON_KEY) {
    console.log(`🔐 Authenticating as admin (${adminEmail})...`);
    const { error: authErr } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (authErr) {
      console.warn('⚠️ Warning: Admin login failed. Proceeding with anon key:', authErr.message);
    } else {
      console.log('✅ Admin authenticated successfully!');
    }
  }

  // Read CSV
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const items = parseCsv(csvContent);
  console.log(`📦 Loaded ${items.length} products to update with images.`);

  let updated = 0;
  let failed = 0;
  const batchSize = 25;

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    await Promise.all(
      batch.map(async (item) => {
        try {
          const images = JSON.parse(item.images_json);
          const { error } = await supabase
            .from('products')
            .update({ images, updated_at: new Date().toISOString() })
            .eq('sku', item.sku);

          if (error) {
            failed++;
          } else {
            updated++;
          }
        } catch (e) {
          failed++;
        }
      })
    );

    const progress = Math.min(100, Math.round(((i + batch.length) / items.length) * 100));
    process.stdout.write(`\r⏳ Updating products: ${progress}% (${updated} updated, ${failed} failed)`);
  }

  console.log('\n\n🎉 Product image update complete!');
  console.log(`  ✅ Successfully updated: ${updated} products`);
  if (failed > 0) {
    console.log(`  ⚠️ Failed/Skipped: ${failed} products`);
    console.log(`  💡 Tip: You can also run 'supabase/migrations/014_update_product_images.sql' in Supabase SQL Editor for 100% instant update!`);
  }
}

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
