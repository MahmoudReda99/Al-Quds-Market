import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductsQuery } from './hooks';
import ProductCard from './ProductCard';
import { Search, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) {
        setSearchParams({ q: query.trim() });
      } else {
        setSearchParams({});
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, setSearchParams]);

  const { data: productsData, isLoading } = useProductsQuery({
    searchQuery: debouncedQuery,
  });

  const products = productsData?.products || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Search Header */}
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">
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
            className="w-full rounded-2xl border border-surface-border bg-surface-muted py-3.5 pe-4 ps-12 text-base text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between border-b border-surface-border pb-4">
        <p className="text-sm font-medium text-foreground-muted">
          {debouncedQuery ? (
            <span>
              نتائج البحث عن &ldquo;<strong className="text-foreground">{debouncedQuery}</strong>&rdquo; (
              {productsData?.total ?? 0})
            </span>
          ) : (
            <span>جميع المنتجات ({productsData?.total ?? 0})</span>
          )}
        </p>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-surface-border bg-white p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-muted text-3xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold text-foreground">
            لم نجد أي نتائج لـ &ldquo;{debouncedQuery}&rdquo;
          </h3>
          <p className="mt-1 text-sm text-foreground-muted max-w-sm">
            تأكد من كتابة الكلمات بشكل صحيح أو جرب البحث بكلمات عامة مثل &ldquo;حليب&rdquo; أو &ldquo;تفاح&rdquo;.
          </p>
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
