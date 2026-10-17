-- ==============================================================================
-- Migration 015: Update category images with authentic El Wekala / InstaShop artwork
-- ==============================================================================

UPDATE public.categories SET
  image_url = '/categories/new.png',
  icon = '✨'
WHERE slug = 'new';

UPDATE public.categories SET
  image_url = '/categories/offers.png',
  icon = '🏷️'
WHERE slug = 'offers';

UPDATE public.categories SET
  image_url = '/categories/back-to-school.png',
  icon = '🎒'
WHERE slug IN ('back-2-school', 'back-to-school');

UPDATE public.categories SET
  image_url = '/categories/dairy-eggs.png',
  icon = '🥛'
WHERE slug = 'dairy-eggs';

UPDATE public.categories SET
  image_url = '/categories/fruits-vegetables.png',
  icon = '🍎'
WHERE slug = 'fruits-vegetables';

UPDATE public.categories SET
  image_url = '/categories/bakery.png',
  icon = '🍞'
WHERE slug = 'bakery';

UPDATE public.categories SET
  image_url = '/categories/nuts-seeds.png',
  icon = '🥜'
WHERE slug = 'nuts-seeds';

UPDATE public.categories SET
  image_url = '/categories/stationery.png',
  icon = '✏️'
WHERE slug = 'stationery';

UPDATE public.categories SET
  image_url = '/categories/chips-snacks.png',
  icon = '🥔'
WHERE slug = 'chips-snacks';

UPDATE public.categories SET
  image_url = '/categories/grab-and-go.png',
  icon = '🥪'
WHERE slug IN ('grab-go', 'grab-and-go');

UPDATE public.categories SET
  image_url = '/categories/chocolates-candies.png',
  icon = '🍫'
WHERE slug = 'chocolates-candies';

UPDATE public.categories SET
  image_url = '/categories/soft-drinks-juices.png',
  icon = '🥤'
WHERE slug = 'soft-drinks-juices';

UPDATE public.categories SET
  image_url = '/categories/water.png',
  icon = '💧'
WHERE slug = 'water';

UPDATE public.categories SET
  image_url = '/categories/coffee-tea.png',
  icon = '☕'
WHERE slug = 'coffee-tea';

UPDATE public.categories SET
  image_url = '/categories/ice-creams.png',
  icon = '🍦'
WHERE slug = 'ice-creams';

UPDATE public.categories SET
  image_url = '/categories/household-care.png',
  icon = '🧹'
WHERE slug = 'household-care';

UPDATE public.categories SET
  image_url = '/categories/hygiene-personal-care.png',
  icon = '🧼'
WHERE slug = 'hygiene-personal-care';

UPDATE public.categories SET
  image_url = '/categories/body-care.png',
  icon = '🧴'
WHERE slug = 'body-care';

UPDATE public.categories SET
  image_url = '/categories/facial-care.png',
  icon = '💆'
WHERE slug = 'facial-care';

UPDATE public.categories SET
  image_url = '/categories/shampoos-hair-care.png',
  icon = '💇'
WHERE slug IN ('shampoos-hair-care', 'shampoos-haircare');

UPDATE public.categories SET
  image_url = '/categories/baby-care.png',
  icon = '👶'
WHERE slug = 'baby-care';

UPDATE public.categories SET
  image_url = '/categories/home-baking.png',
  icon = '🧁'
WHERE slug = 'home-baking';

UPDATE public.categories SET
  image_url = '/categories/cereals-packets.png',
  icon = '🥣'
WHERE slug = 'cereals-packets';

UPDATE public.categories SET
  image_url = '/categories/meat-fish.png',
  icon = '🥩'
WHERE slug = 'meat-fish';

UPDATE public.categories SET
  image_url = '/categories/cans-jars.png',
  icon = '🥫'
WHERE slug = 'cans-jars';

UPDATE public.categories SET
  image_url = '/categories/pasta-rice.png',
  icon = '🍝'
WHERE slug IN ('pasta-rice-more', 'pasta-rice');

UPDATE public.categories SET
  image_url = '/categories/around-the-world.png',
  icon = '🌮'
WHERE slug = 'around-the-world';

UPDATE public.categories SET
  image_url = '/categories/healthy-organic.png',
  icon = '🥗'
WHERE slug = 'healthy-organic';

UPDATE public.categories SET
  image_url = '/categories/herbs-spices.png',
  icon = '🧂'
WHERE slug = 'herbs-spices';

UPDATE public.categories SET
  image_url = '/categories/frozen.png',
  icon = '🧊'
WHERE slug = 'frozen';

UPDATE public.categories SET
  image_url = '/categories/cosmetics.png',
  icon = '💄'
WHERE slug = 'cosmetics';

UPDATE public.categories SET
  image_url = '/categories/general-health.png',
  icon = '🩹'
WHERE slug = 'general-health';

UPDATE public.categories SET
  image_url = '/categories/more.png',
  icon = '🎉'
WHERE slug = 'more';

UPDATE public.categories SET
  image_url = '/categories/electronics.png',
  icon = '🎧'
WHERE slug = 'electronics';

UPDATE public.categories SET
  image_url = '/categories/kitchen-pantry.png',
  icon = '🍳'
WHERE slug = 'kitchen-pantry';

UPDATE public.categories SET
  image_url = '/categories/camping-bbq.png',
  icon = '🔥'
WHERE slug IN ('camping-bbq-essentials', 'camping-bbq');
