import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryWithChildren } from './types';
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from './hooks';
import { getCategoryFallback } from '@/lib/categoryImages';
import { localizedText } from '@/lib/utils';
import type { SupportedLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
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
    <div className="group relative flex flex-col items-center">
      {/* Category Image Card: Image takes the ENTIRE card */}
      <Link
        to={`/category/${category.slug}`}
        className="relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-surface-border bg-white shadow-card card-hover transition-all duration-300 hover:shadow-hover hover:border-brand-300 block"
      >
        <img
          src={displayImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallback.imageUrl;
          }}
        />

        {/* Admin Quick Action Floating Buttons (Top Corner) */}
        {isAdmin && (
          <div
            className="absolute top-2 left-2 z-10 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-amber-800 shadow-md hover:bg-amber-100 transition-colors border border-amber-200"
              title="تعديل | Edit"
            >
              <Pencil size={12} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsConfirmingDelete(true);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-red-600 shadow-md hover:bg-red-100 transition-colors border border-red-200"
              title="حذف | Delete"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </Link>

      {/* Name of the category below the card */}
      <Link
        to={`/category/${category.slug}`}
        className="mt-1.5 text-center w-full px-0.5 block group/text"
      >
        <h2 className="text-[11px] sm:text-xs md:text-sm font-bold text-foreground group-hover/text:text-brand-700 transition-colors line-clamp-2 leading-tight min-h-[2rem] flex items-center justify-center">
          {name}
        </h2>
        {category.name_en && (
          <p className="mt-0.5 text-[10px] sm:text-[11px] text-foreground-muted line-clamp-1">
            {lang === 'ar' ? category.name_en : category.name_ar}
          </p>
        )}
      </Link>
    </div>
  );
}
