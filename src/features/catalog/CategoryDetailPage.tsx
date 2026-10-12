import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryQuery, useProductsQuery } from './hooks';
import type { ProductSortOption } from './types';
import ProductCard from './ProductCard';
import { localizedText, cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { ArrowLeft, ArrowRight, ArrowUpDown, Loader2 } from 'lucide-react';

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const activeSubcategoryId = searchParams.get('sub') || undefined;
  const [sortBy, setSortBy] = useState<ProductSortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under10' | '10to25' | 'above25'>('all');

  const minPrice = priceRange === '10to25' ? 10 : priceRange === 'above25' ? 25 : undefined;
  const maxPrice = priceRange === 'under10' ? 10 : priceRange === '10to25' ? 25 : undefined;

  // Fetch category and subcategories
  const { data: category, isLoading: isCategoryLoading } = useCategoryQuery(slug);

  // Fetch products under category
  const { data: productsData, isLoading: isProductsLoading } = useProductsQuery({
    categorySlug: slug,
    subcategoryId: activeSubcategoryId,
    inStockOnly,
    minPrice,
    maxPrice,
    sortBy,
  });

  const products = productsData?.products || [];
  const categoryName = category ? localizedText(category.name_ar, category.name_en, lang) : '';

  const handleSubcategoryClick = (subId?: string) => {
    if (subId) {
      setSearchParams({ sub: subId });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setInStockOnly(false);
    setPriceRange('all');
    setSortBy('featured');
  };

  const hasActiveFilters = Boolean(
    activeSubcategoryId || inStockOnly || priceRange !== 'all' || sortBy !== 'featured'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-700 transition-colors">
          {t('common.home')}
        </Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-brand-700 transition-colors">
          {t('common.categories')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-foreground">{categoryName || slug}</span>
      </nav>

      {/* Category Hero / Header */}
      <div className="mb-8 rounded-3xl bg-fresh-gradient p-6 sm:p-8 border border-brand-200/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm text-4xl">
            {category?.icon || '🥦'}
          </div>
          <div>
            <h1 className="text-2xl font-black text-brand-950 sm:text-3xl">
              {categoryName}
            </h1>
            <p className="mt-1 text-sm text-brand-800">
              {productsData?.total ?? 0} {t('common.items')}
            </p>
          </div>
        </div>

        <Link
          to="/categories"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
        >
          <ArrowIcon size={16} />
          <span>{t('nav.allCategories')}</span>
        </Link>
      </div>

      {/* Subcategory Pills */}
      {category?.children && category.children.length > 0 && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => handleSubcategoryClick(undefined)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap shadow-sm',
              !activeSubcategoryId
                ? 'bg-brand-700 text-white shadow-brand-700/20'
                : 'border border-surface-border bg-white text-foreground-muted hover:border-brand-200'
            )}
          >
            {t('common.seeAll')}
          </button>
          {category.children.map((sub) => (
            <button
              key={sub.id}
              onClick={() => handleSubcategoryClick(sub.id)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap shadow-sm',
                activeSubcategoryId === sub.id
                  ? 'bg-brand-700 text-white shadow-brand-700/20'
                  : 'border border-surface-border bg-white text-foreground-muted hover:border-brand-200'
              )}
            >
              {localizedText(sub.name_ar, sub.name_en, lang)}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar: Sort & Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-surface-border bg-surface-muted p-3">
        {/* Left: In-stock toggle & Price range chips */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded border-surface-border text-brand-700 focus:ring-brand-700"
            />
            <span>{t('product.inStock')}</span>
          </label>

          <div className="hidden sm:block h-4 w-px bg-surface-border" />

          {/* Price Range Chips */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setPriceRange('all')}
              className={cn(
                'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                priceRange === 'all'
                  ? 'bg-brand-700 text-white'
                  : 'bg-white text-foreground-muted hover:text-foreground border border-surface-border'
              )}
            >
              {isRtl ? 'كل الأسعار' : 'All Prices'}
            </button>
            <button
              onClick={() => setPriceRange('under10')}
              className={cn(
                'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                priceRange === 'under10'
                  ? 'bg-brand-700 text-white'
                  : 'bg-white text-foreground-muted hover:text-foreground border border-surface-border'
              )}
            >
              &lt; 10 {t('common.currency')}
            </button>
            <button
              onClick={() => setPriceRange('10to25')}
              className={cn(
                'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                priceRange === '10to25'
                  ? 'bg-brand-700 text-white'
                  : 'bg-white text-foreground-muted hover:text-foreground border border-surface-border'
              )}
            >
              10 - 25 {t('common.currency')}
            </button>
            <button
              onClick={() => setPriceRange('above25')}
              className={cn(
                'rounded-lg px-2.5 py-1 font-semibold transition-colors',
                priceRange === 'above25'
                  ? 'bg-brand-700 text-white'
                  : 'bg-white text-foreground-muted hover:text-foreground border border-surface-border'
              )}
            >
              &gt; 25 {t('common.currency')}
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="rounded-lg bg-surface-border px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              {isRtl ? 'إلغاء الفلاتر' : 'Reset'}
            </button>
          )}
        </div>

        {/* Right: Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown size={15} className="text-foreground-subtle" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ProductSortOption)}
            className="rounded-xl border border-surface-border bg-white py-1.5 px-3 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="featured">الأبرز | Featured</option>
            <option value="price-asc">السعر: من الأقل للأعلى | Price: Low to High</option>
            <option value="price-desc">السعر: من الأعلى للأقل | Price: High to Low</option>
            <option value="newest">الأحدث | Newest</option>
            <option value="name-asc">الاسم | Name</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isCategoryLoading || isProductsLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-surface-border bg-white p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-3xl mb-4">
            🛒
          </div>
          <h3 className="text-lg font-bold text-foreground">
            لا توجد منتجات حالياً
          </h3>
          <p className="mt-1 text-sm text-foreground-muted max-w-sm">
            لم نجد منتجات تطابق هذا التصنيف أو الفلاتر المحددة.
          </p>
          {(activeSubcategoryId || inStockOnly) && (
            <button
              onClick={() => {
                setSearchParams({});
                setInStockOnly(false);
              }}
              className="btn-outline mt-5"
            >
              إلغاء الفلاتر | Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
