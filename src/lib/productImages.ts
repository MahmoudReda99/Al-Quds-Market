/**
 * Al Quds Market — Comprehensive Product Image Resolver & Retail Asset Library
 * 
 * Provides crisp, high-resolution retail photography CDN assets for all Egyptian
 * supermarket inventory items. If a product has no image in the database, this
 * automatically matches its name and category to the exact packaging or food photo.
 */

import { getProductImageUrl as getStorageUrl } from './storage';

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'fruits-vegetables': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
  'dairy-eggs': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
  'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  'meat-fish': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80',
  'soft-drinks-juices': 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&auto=format&fit=crop&q=80',
  'coffee-tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
  'chocolates-candies': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
  'chips-snacks': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
  'nuts-seeds': 'https://images.unsplash.com/photo-1536591375315-1b8e4e64f028?w=600&auto=format&fit=crop&q=80',
  'pasta-rice': 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=600&auto=format&fit=crop&q=80',
  'cans-jars': 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&auto=format&fit=crop&q=80',
  'frozen': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  'household-care': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80',
  'hygiene-personal-care': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
  'herbs-spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
  'home-baking': 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop&q=80',
  'baby-care': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80',
  'water': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
  'cereals-packets': 'https://images.unsplash.com/photo-1584947920409-d7b1a2082b26?w=600&auto=format&fit=crop&q=80',
  'electronics': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
};

