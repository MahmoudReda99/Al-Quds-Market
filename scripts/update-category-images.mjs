/**
 * Al Quds Market - Supermarket Category Images & Icons Updater
 * Updates all departments in Supabase with exact El Wekala / InstaShop category images
 * from public/categories/ and matching emojis.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

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

const CATEGORY_MAP = {
  new: {
    imageUrl: '/categories/new.png',
    icon: '✨',
  },
  offers: {
    imageUrl: '/categories/offers.png',
    icon: '🏷️',
  },
  'back-2-school': {
    imageUrl: '/categories/back-to-school.png',
    icon: '🎒',
  },
  'back-to-school': {
    imageUrl: '/categories/back-to-school.png',
    icon: '🎒',
  },
  'dairy-eggs': {
    imageUrl: '/categories/dairy-eggs.png',
    icon: '🥛',
  },
  'fruits-vegetables': {
    imageUrl: '/categories/fruits-vegetables.png',
    icon: '🍎',
  },
  bakery: {
    imageUrl: '/categories/bakery.png',
    icon: '🍞',
  },
  'nuts-seeds': {
    imageUrl: '/categories/nuts-seeds.png',
    icon: '🥜',
  },
  stationery: {
    imageUrl: '/categories/stationery.png',
    icon: '✏️',
  },
  'chips-snacks': {
    imageUrl: '/categories/chips-snacks.png',
    icon: '🥔',
  },
  'grab-go': {
    imageUrl: '/categories/grab-and-go.png',
    icon: '🥪',
  },
  'grab-and-go': {
    imageUrl: '/categories/grab-and-go.png',
    icon: '🥪',
  },
  'chocolates-candies': {
    imageUrl: '/categories/chocolates-candies.png',
    icon: '🍫',
  },
  'soft-drinks-juices': {
    imageUrl: '/categories/soft-drinks-juices.png',
    icon: '🥤',
  },
  water: {
    imageUrl: '/categories/water.png',
    icon: '💧',
  },
  'coffee-tea': {
    imageUrl: '/categories/coffee-tea.png',
    icon: '☕',
  },
  'ice-creams': {
    imageUrl: '/categories/ice-creams.png',
    icon: '🍦',
  },
  'household-care': {
    imageUrl: '/categories/household-care.png',
    icon: '🧹',
  },
  'hygiene-personal-care': {
    imageUrl: '/categories/hygiene-personal-care.png',
    icon: '🧼',
  },
  'body-care': {
    imageUrl: '/categories/body-care.png',
    icon: '🧴',
  },
  'facial-care': {
    imageUrl: '/categories/facial-care.png',
    icon: '💆',
  },
  'shampoos-hair-care': {
    imageUrl: '/categories/shampoos-hair-care.png',
    icon: '💇',
  },
  'shampoos-haircare': {
    imageUrl: '/categories/shampoos-hair-care.png',
    icon: '💇',
  },
  'baby-care': {
    imageUrl: '/categories/baby-care.png',
    icon: '👶',
  },
  'home-baking': {
    imageUrl: '/categories/home-baking.png',
    icon: '🧁',
  },
  'cereals-packets': {
    imageUrl: '/categories/cereals-packets.png',
    icon: '🥣',
  },
  'meat-fish': {
    imageUrl: '/categories/meat-fish.png',
    icon: '🥩',
  },
  'cans-jars': {
    imageUrl: '/categories/cans-jars.png',
    icon: '🥫',
  },
  'pasta-rice-more': {
    imageUrl: '/categories/pasta-rice.png',
    icon: '🍝',
  },
  'pasta-rice': {
    imageUrl: '/categories/pasta-rice.png',
    icon: '🍝',
  },
  'around-the-world': {
    imageUrl: '/categories/around-the-world.png',
    icon: '🌮',
  },
  'healthy-organic': {
    imageUrl: '/categories/healthy-organic.png',
    icon: '🥗',
  },
  'herbs-spices': {
    imageUrl: '/categories/herbs-spices.png',
    icon: '🧂',
  },
  frozen: {
    imageUrl: '/categories/frozen.png',
    icon: '🧊',
  },
  cosmetics: {
    imageUrl: '/categories/cosmetics.png',
    icon: '💄',
  },
  'general-health': {
    imageUrl: '/categories/general-health.png',
    icon: '🩹',
  },
  more: {
    imageUrl: '/categories/more.png',
    icon: '🎉',
  },
  electronics: {
    imageUrl: '/categories/electronics.png',
    icon: '🎧',
  },
  'kitchen-pantry': {
    imageUrl: '/categories/kitchen-pantry.png',
    icon: '🍳',
  },
  'camping-bbq-essentials': {
    imageUrl: '/categories/camping-bbq.png',
    icon: '🔥',
  },
  'camping-bbq': {
    imageUrl: '/categories/camping-bbq.png',
    icon: '🔥',
  },
};

async function main() {
  console.log('Connecting to Supabase at:', supabaseUrl);
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Authenticate as admin if using anon key
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { error: authErr } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (authErr) {
      console.warn('Admin sign-in note:', authErr.message);
    } else {
      console.log('Authenticated as admin:', adminEmail);
    }
  }

  const { data: categories, error: fetchErr } = await supabase
    .from('categories')
    .select('id, slug, name_ar, name_en, image_url, icon');

  if (fetchErr) {
    console.error('Error fetching categories:', fetchErr);
    process.exit(1);
  }

  console.log(`Processing ${categories.length} categories...`);
  let updatedCount = 0;

  for (const cat of categories) {
    const visual = CATEGORY_MAP[cat.slug] || CATEGORY_MAP[cat.slug?.replace(/-/g, '_')] || null;
    if (visual) {
      const { error: updateErr } = await supabase
        .from('categories')
        .update({
          image_url: visual.imageUrl,
          icon: visual.icon,
        })
        .eq('id', cat.id);

      if (updateErr) {
        console.error(`Failed to update category ${cat.slug}:`, updateErr.message);
      } else {
        updatedCount++;
        console.log(`✅ [${updatedCount}/${categories.length}] Updated ${cat.slug} -> ${visual.imageUrl}`);
      }
    } else {
      console.log(`⚠️ No specific mapping for slug: ${cat.slug}`);
    }
  }

  console.log(`\n🎉 Finished! Successfully updated ${updatedCount} categories in Supabase.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
