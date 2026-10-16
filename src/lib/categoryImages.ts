/**
 * Al Quds Market - High Quality Department & Category Images
 * Curated authentic retail supermarket photography for all store departments.
 */

export interface CategoryVisualMeta {
  imageUrl: string;
  icon: string;
  nameAr?: string;
  nameEn?: string;
}

export const CATEGORY_IMAGE_MAP: Record<string, CategoryVisualMeta> = {
  offers: {
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    icon: '🏷️',
    nameAr: 'عروض وتخفيضات',
    nameEn: 'Offers',
  },
  'back-2-school': {
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    icon: '🎒',
    nameAr: 'العودة للمدارس',
    nameEn: 'Back 2 School',
  },
  'back-to-school': {
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    icon: '🎒',
    nameAr: 'العودة للمدارس',
    nameEn: 'Back 2 School',
  },
  'dairy-eggs': {
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    icon: '🥛',
    nameAr: 'ألبان وبيض',
    nameEn: 'Dairy & Eggs',
  },
  'fruits-vegetables': {
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    icon: '🍎',
    nameAr: 'خضار وفواكه طازجة',
    nameEn: 'Fruits & Vegetables',
  },
  bakery: {
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    icon: '🍞',
    nameAr: 'مخبوزات طازجة',
    nameEn: 'Bakery',
  },
  'nuts-seeds': {
    imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    icon: '🥜',
    nameAr: 'مكسرات وبذور',
    nameEn: 'Nuts & Seeds',
  },
  stationery: {
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    icon: '✏️',
    nameAr: 'أدوات مكتبية ومدرسية',
    nameEn: 'Stationery',
  },
  'chips-snacks': {
    imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    icon: '🥔',
    nameAr: 'شيبسي ومقرمشات',
    nameEn: 'Chips & Snacks',
  },
  'grab-go': {
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    icon: '🥪',
    nameAr: 'وجبات سريعة وساندوتشات',
    nameEn: 'Grab & Go',
  },
  'grab-and-go': {
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    icon: '🥪',
    nameAr: 'وجبات سريعة وساندوتشات',
    nameEn: 'Grab & Go',
  },
  'chocolates-candies': {
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    icon: '🍫',
    nameAr: 'شوكولاتة وحلويات',
    nameEn: 'Chocolates & Candies',
  },
  'soft-drinks-juices': {
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    icon: '🥤',
    nameAr: 'مشروبات غازية وعصائر',
    nameEn: 'Soft Drinks & Juices',
  },
  water: {
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    icon: '💧',
    nameAr: 'مياه معدنية',
    nameEn: 'Water',
  },
  'coffee-tea': {
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    icon: '☕',
    nameAr: 'شاي وقهوة',
    nameEn: 'Coffee & Tea',
  },
  'ice-creams': {
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    icon: '🍦',
    nameAr: 'آيس كريم ومثلجات',
    nameEn: 'Ice Creams',
  },
  'household-care': {
    imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    icon: '🧹',
    nameAr: 'منظفات وعناية منزلية',
    nameEn: 'Household Care',
  },
  'hygiene-personal-care': {
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    icon: '🧼',
    nameAr: 'نظافة وعناية شخصية',
    nameEn: 'Hygiene & Personal Care',
  },
  'body-care': {
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    icon: '🧴',
    nameAr: 'عناية بالجسم',
    nameEn: 'Body Care',
  },
  'facial-care': {
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    icon: '💆',
    nameAr: 'عناية بالبشرة والوجه',
    nameEn: 'Facial Care',
  },
  'shampoos-hair-care': {
    imageUrl: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    icon: '💇',
    nameAr: 'شامبو وعناية بالشعر',
    nameEn: 'Shampoos & Hair Care',
  },
  'baby-care': {
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    icon: '👶',
    nameAr: 'عناية بالأطفال',
    nameEn: 'Baby Care',
  },
  'home-baking': {
    imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    icon: '🧁',
    nameAr: 'مستلزمات الخبز والحلويات',
    nameEn: 'Home Baking',
  },
  'cereals-packets': {
    imageUrl: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
    icon: '🥣',
    nameAr: 'حبوب إفطار وشوفان',
    nameEn: 'Cereals & Packets',
  },
  'meat-fish': {
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80',
    icon: '🥩',
    nameAr: 'لحوم ودواجن وأسماك',
    nameEn: 'Meat & Fish',
  },
  'cans-jars': {
    imageUrl: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=600&q=80',
    icon: '🥫',
    nameAr: 'معلبات وبرطمانات',
    nameEn: 'Cans & Jars',
  },
  'pasta-rice-more': {
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    icon: '🍝',
    nameAr: 'مكرونة وأرز وحبوب',
    nameEn: 'Pasta, Rice & More',
  },
  'pasta-rice': {
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    icon: '🍝',
    nameAr: 'مكرونة وأرز وحبوب',
    nameEn: 'Pasta, Rice & More',
  },
  'around-the-world': {
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    icon: '🌮',
    nameAr: 'منتجات عالمية ومستوردة',
    nameEn: 'Around the World',
  },
  'healthy-organic': {
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
    icon: '🥗',
    nameAr: 'منتجات صحية وعضوية',
    nameEn: 'Healthy & Organic',
  },
  'herbs-spices': {
    imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=600&q=80',
    icon: '🧂',
    nameAr: 'أعشاب وتوابل',
    nameEn: 'Herbs & Spices',
  },
  frozen: {
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    icon: '🧊',
    nameAr: 'مجمدات',
    nameEn: 'Frozen',
  },
  cosmetics: {
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    icon: '💄',
    nameAr: 'مستحضرات تجميل ومكياج',
    nameEn: 'Cosmetics',
  },
  'general-health': {
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    icon: '🩹',
    nameAr: 'صحة عامة وفيتامينات',
    nameEn: 'General Health',
  },
  more: {
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    icon: '🎉',
    nameAr: 'أخرى ومستلزمات احتفالات',
    nameEn: 'More',
  },
  electronics: {
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    icon: '🎧',
    nameAr: 'إلكترونيات واكسسوارات',
    nameEn: 'Electronics',
  },
  'kitchen-pantry': {
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    icon: '🍳',
    nameAr: 'أدوات المطبخ والمنزل',
    nameEn: 'Kitchen & Pantry',
  },
  'camping-bbq-essentials': {
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    icon: '🔥',
    nameAr: 'مستلزمات الرحلات والشواء',
    nameEn: 'Camping & BBQ Essentials',
  },
  'camping-bbq': {
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    icon: '🔥',
    nameAr: 'مستلزمات الرحلات والشواء',
    nameEn: 'Camping & BBQ Essentials',
  },
  new: {
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    icon: '✨',
    nameAr: 'جديد',
    nameEn: 'New',
  },
};

const DEFAULT_CATEGORY_IMAGE =
  'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80';

export function getCategoryFallback(slug?: string | null): CategoryVisualMeta {
  if (!slug) {
    return {
      imageUrl: DEFAULT_CATEGORY_IMAGE,
      icon: '🛒',
    };
  }

  const normalized = slug.trim().toLowerCase();
  if (CATEGORY_IMAGE_MAP[normalized]) {
    return CATEGORY_IMAGE_MAP[normalized];
  }

  // Partial match by slug key
  for (const [key, val] of Object.entries(CATEGORY_IMAGE_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }

  return {
    imageUrl: DEFAULT_CATEGORY_IMAGE,
    icon: '🛒',
  };
}
