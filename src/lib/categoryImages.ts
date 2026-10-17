/**
 * Al Quds Market - Department & Category Images
 * Authentic El Wekala / InstaShop category images matching the official storefront catalog.
 */

export interface CategoryVisualMeta {
  imageUrl: string;
  icon: string;
  nameAr?: string;
  nameEn?: string;
}

export const CATEGORY_IMAGE_MAP: Record<string, CategoryVisualMeta> = {
  new: {
    imageUrl: '/categories/new.png',
    icon: '✨',
    nameAr: 'جديد',
    nameEn: 'New',
  },
  offers: {
    imageUrl: '/categories/offers.png',
    icon: '🏷️',
    nameAr: 'عروض وتخفيضات',
    nameEn: 'Offers',
  },
  'back-2-school': {
    imageUrl: '/categories/back-to-school.png',
    icon: '🎒',
    nameAr: 'العودة للمدارس',
    nameEn: 'Back 2 School',
  },
  'back-to-school': {
    imageUrl: '/categories/back-to-school.png',
    icon: '🎒',
    nameAr: 'العودة للمدارس',
    nameEn: 'Back 2 School',
  },
  'dairy-eggs': {
    imageUrl: '/categories/dairy-eggs.png',
    icon: '🥛',
    nameAr: 'ألبان وبيض',
    nameEn: 'Dairy & Eggs',
  },
  'fruits-vegetables': {
    imageUrl: '/categories/fruits-vegetables.png',
    icon: '🍎',
    nameAr: 'خضار وفواكه طازجة',
    nameEn: 'Fruits & Vegetables',
  },
  bakery: {
    imageUrl: '/categories/bakery.png',
    icon: '🍞',
    nameAr: 'مخبوزات طازجة',
    nameEn: 'Bakery',
  },
  'nuts-seeds': {
    imageUrl: '/categories/nuts-seeds.png',
    icon: '🥜',
    nameAr: 'مكسرات وبذور',
    nameEn: 'Nuts & Seeds',
  },
  stationery: {
    imageUrl: '/categories/stationery.png',
    icon: '✏️',
    nameAr: 'أدوات مكتبية ومدرسية',
    nameEn: 'Stationery',
  },
  'chips-snacks': {
    imageUrl: '/categories/chips-snacks.png',
    icon: '🥔',
    nameAr: 'شيبسي ومقرمشات',
    nameEn: 'Chips & Snacks',
  },
  'grab-go': {
    imageUrl: '/categories/grab-and-go.png',
    icon: '🥪',
    nameAr: 'وجبات سريعة وساندوتشات',
    nameEn: 'Grab & Go',
  },
  'grab-and-go': {
    imageUrl: '/categories/grab-and-go.png',
    icon: '🥪',
    nameAr: 'وجبات سريعة وساندوتشات',
    nameEn: 'Grab & Go',
  },
  'chocolates-candies': {
    imageUrl: '/categories/chocolates-candies.png',
    icon: '🍫',
    nameAr: 'شوكولاتة وحلويات',
    nameEn: 'Chocolates & Candies',
  },
  'soft-drinks-juices': {
    imageUrl: '/categories/soft-drinks-juices.png',
    icon: '🥤',
    nameAr: 'مشروبات غازية وعصائر',
    nameEn: 'Soft Drinks & Juices',
  },
  water: {
    imageUrl: '/categories/water.png',
    icon: '💧',
    nameAr: 'مياه معدنية',
    nameEn: 'Water',
  },
  'coffee-tea': {
    imageUrl: '/categories/coffee-tea.png',
    icon: '☕',
    nameAr: 'شاي وقهوة',
    nameEn: 'Coffee & Tea',
  },
  'ice-creams': {
    imageUrl: '/categories/ice-creams.png',
    icon: '🍦',
    nameAr: 'آيس كريم ومثلجات',
    nameEn: 'Ice Creams',
  },
  'household-care': {
    imageUrl: '/categories/household-care.png',
    icon: '🧹',
    nameAr: 'منظفات وعناية منزلية',
    nameEn: 'Household Care',
  },
  'hygiene-personal-care': {
    imageUrl: '/categories/hygiene-personal-care.png',
    icon: '🧼',
    nameAr: 'نظافة وعناية شخصية',
    nameEn: 'Hygiene & Personal Care',
  },
  'body-care': {
    imageUrl: '/categories/body-care.png',
    icon: '🧴',
    nameAr: 'عناية بالجسم',
    nameEn: 'Body Care',
  },
  'facial-care': {
    imageUrl: '/categories/facial-care.png',
    icon: '💆',
    nameAr: 'عناية بالبشرة والوجه',
    nameEn: 'Facial Care',
  },
  'shampoos-hair-care': {
    imageUrl: '/categories/shampoos-hair-care.png',
    icon: '💇',
    nameAr: 'شامبو وعناية بالشعر',
    nameEn: 'Shampoos & Hair Care',
  },
  'shampoos-haircare': {
    imageUrl: '/categories/shampoos-hair-care.png',
    icon: '💇',
    nameAr: 'شامبو وعناية بالشعر',
    nameEn: 'Shampoos & Hair Care',
  },
  'baby-care': {
    imageUrl: '/categories/baby-care.png',
    icon: '👶',
    nameAr: 'عناية بالأطفال',
    nameEn: 'Baby Care',
  },
  'home-baking': {
    imageUrl: '/categories/home-baking.png',
    icon: '🧁',
    nameAr: 'مستلزمات الخبز والحلويات',
    nameEn: 'Home Baking',
  },
  'cereals-packets': {
    imageUrl: '/categories/cereals-packets.png',
    icon: '🥣',
    nameAr: 'حبوب إفطار وشوفان',
    nameEn: 'Cereals & Packets',
  },
  'meat-fish': {
    imageUrl: '/categories/meat-fish.png',
    icon: '🥩',
    nameAr: 'لحوم ودواجن وأسماك',
    nameEn: 'Meat & Fish',
  },
  'cans-jars': {
    imageUrl: '/categories/cans-jars.png',
    icon: '🥫',
    nameAr: 'معلبات وبرطمانات',
    nameEn: 'Cans & Jars',
  },
  'pasta-rice-more': {
    imageUrl: '/categories/pasta-rice.png',
    icon: '🍝',
    nameAr: 'مكرونة وأرز وحبوب',
    nameEn: 'Pasta, Rice & More',
  },
  'pasta-rice': {
    imageUrl: '/categories/pasta-rice.png',
    icon: '🍝',
    nameAr: 'مكرونة وأرز وحبوب',
    nameEn: 'Pasta, Rice & More',
  },
  'around-the-world': {
    imageUrl: '/categories/around-the-world.png',
    icon: '🌮',
    nameAr: 'منتجات عالمية ومستوردة',
    nameEn: 'Around the World',
  },
  'healthy-organic': {
    imageUrl: '/categories/healthy-organic.png',
    icon: '🥗',
    nameAr: 'منتجات صحية وعضوية',
    nameEn: 'Healthy & Organic',
  },
  'herbs-spices': {
    imageUrl: '/categories/herbs-spices.png',
    icon: '🧂',
    nameAr: 'أعشاب وتوابل',
    nameEn: 'Herbs & Spices',
  },
  frozen: {
    imageUrl: '/categories/frozen.png',
    icon: '🧊',
    nameAr: 'مجمدات',
    nameEn: 'Frozen',
  },
  cosmetics: {
    imageUrl: '/categories/cosmetics.png',
    icon: '💄',
    nameAr: 'مستحضرات تجميل ومكياج',
    nameEn: 'Cosmetics',
  },
  'general-health': {
    imageUrl: '/categories/general-health.png',
    icon: '🩹',
    nameAr: 'صحة عامة وفيتامينات',
    nameEn: 'General Health',
  },
  more: {
    imageUrl: '/categories/more.png',
    icon: '🎉',
    nameAr: 'أخرى ومستلزمات احتفالات',
    nameEn: 'More',
  },
  electronics: {
    imageUrl: '/categories/electronics.png',
    icon: '🎧',
    nameAr: 'إلكترونيات واكسسوارات',
    nameEn: 'Electronics',
  },
  'kitchen-pantry': {
    imageUrl: '/categories/kitchen-pantry.png',
    icon: '🍳',
    nameAr: 'أدوات المطبخ والمنزل',
    nameEn: 'Kitchen & Pantry',
  },
  'camping-bbq-essentials': {
    imageUrl: '/categories/camping-bbq.png',
    icon: '🔥',
    nameAr: 'مستلزمات الرحلات والشواء',
    nameEn: 'Camping & BBQ Essentials',
  },
  'camping-bbq': {
    imageUrl: '/categories/camping-bbq.png',
    icon: '🔥',
    nameAr: 'مستلزمات الرحلات والشواء',
    nameEn: 'Camping & BBQ Essentials',
  },
};

const DEFAULT_CATEGORY_IMAGE = '/categories/new.png';

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
