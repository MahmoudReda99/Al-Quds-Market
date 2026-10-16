import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

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
    }
  }
}

const supabase = createClient(supabaseUrl, supabaseKey);
const { data, error } = await supabase.from('categories').select('*').order('sort_order');
if (error) {
  console.error(error);
} else {
  console.log(`Found ${data.length} categories.`);
  console.log(data.map(c => ({ id: c.id, slug: c.slug, name_ar: c.name_ar, name_en: c.name_en, image_url: c.image_url, icon: c.icon })));
}
