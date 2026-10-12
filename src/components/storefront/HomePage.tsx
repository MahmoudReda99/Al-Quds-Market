import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ArrowLeft,
  Truck,
  Leaf,
  Tag,
  ShieldCheck,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

/* ─── Mock categories for Phase 1 visual ───── */
const MOCK_CATEGORIES = [
  { id: '1', slug: 'fresh-produce', icon: '🥦', nameAr: 'خضر وفواكه', nameEn: 'Fresh Produce', color: 'bg-green-50 border-green-100' },
  { id: '2', slug: 'dairy-eggs', icon: '🥛', nameAr: 'ألبان وبيض', nameEn: 'Dairy & Eggs', color: 'bg-yellow-50 border-yellow-100' },
  { id: '3', slug: 'bakery', icon: '🍞', nameAr: 'مخبوزات', nameEn: 'Bakery', color: 'bg-amber-50 border-amber-100' },
  { id: '4', slug: 'meat', icon: '🥩', nameAr: 'لحوم ودواجن', nameEn: 'Meat & Poultry', color: 'bg-red-50 border-red-100' },
  { id: '5', slug: 'beverages', icon: '🧃', nameAr: 'مشروبات', nameEn: 'Beverages', color: 'bg-blue-50 border-blue-100' },
  { id: '6', slug: 'snacks', icon: '🍫', nameAr: 'وجبات خفيفة', nameEn: 'Snacks', color: 'bg-purple-50 border-purple-100' },
  { id: '7', slug: 'household', icon: '🧹', nameAr: 'منزلية وتنظيف', nameEn: 'Household', color: 'bg-cyan-50 border-cyan-100' },
  { id: '8', slug: 'personal-care', icon: '🧴', nameAr: 'عناية شخصية', nameEn: 'Personal Care', color: 'bg-pink-50 border-pink-100' },
];

/* ─── Mock featured products for Phase 1 ─── */
const MOCK_PRODUCTS = [
  { id: '1', nameAr: 'تفاح أحمر طازج', nameEn: 'Fresh Red Apples', price: 12.5, compareAt: 15, unit: 'كغ', emoji: '🍎', rating: 4.8, reviews: 124 },
  { id: '2', nameAr: 'موز أكوادور', nameEn: 'Ecuador Bananas', price: 8.0, compareAt: null, unit: 'كغ', emoji: '🍌', rating: 4.6, reviews: 89 },
  { id: '3', nameAr: 'طماطم طازجة', nameEn: 'Fresh Tomatoes', price: 6.5, compareAt: 8, unit: 'كغ', emoji: '🍅', rating: 4.9, reviews: 203 },
  { id: '4', nameAr: 'حليب كامل الدسم', nameEn: 'Full Fat Milk', price: 9.0, compareAt: null, unit: 'لتر', emoji: '🥛', rating: 4.7, reviews: 156 },
  { id: '5', nameAr: 'خبز عربي', nameEn: 'Arabic Bread', price: 4.5, compareAt: null, unit: 'ربطة', emoji: '🫓', rating: 4.5, reviews: 78 },
  { id: '6', nameAr: 'زيت زيتون بكر', nameEn: 'Extra Virgin Olive Oil', price: 35.0, compareAt: 42, unit: 'لتر', emoji: '🫒', rating: 4.9, reviews: 312 },
  { id: '7', nameAr: 'بيض مزارع', nameEn: 'Farm Eggs', price: 18.0, compareAt: null, unit: 'كرتونة', emoji: '🥚', rating: 4.8, reviews: 445 },
  { id: '8', nameAr: 'جبنة بيضاء', nameEn: 'White Cheese', price: 22.0, compareAt: 27, unit: '500g', emoji: '🧀', rating: 4.6, reviews: 98 },
];

