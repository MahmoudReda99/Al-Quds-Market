/**
 * Al Quds Market - Supermarket Category Images & Icons Updater
 * Updates all departments in Supabase with high-resolution Unsplash retail images
 * and matching emojis.
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
  offers: {
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    icon: '🏷️',
  },
  'back-2-school': {
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    icon: '🎒',
  },
  'back-to-school': {
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    icon: '🎒',
  },
  'dairy-eggs': {
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    icon: '🥛',
  },
  'fruits-vegetables': {
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    icon: '🍎',
  },
  bakery: {
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    icon: '🍞',
  },
  'nuts-seeds': {
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    icon: '🥜',
  },
  stationery: {
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    icon: '✏️',
  },
  'chips-snacks': {
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    icon: '🥔',
  },
  'grab-go': {
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    icon: '🥪',
  },
  'grab-and-go': {
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    icon: '🥪',
  },
  'chocolates-candies': {
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    icon: '🍫',
  },
  'soft-drinks-juices': {
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    icon: '🥤',
  },
  water: {
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    icon: '💧',
  },
  'coffee-tea': {
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    icon: '☕',
  },
  'ice-creams': {
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    icon: '🍦',
  },
  'household-care': {
    imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    icon: '🧹',
  },
  'hygiene-personal-care': {
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    icon: '🧼',
  },
  'body-care': {
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    icon: '🧴',
  },
  'facial-care': {
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    icon: '💆',
  },
  'shampoos-hair-care': {
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    icon: '💇',
  },
  'baby-care': {
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    icon: '👶',
  },
  'home-baking': {
    imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    icon: '🧁',
  },
  'cereals-packets': {
    imageUrl: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
    icon: '🥣',
  },
  'meat-fish': {
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    icon: '🥩',
  },
  'cans-jars': {
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
    icon: '🥫',
  },
  'pasta-rice-more': {
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    icon: '🍝',
  },
  'pasta-rice': {
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    icon: '🍝',
  },
  'around-the-world': {
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    icon: '🌮',
  },
  'healthy-organic': {
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
    icon: '🥗',
  },
  'herbs-spices': {
    imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80',
    icon: '🧂',
  },
  frozen: {
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    icon: '🧊',
  },
  cosmetics: {
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    icon: '💄',
  },
  'general-health': {
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    icon: '🩹',
  },
  more: {
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    icon: '🎉',
  },
  electronics: {
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    icon: '🎧',
  },
  'kitchen-pantry': {
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    icon: '🍳',
  },
  'camping-bbq-essentials': {
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    icon: '🔥',
  },
  new: {
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    icon: '✨',
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
        console.log(`✅ [${updatedCount}/${categories.length}] Updated ${cat.slug} (${cat.name_ar})`);
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