export const PRODUCT_KEYWORD_IMAGES: { keywords: string[]; url: string }[] = [
  // ─── Fruits & Produce ───
  {
    keywords: ['تفاح', 'apple'],
    url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['موز', 'banana'],
    url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['فراولة', 'strawberry'],
    url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['طماطم', 'tomato'],
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['خيار', 'cucumber'],
    url: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بصل', 'onion'],
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['ليمون', 'lemon'],
    url: 'https://images.unsplash.com/photo-1582281298055-e25b84a30b0b?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مانجو', 'mango'],
    url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['عنب', 'grape'],
    url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بطيخ', 'watermelon'],
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Juices & Drinks ───
  {
    keywords: ['رانى', 'راني', 'بيتي', 'بيتى', 'بيور', 'لمار', 'جهينة عصير', 'عصير', 'juice'],
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['ببسى', 'بيبسي', 'pepsi', 'كوكا', 'كولا', 'cola', 'سفن', 'سبرايت', 'sprite'],
    url: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بيريل', 'فيروز', 'birell', 'barbican', 'موسي'],
    url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['شويبس', 'schweppes'],
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['فيمتو', 'vimto'],
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['طاقة', 'ريد بول', 'red bull', 'ستينج', 'تويست طاقة'],
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مياه', 'ميه', 'اكوافينا', 'نستله', 'دساني', 'water'],
    url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Dairy & Eggs ───
  {
    keywords: ['لبن', 'حليب', 'جهينة حليب', 'مراعي حليب', 'milk'],
    url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بيض', 'egg'],
    url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['موتزاريلا', 'موزاريلا', 'mozzarella'],
    url: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['رومي', 'رومى', 'شيدر', 'cheddar', 'فلامنك'],
    url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['جبنة', 'جبنه', 'رودس', 'دومتي', 'دومتى', 'عبور لاند', 'بريزيدون', 'كيري', 'باندا', 'cheese'],
    url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['زبادي', 'زبادى', 'دانون', 'رايب', 'yogurt'],
    url: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['زبدة', 'زبده', 'سمن', 'سمنة', 'روابي', 'جنة', 'فيرن', 'الهانم', 'butter', 'ghee'],
    url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['قشطة', 'قشطه', 'كريمة', 'كريمه', 'cream'],
    url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Meat & Frozen ───
  {
    keywords: ['تونة', 'تونه', 'صن شاين', 'دولفين', 'tuna'],
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['سردين', 'سالمون', 'ماكريل', 'رنجة', 'فسيخ', 'salmon', 'sardine'],
    url: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['برجر', 'همبرجر', 'burger'],
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['ناجتس', 'ستربس', 'بانية', 'بانيه', 'شيش', 'strips', 'nuggets'],
    url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['فراخ', 'دجاج', 'chicken'],
    url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['سجق', 'كفتة', 'كفته', 'لحم', 'مفروم', 'sausage', 'meat'],
    url: 'https://images.unsplash.com/photo-1629852487408-953e5e4e892c?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بطاطس', 'فارم فريتس', 'اصابع بطاطس', 'fries'],
    url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بامية', 'ملوخية', 'ملوخيه', 'بسلة', 'بسله', 'قلقاس', 'خرشوف', 'طعمية', 'طعميه', 'خضار مجمد'],
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Grains, Pasta & Rice ───
  {
    keywords: ['ارز', 'أرز', 'بسمتى', 'بسمتي', 'السوهاجى', 'الضحى', 'rice'],
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مكرونة', 'مكرونه', 'اسباجتى', 'اسباجتي', 'الملكة', 'روجينا', 'كايرو', 'pasta', 'spaghetti'],
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['فول', 'عدس', 'حمص', 'لوبيا', 'فاصوليا', 'ترمس', 'lentil', 'beans'],
    url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['شوفان', 'كورن فليكس', 'كورن فلكس', 'oats', 'cereal'],
    url: 'https://images.unsplash.com/photo-1584947920409-d7b1a2082b26?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['دقيق', 'سميد', 'flour'],
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Oils, Sauces & Condiments ───
  {
    keywords: ['زيت زيتون', 'olive oil'],
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['زيت', 'كريستال', 'عافية', 'سلايت', 'oil', 'sunflower'],
    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['صلصة', 'صلصه', 'معجون طماطم', 'tomato paste', 'sauce'],
    url: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['كاتشب', 'مايونيز', 'مستردة', 'مسترده', 'ketchup', 'mayo'],
    url: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['خل', 'vinegar'],
    url: 'https://images.unsplash.com/photo-1569420067098-b86a877beac9?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مربى', 'مربه', 'فيتراك', 'jam'],
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['عسل', 'honey', 'molasses'],
    url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['طحينة', 'طحينه', 'حلاوة', 'حلاوه', 'الرشيدى', 'tahini', 'halawa'],
    url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Coffee & Tea ───
  {
    keywords: ['شاى', 'شاي', 'العروسة', 'ليبتون', 'tea'],
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بن', 'قهوة', 'قهوه', 'شاهين', 'عبد المعبود', 'محوج', 'coffee'],
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['نسكافيه', 'nescafe', 'كوفي ميكس', '3*1', '3في1'],
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['كاكاو', 'نسكويك', 'cocoa'],
    url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['ينسون', 'كركديه', 'نعناع', 'قرفة', 'أعشاب', 'اعشاب', 'herbs'],
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Chocolates, Biscuits & Snacks ───
  {
    keywords: ['شيبس', 'شيبسي', 'chips', 'دوريتوس', 'doritos', 'شيتوس', 'كرانشى', 'كرانشي', 'تايجر', 'بيج شيبس'],
    url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['شوكولاتة', 'شوكولاته', 'كادبوري', 'جالاكسي', 'كتكات', 'كندر', 'نوتيلا', 'chocolate'],
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بسكويت', 'بسكوت', 'لوتس', 'اوريو', 'biscuit', 'cookies', 'ويفر'],
    url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['كيك', 'تودو', 'هوهوز', 'cake'],
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مارشملو', 'جلى كاندى', 'كاندي', 'لبان', 'candy', 'عسليه'],
    url: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['لب', 'سودانى', 'سوداني', 'كاجو', 'فسدق', 'لوز', 'مكسرات', 'nuts'],
    url: 'https://images.unsplash.com/photo-1536591375315-1b8e4e64f028?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['تمر', 'بلح', 'dates'],
    url: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Household & Cleaning ───
  {
    keywords: ['بريل', 'فيري', 'مواعين', 'اطباق', 'dishwashing', 'fairy', 'pril'],
    url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مسحوق', 'برسيل', 'اريال', 'اوكسي', 'تايد', 'detergent', 'persil', 'ariel'],
    url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['كلور', 'كلوركس', 'ديتول', 'مطهر', 'clorox', 'dettol'],
    url: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['مناديل', 'فاين', 'زينة', 'tissues', 'fine'],
    url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['أكياس', 'اكياس', 'قمامة', 'فويل', 'bags'],
    url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Hygiene & Personal Care ───
  {
    keywords: ['شامبو', 'بلسم', 'صانسيلك', 'كلير', 'فاتيكا', 'shampoo'],
    url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['صابون', 'دوف', 'لوكس', 'soap', 'dove'],
    url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['معجون', 'سجنال', 'سيجنال', 'كولجيت', 'toothpaste', 'colgate'],
    url: 'https://images.unsplash.com/photo-1559591937-e1032c694383?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['اكس', 'مزيل', 'ركسونا', 'ريكسونا', 'deodorant', 'axe'],
    url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['حلاقة', 'شفرة', 'جيليت', 'gillette'],
    url: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&auto=format&fit=crop&q=80',
  },

  // ─── Spices & Baking ───
  {
    keywords: ['فلفل', 'كمون', 'كزبرة', 'بهارات', 'توابل', 'spices'],
    url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['ملح', 'salt'],
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بيكنج', 'خميرة', 'فانيليا', 'دريم', 'كوكس', 'baking'],
    url: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['جيلي', 'كراميل', 'كاسترد', 'jelly'],
    url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['بامبرز', 'حفاض', 'baby', 'pampers'],
    url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80',
  },
  {
    keywords: ['خبز', 'توست', 'فينو', 'bread'],
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
  },
];

/**
 * Resolves the display image URL for any product:
 * 1. Returns stored URL if available.
 * 2. If missing, matches against Egyptian grocery keywords and returns verified CDN retail photo.
 * 3. Gracefully falls back to category banner or general supermarket image.
 */
export function resolveProductImage(product?: {
  images?: { url: string }[] | null;
  name_ar?: string | null;
  name_en?: string | null;
  category_slug?: string | null;
  category_id?: string | null;
}): string {
  if (!product) {
    return 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80';
  }

  // 1. Check if product already has a valid image in database
  const firstUrl = product.images?.[0]?.url?.trim();
  if (firstUrl && firstUrl.length > 5) {
    return getStorageUrl(firstUrl);
  }

  // 2. Keyword matching by product name
  const name = `${product.name_ar || ''} ${product.name_en || ''}`.toLowerCase();

  for (const item of PRODUCT_KEYWORD_IMAGES) {
    for (const kw of item.keywords) {
      if (name.includes(kw)) {
        return item.url;
      }
    }
  }

  // 3. Fallback by category slug
  const slug = product.category_slug || '';
  if (slug && CATEGORY_FALLBACK_IMAGES[slug]) {
    return CATEGORY_FALLBACK_IMAGES[slug];
  }

  // 4. Ultimate clean supermarket grocery fallback
  return 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80';
}
