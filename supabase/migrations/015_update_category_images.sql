-- ==============================================================================
-- Migration 015: Update category images with verified high-resolution photography
-- ==============================================================================

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
  icon = '🏷️'
WHERE slug = 'offers';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
  icon = '🎒'
WHERE slug IN ('back-2-school', 'back-to-school');

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
  icon = '🥛'
WHERE slug = 'dairy-eggs';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
  icon = '🍎'
WHERE slug = 'fruits-vegetables';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  icon = '🍞'
WHERE slug = 'bakery';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
  icon = '🥜'
WHERE slug = 'nuts-seeds';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
  icon = '✏️'
WHERE slug = 'stationery';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
  icon = '🥔'
WHERE slug = 'chips-snacks';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  icon = '🥪'
WHERE slug IN ('grab-go', 'grab-and-go');

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
  icon = '🍫'
WHERE slug = 'chocolates-candies';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
  icon = '🥤'
WHERE slug = 'soft-drinks-juices';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
  icon = '💧'
WHERE slug = 'water';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  icon = '☕'
WHERE slug = 'coffee-tea';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
  icon = '🍦'
WHERE slug = 'ice-creams';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
  icon = '🧹'
WHERE slug = 'household-care';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  icon = '🧼'
WHERE slug = 'hygiene-personal-care';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  icon = '🧴'
WHERE slug = 'body-care';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  icon = '💆'
WHERE slug = 'facial-care';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
  icon = '💇'
WHERE slug IN ('shampoos-hair-care', 'shampoos-haircare');

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
  icon = '👶'
WHERE slug = 'baby-care';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
  icon = '🧁'
WHERE slug = 'home-baking';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
  icon = '🥣'
WHERE slug = 'cereals-packets';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
  icon = '🥩'
WHERE slug = 'meat-fish';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
  icon = '🥫'
WHERE slug = 'cans-jars';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
  icon = '🍝'
WHERE slug IN ('pasta-rice-more', 'pasta-rice');

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  icon = '🌮'
WHERE slug = 'around-the-world';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
  icon = '🥗'
WHERE slug = 'healthy-organic';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80',
  icon = '🧂'
WHERE slug = 'herbs-spices';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
  icon = '🧊'
WHERE slug = 'frozen';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
  icon = '💄'
WHERE slug = 'cosmetics';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
  icon = '🩹'
WHERE slug = 'general-health';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
  icon = '🎉'
WHERE slug = 'more';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  icon = '🎧'
WHERE slug = 'electronics';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  icon = '🍳'
WHERE slug = 'kitchen-pantry';

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  icon = '🔥'
WHERE slug IN ('camping-bbq-essentials', 'camping-bbq');

UPDATE public.categories SET
  image_url = 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
  icon = '✨'
WHERE slug = 'new';
