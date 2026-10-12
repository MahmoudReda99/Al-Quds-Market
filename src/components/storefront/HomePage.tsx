import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ArrowLeft,
  Truck,
  Leaf,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { cn, localizedText } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { useCategoriesQuery, useProductsQuery } from '@/features/catalog/hooks';
import ProductCard from '@/features/catalog/ProductCard';

export default function HomePage() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Live queries
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategoriesQuery();
  const { data: featuredData, isLoading: isProductsLoading } = useProductsQuery({
    isFeatured: true,
    limit: 8,
  });

  const featuredProducts = featuredData?.products || [];

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

          {isCategoriesLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl border border-surface-border bg-surface-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {categories.map((cat) => {
                const name = localizedText(cat.name_ar, cat.name_en, lang);
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-surface-border bg-white p-2.5 sm:p-3 text-center card-hover hover:border-brand-200 transition-all"
                  >
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-surface-muted overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
                      {cat.image_url ? (
                        <img
                          src={cat.image_url}
                          alt={name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl sm:text-4xl" aria-hidden="true">
                          {cat.icon || '🛒'}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-foreground sm:text-xs leading-tight line-clamp-2">
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-muted py-10 sm:py-14" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="featured-heading"
            title={t('home.featuredProducts')}
            subtitle={t('home.featuredSubtitle')}
            linkTo="/categories"
            linkLabel={t('common.seeAll')}
            ArrowIcon={ArrowIcon}
          />

          {isProductsLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-2xl border border-surface-border bg-white animate-pulse"
                />
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-surface-border bg-white p-8 text-center text-foreground-muted">
              لا توجد منتجات مميزة حالياً
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Us / Features */}
      <section className="py-10 sm:py-16" aria-labelledby="why-us-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="why-us-heading" className="section-heading text-center">
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
          <div className="flex-1">
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

          <div className="relative hidden flex-shrink-0 lg:block" aria-hidden="true">
            <div className="grid grid-cols-3 gap-3">
              {['🥦', '🍎', '🥛', '🍞', '🥩', '🫒', '🍌', '🍅', '🥚'].map((emoji, i) => (
                <div
                  key={i}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm transition-transform hover:scale-105"
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