export default function HomePage() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <HeroSection t={t} ArrowIcon={ArrowIcon} />

      {/* Categories */}
      <section className="py-10 sm:py-14" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="categories-heading"
            title={t('home.shopByCategory')}
            subtitle={t('home.categorySubtitle')}
            linkTo="/categories"
            linkLabel={t('common.seeAll')}
            ArrowIcon={ArrowIcon}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {MOCK_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-muted py-10 sm:py-14" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="featured-heading"
            title={t('home.featuredProducts')}
            subtitle={t('home.featuredSubtitle')}
            linkTo="/offers"
            linkLabel={t('common.seeAll')}
            ArrowIcon={ArrowIcon}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / Features */}
      <section className="py-10 sm:py-16" aria-labelledby="why-us-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="why-us-heading"
            className="section-heading text-center"
          >
            {t('home.whyUs')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Truck, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc', color: 'text-blue-600', bg: 'bg-blue-50' },
              { Icon: Leaf, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc', color: 'text-green-600', bg: 'bg-green-50' },
              { Icon: Tag, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc', color: 'text-amber-600', bg: 'bg-amber-50' },
              { Icon: ShieldCheck, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc', color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map(({ Icon, titleKey, descKey, color, bg }) => (
              <div
                key={titleKey}
                className="flex flex-col items-center rounded-2xl border border-surface-border bg-white p-6 text-center shadow-card"
              >
                <div className={cn('mb-4 flex h-14 w-14 items-center justify-center rounded-2xl', bg)}>
                  <Icon size={28} className={color} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{t(titleKey)}</h3>
                <p className="mt-1.5 text-sm text-foreground-muted">{t(descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────── */
function HeroSection({
  t,
  ArrowIcon,
}: {
  t: (key: string) => string;
  ArrowIcon: React.ElementType;
}) {
  return (
    <section
      className="relative overflow-hidden bg-brand-gradient"
      aria-label={t('home.heroTitle')}
    >
      {/* Decorative circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-white/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-10 bottom-0 h-48 w-48 rounded-full bg-white/5"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          {/* Text */}
          <div className="flex-1">
            {/* Pill badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" aria-hidden="true" />
              {t('common.tagline')}
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {t('home.heroTitle')}
              <br />
              <span className="text-accent-300">{t('home.heroSubtitle')}</span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-white/80 sm:text-lg">
              {t('home.heroDescription')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/categories" className="btn-primary bg-white text-brand-800 hover:bg-brand-50 px-6 py-3">
                {t('home.shopNow')}
                <ArrowIcon size={18} aria-hidden="true" />
              </Link>
              <Link to="/categories" className="btn-outline border-white/60 text-white hover:bg-white/10 px-6 py-3">
                {t('home.shopCategories')}
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8">
              {[
                { value: '500+', labelAr: 'منتج', labelEn: 'Products' },
                { value: '1hr', labelAr: 'توصيل', labelEn: 'Delivery' },
                { value: '100%', labelAr: 'طازج', labelEn: 'Fresh' },
              ].map(({ value, labelAr, labelEn }) => (
                <div key={value}>
                  <p className="text-2xl font-black text-white">{value}</p>
                  <p className="text-sm text-white/70">
                    {i18n.language === 'ar' ? labelAr : labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — emoji grid placeholder (replaced by image in later phase) */}
          <div
            className="relative hidden flex-shrink-0 lg:block"
            aria-hidden="true"
          >
            <div className="grid grid-cols-3 gap-3">
              {['🥦', '🍎', '🥛', '🍞', '🥩', '🫒', '🍌', '🍅', '🥚'].map((emoji, i) => (
                <div
                  key={i}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm transition-transform hover:scale-105"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Section Header ────────────────────────── */
function SectionHeader({
  id,
  title,
  subtitle,
  linkTo,
  linkLabel,
  ArrowIcon,
}: {
  id: string;
  title: string;
  subtitle: string;
  linkTo: string;
  linkLabel: string;
  ArrowIcon: React.ElementType;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 id={id} className="section-heading">
          {title}
        </h2>
        <p className="section-subheading">{subtitle}</p>
      </div>
      <Link
        to={linkTo}
        className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        {linkLabel}
        <ArrowIcon size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}

/* ─── Category Card ─────────────────────────── */
function CategoryCard({
  category,
  lang,
}: {
  category: (typeof MOCK_CATEGORIES)[number];
  lang: SupportedLanguage;
}) {
  const name = lang === 'ar' ? category.nameAr : category.nameEn;

  return (
    <Link
      to={`/category/${category.slug}`}
      className={cn(
        'flex flex-col items-center gap-2 rounded-2xl border p-3 text-center card-hover',
        category.color
      )}
    >
      <span className="text-3xl sm:text-4xl" aria-hidden="true">
        {category.icon}
      </span>
      <span className="text-xs font-semibold text-foreground sm:text-sm leading-tight">
        {name}
      </span>
    </Link>
  );
}

/* ─── Product Card ──────────────────────────── */
function ProductCard({
  product,
  lang,
  t,
}: {
  product: (typeof MOCK_PRODUCTS)[number];
  lang: SupportedLanguage;
  t: (key: string) => string;
}) {
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const hasDiscount = product.compareAt !== null;
  const discountPct = hasDiscount
    ? Math.round(((product.compareAt! - product.price) / product.compareAt!) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      {/* Image area */}
      <div className="relative flex aspect-square items-center justify-center bg-surface-muted text-6xl sm:text-7xl">
        <span aria-hidden="true">{product.emoji}</span>
        {hasDiscount && (
          <span className="badge-red absolute start-2 top-2 text-[10px]">
            -{discountPct}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Favorites handled in Phase 3
          }}
          className="absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-500"
          aria-label="Add to favorites"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-sm font-medium text-foreground leading-snug">
          {name}
        </p>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <Star size={11} className="fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="text-[11px] text-foreground-muted">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-base font-bold text-foreground">
              ₪{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="ms-1.5 text-xs text-foreground-subtle line-through">
                ₪{product.compareAt!.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Cart integration in Phase 4
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm transition-transform active:scale-95 hover:bg-brand-800"
            aria-label={t('common.addToCart')}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Link>
  );
}
