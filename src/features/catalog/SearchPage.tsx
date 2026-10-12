import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductsQuery, useCategoriesQuery } from './hooks';
import type { ProductSortOption } from './types';
import ProductCard from './ProductCard';
import { localizedText, cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { Search, Loader2, ArrowUpDown, X } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('cat') || '';

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<ProductSortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync state if URL changes externally
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('cat') || '';
    setQuery(q);
    setDebouncedQuery(q);
    setSelectedCategorySlug(cat);
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (selectedCategorySlug) params.set('cat', selectedCategorySlug);
      setSearchParams(params, { replace: true });
    }, 300);

    return () => clearTimeout(handler);
  }, [query, selectedCategorySlug, setSearchParams]);

  // Fetch categories for filter chips
  const { data: categories = [] } = useCategoriesQuery();

  // Fetch products with search, category, stock, and sort filters
  const { data: productsData, isLoading } = useProductsQuery({
    searchQuery: debouncedQuery,
    categorySlug: selectedCategorySlug || undefined,
    inStockOnly,
    sortBy,
  });

  const products = productsData?.products || [];

  const handleCategorySelect = (slug: string) => {
    const newSlug = selectedCategorySlug === slug ? '' : slug;
    setSelectedCategorySlug(newSlug);
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (newSlug) params.set('cat', newSlug);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setQuery('');
    setDebouncedQuery('');
    setSelectedCategorySlug('');
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    debouncedQuery.trim() || selectedCategorySlug || inStockOnly || sortBy !== 'featured'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Search Header */}
      <div className="mb-6 max-w-3xl">
        <h1 className="text-3xl font-black text-foreground sm:text-4xl mb-4">
          {t('common.search')}
        </h1>
        <div className="relative">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 text-foreground-subtle" size={20} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.search')}
            autoFocus
            className="w-full rounded-2xl border border-surface-border bg-surface-muted py-3.5 pe-12 ps-12 text-base text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm transition-all"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setDebouncedQuery('');
              }}
              className="absolute end-4 top-1/2 -translate-y-1/2 p-1 text-foreground-subtle hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategorySelect('')}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap shadow-sm',
                !selectedCategorySlug
                  ? 'bg-brand-700 text-white shadow-brand-700/20'
                  : 'border border-surface-border bg-white text-foreground-muted hover:border-brand-200'
              )}
            >
              {t('common.seeAll')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all whitespace-nowrap shadow-sm',
                  selectedCategorySlug === cat.slug
                    ? 'bg-brand-700 text-white shadow-brand-700/20'
                    : 'border border-surface-border bg-white text-foreground-muted hover:border-brand-200'
                )}
              >
                <span>{cat.icon || '🛍️'}</span>
                <span>{localizedText(cat.name_ar, cat.name_en, lang)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar: Results Count, In-Stock Toggle & Sort Selector */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-surface-border bg-surface-muted p-3">
        {/* Results Count & Reset */}
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm font-medium text-foreground-muted">
            {debouncedQuery ? (
              <span>
                {isRtl ? 'نتائج البحث عن' : 'Results for'} &ldquo;
                <strong className="text-foreground">{debouncedQuery}</strong>&rdquo; (
                {productsData?.total ?? 0})
              </span>
            ) : (
              <span>
                {isRtl ? 'جميع المنتجات' : 'All Products'} ({productsData?.total ?? 0})
              </span>
            )}
          </p>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 rounded-lg bg-surface-border px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <X size={12} />
              <span>{isRtl ? 'مسح الفلاتر' : 'Reset'}</span>
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-4">
          {/* In-stock toggle */}
          <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 rounded border-surface-border text-brand-700 focus:ring-brand-700"
            />
            <span>{t('product.inStock')}</span>
          </label>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={14} className="text-foreground-subtle" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as ProductSortOption)}
              className="rounded-xl border border-surface-border bg-white py-1.5 px-3 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
            >
              <option value="featured">الأبرز | Featured</option>
              <option value="price-asc">السعر: من الأقل للأعلى | Price: Low to High</option>
              <option value="price-desc">السعر: من الأعلى للأقل | Price: High to Low</option>
              <option value="newest">الأحدث | Newest</option>
              <option value="name-asc">الاسم | Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-surface-border bg-white p-12 text-center shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-3xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-foreground">
            {debouncedQuery
              ? isRtl
                ? `لم نجد أي نتائج لـ "${debouncedQuery}"`
                : `No results found for "${debouncedQuery}"`
              : isRtl
              ? 'لم يتم العثور على منتجات مطابقة للفلاتر'
              : 'No products match your selected filters'}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted max-w-sm">
            {isRtl
              ? 'تأكد من كتابة الكلمات بشكل صحيح أو جرب البحث بكلمات عامة مثل "حليب" أو "تفاح"، أو قم بإلغاء بعض الفلاتر.'
              : 'Try checking your spelling, using more general terms, or resetting active filters.'}
          </p>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="mt-6 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-brand-800 transition-colors"
            >
              {isRtl ? 'إعادة ضبط البحث والفلاتر' : 'Reset Search & Filters'}
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
