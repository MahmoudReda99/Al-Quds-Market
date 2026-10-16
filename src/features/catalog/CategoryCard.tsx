import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { CategoryWithChildren } from './types';
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from './hooks';
import { getCategoryFallback } from '@/lib/categoryImages';
import { localizedText } from '@/lib/utils';
import type { SupportedLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryWithChildren;
  isAdmin: boolean;
  lang: SupportedLanguage;
}

export default function CategoryCard({ category, isAdmin, lang }: CategoryCardProps) {
  const { t } = useTranslation();
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const updateMutation = useUpdateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Edit fields
  const [nameAr, setNameAr] = useState(category.name_ar || '');
  const [nameEn, setNameEn] = useState(category.name_en || '');
  const [slug, setSlug] = useState(category.slug || '');
  const [icon, setIcon] = useState(category.icon || '🛒');
  const [imageUrl, setImageUrl] = useState(category.image_url || '');
  const [sortOrder, setSortOrder] = useState(String(category.sort_order ?? 0));
  const [editError, setEditError] = useState<string | null>(null);

  const fallback = getCategoryFallback(category.slug);
  const displayImage = category.image_url || fallback.imageUrl;
  const displayIcon = category.icon || fallback.icon || '🛒';
  const name = localizedText(category.name_ar, category.name_en, lang);

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    if (!nameAr.trim()) {
      setEditError('الاسم بالعربية مطلوب');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: category.id,
        name_ar: nameAr.trim(),
        name_en: nameEn.trim() || nameAr.trim(),
        slug: slug.trim().toLowerCase(),
        icon: icon.trim() || '🛒',
        image_url: imageUrl.trim() || null,
        sort_order: Number(sortOrder) || 0,
      });
      setIsEditing(false);
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : 'فشل تحديث القسم');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(category.id);
      setIsConfirmingDelete(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'فشل حذف القسم');
    }
  };

  // 1. INLINE EDITING MODE
  if (isEditing) {
    return (
      <div className="flex flex-col rounded-3xl border-2 border-brand-300 bg-white p-5 shadow-lg animate-fade-in">
        <div className="flex items-center justify-between border-b border-surface-border pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="font-bold text-foreground text-sm">
              تعديل القسم | Edit Category
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-muted transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {editError && (
          <div className="mb-3 rounded-xl bg-red-50 p-2.5 text-xs text-red-600 font-medium">
            {editError}
          </div>
        )}

        <form onSubmit={handleSaveEdit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">الاسم بالعربية</label>
            <Input
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              required
              className="h-9 text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">الاسم بالإنجليزية</label>
            <Input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="h-9 text-xs rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">الرابط المختصر (Slug)</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="h-9 text-xs font-mono rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">الأيقونة</label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                maxLength={4}
                className="h-9 text-xs text-center rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">الترتيب</label>
              <Input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="h-9 text-xs rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1">رابط الصورة (Image URL)</label>
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="h-9 text-xs rounded-xl"
            />
          </div>

          {/* Live Preview */}
          <div className="flex items-center gap-3 rounded-2xl bg-surface-muted p-2">
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-surface-border bg-white flex items-center justify-center shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="معاينة"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallback.imageUrl;
                  }}
                />
              ) : (
                <span className="text-xl">{icon}</span>
              )}
            </div>
            <span className="text-xs text-foreground-muted">معاينة الصورة الحالية</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-border">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="rounded-xl h-8 text-xs"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={updateMutation.isPending}
              className="rounded-xl h-8 text-xs bg-brand-700 text-white hover:bg-brand-800 gap-1"
            >
              {updateMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
              حفظ
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // 2. DELETE CONFIRMATION MODE
  if (isConfirmingDelete) {
    return (
      <div className="flex flex-col justify-between rounded-3xl border-2 border-red-300 bg-red-50/60 p-5 shadow-md animate-fade-in">
        <div>
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle size={20} className="shrink-0" />
            <h4 className="font-bold text-sm">حذف هذا القسم؟</h4>
          </div>
          <p className="text-xs text-red-700 leading-relaxed">
            هل أنت متأكد من حذف قسم <strong>{name}</strong>؟
            إذا كان القسم يحتوي على منتجات مسجلة، فسيتم إلغاء تنشيطه وإخفاؤه من واجهة المتجر لحماية المنتجات.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-red-200 mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsConfirmingDelete(false)}
            className="rounded-xl h-8 text-xs bg-white"
          >
            تراجع | Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="rounded-xl h-8 text-xs bg-red-600 text-white hover:bg-red-700 gap-1"
          >
            {deleteMutation.isPending ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Trash2 size={13} />
            )}
            تأكيد الحذف
          </Button>
        </div>
      </div>
    );
  }

  // 3. NORMAL DISPLAY MODE
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-surface-border bg-white shadow-card card-hover transition-all duration-300 hover:shadow-hover hover:border-brand-200">
      {/* Category Image Header */}
      <Link
        to={`/category/${category.slug}`}
        className="block relative aspect-[16/10] w-full overflow-hidden bg-brand-50"
      >
        <img
          src={displayImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallback.imageUrl;
          }}
        />

        {/* Gradient shadow for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Icon Floating Badge */}
        <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 backdrop-blur-md shadow-md text-xl">
          {displayIcon}
        </div>

        {/* Category Name on Image */}
        <div className="absolute bottom-3 right-3 left-3 text-white">
          <h2 className="text-lg font-extrabold drop-shadow-md line-clamp-1">
            {name}
          </h2>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-200 drop-shadow-sm mt-0.5">
            {t('home.shopNow')}
            <ArrowIcon size={12} />
          </span>
        </div>
      </Link>

      {/* Subcategories Chips */}
      {category.children && category.children.length > 0 && (
        <div className="p-4 pt-3 border-t border-surface-border/60 flex-1">
          <p className="text-[11px] font-medium text-foreground-muted mb-2">
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

      {/* ADMIN CONTROLS FOOTER */}
      {isAdmin && (
        <div className="flex items-center justify-between border-t border-amber-100 bg-amber-50/50 px-4 py-2.5">
          <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500 inline-block animate-pulse" />
            إدارة القسم (Admin)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-xs font-semibold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors"
              title="تعديل بيانات القسم"
            >
              <Pencil size={12} />
              <span>تعديل</span>
            </button>

            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-semibold text-red-600 shadow-xs hover:bg-red-50 transition-colors"
              title="حذف هذا القسم"
            >
              <Trash2 size={12} />
              <span>حذف</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
