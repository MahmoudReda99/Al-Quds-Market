import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoriesQuery } from './hooks';
import { localizedText } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const { data: categories = [], isLoading, error } = useCategoriesQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8 border-b border-surface-border pb-6">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          {t('common.categories')}
        </h1>
        <p className="mt-2 text-base text-foreground-muted">
          {t('home.categorySubtitle')}
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <p>{t('common.error')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {
            const name = localizedText(category.name_ar, category.name_en, lang);

            return (
              <div
                key={category.id}
                className="flex flex-col rounded-2xl border border-surface-border bg-white p-5 shadow-card card-hover transition-all"
              >
                {/* Category Main Card Header */}
                <Link
                  to={`/category/${category.slug}`}
                  className="flex items-center gap-3.5 group"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl group-hover:scale-105 transition-transform overflow-hidden shadow-xs">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      category.icon || '🛒'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-foreground group-hover:text-brand-700 transition-colors">
                      {name}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 mt-0.5">
                      {t('home.shopNow')}
                      <ArrowIcon size={12} />
                    </span>
                  </div>
                </Link>

                {/* Subcategories Chips */}
                {category.children && category.children.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-surface-border/60">
                    <p className="text-xs font-medium text-foreground-subtle mb-2">
                      الأقسام الفرعية | Subcategories:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.children.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${category.slug}?sub=${sub.id}`}
                          className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground-muted hover:bg-brand-50 hover:text-brand-700 transition-colors"
                        >
                          {localizedText(sub.name_ar, sub.name_en, lang)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
