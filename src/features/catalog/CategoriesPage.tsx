import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCategoriesQuery } from './hooks';
import { useAuthStore } from '@/features/auth/store';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { Loader2, Plus, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import CategoryCard from './CategoryCard';
import AdminCategoryInlineCreate from './admin/AdminCategoryInlineCreate';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';

  const profile = useAuthStore((s) => s.profile);
  const isAdmin = profile?.role === 'admin';

  const [isCreating, setIsCreating] = useState(false);
  const { data: categories = [], isLoading, error } = useCategoriesQuery();

  const nextSortOrder = (categories.length + 1) * 10;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 border-b border-surface-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              {t('common.categories')}
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              <Layers size={14} />
              {categories.length} {t('common.categories')}
            </span>
          </div>
          <p className="mt-2 text-base text-foreground-muted">
            {t('home.categorySubtitle')}
          </p>
        </div>

        {/* Admin Action: Add New Category Button */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setIsCreating((prev) => !prev)}
              className="rounded-2xl bg-brand-700 px-5 py-2.5 font-bold text-white shadow-md hover:bg-brand-800 transition-all gap-2"
            >
              <Plus size={18} className="stroke-[2.5]" />
              <span>إضافة قسم جديد | Add Category</span>
            </Button>
          </div>
        )}
      </div>

      {/* Admin Inline Category Creation Form (No popups!) */}
      {isAdmin && (
        <AdminCategoryInlineCreate
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          nextSortOrder={nextSortOrder}
        />
      )}

      {/* Categories Grid or Loader */}
      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
          <p>{t('common.error')}</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-surface-border bg-white p-12 text-center text-foreground-muted">
          <Sparkles className="mx-auto h-12 w-12 text-brand-400 mb-3" />
          <p className="text-lg font-bold text-foreground">لا توجد أقسام مسجلة حالياً</p>
          {isAdmin && (
            <Button
              onClick={() => setIsCreating(true)}
              className="mt-4 rounded-xl bg-brand-700 text-white"
            >
              إضافة أول قسم الآن
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isAdmin={Boolean(isAdmin)}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
}
