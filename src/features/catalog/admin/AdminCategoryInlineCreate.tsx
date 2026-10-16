import { useState } from 'react';
import { useCreateCategoryMutation } from '../hooks';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CATEGORY_IMAGE_MAP } from '@/lib/categoryImages';
import {
  Plus,
  X,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface AdminCategoryInlineCreateProps {
  isOpen: boolean;
  onClose: () => void;
  nextSortOrder?: number;
}

const POPULAR_EMOJIS = ['🍎', '🥛', '🍞', '🥩', '🍫', '🥤', '☕', '🧼', '🧹', '👶', '🍝', '🍿', '🔥', '✨'];

export default function AdminCategoryInlineCreate({
  isOpen,
  onClose,
  nextSortOrder = 50,
}: AdminCategoryInlineCreateProps) {
  const createMutation = useCreateCategoryMutation();

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('🛒');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(String(nextSortOrder));

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Auto-generate slug when nameEn changes if user hasn't explicitly customized slug
  const handleNameEnChange = (val: string) => {
    setNameEn(val);
    const autoSlug = val
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (!slug || slug === autoSlug.slice(0, -1)) {
      setSlug(autoSlug);
    }
  };

  const handleApplyPreset = (presetKey: string) => {
    const meta = CATEGORY_IMAGE_MAP[presetKey];
    if (meta) {
      if (!imageUrl) setImageUrl(meta.imageUrl);
      if (meta.icon) setIcon(meta.icon);
      if (meta.nameAr && !nameAr) setNameAr(meta.nameAr);
      if (meta.nameEn && !nameEn) setNameEn(meta.nameEn);
      if (!slug) setSlug(presetKey);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!nameAr.trim()) {
      setErrorMsg('يرجى إدخال اسم القسم بالعربية (Arabic name is required)');
      return;
    }

    const finalSlug = (slug || nameEn || nameAr)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0621-\u064A]+/g, '-')
      .replace(/^-+|-+$/g, '') || `category-${Date.now()}`;

    try {
      await createMutation.mutateAsync({
        name_ar: nameAr.trim(),
        name_en: nameEn.trim() || nameAr.trim(),
        slug: finalSlug,
        icon: icon.trim() || '🛒',
        image_url: imageUrl.trim() || null,
        sort_order: Number(sortOrder) || 50,
        is_active: true,
      });

      setSuccessMsg('تمت إضافة القسم بنجاح! | Category created successfully!');
      setTimeout(() => {
        // Reset and close
        setNameAr('');
        setNameEn('');
        setSlug('');
        setIcon('🛒');
        setImageUrl('');
        onClose();
      }, 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء إضافة القسم';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="mb-8 overflow-hidden rounded-3xl border-2 border-brand-200 bg-white p-6 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Plus size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              إضافة قسم جديد للمتجر | Add New Category
            </h2>
            <p className="text-xs text-foreground-muted">
              قم بإدخال بيانات القسم وصورته ليظهر للعملاء في المتجر
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl p-2 text-foreground-muted hover:bg-surface-muted hover:text-foreground transition-colors"
          title="إلغاء وإغلاق"
        >
          <X size={20} />
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          <Check size={18} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Name AR */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              الاسم بالعربية <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: مخبوزات طازجة، مشروبات، مجمدات..."
              required
              className="rounded-xl"
            />
          </div>

          {/* Name EN */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              الاسم بالإنجليزية (Name in English)
            </label>
            <Input
              type="text"
              value={nameEn}
              onChange={(e) => handleNameEnChange(e.target.value)}
              placeholder="e.g. Fresh Bakery, Soft Drinks..."
              className="rounded-xl"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              رابط القسم (Slug)
            </label>
            <Input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. fresh-bakery"
              className="rounded-xl font-mono text-xs"
            />
          </div>

          {/* Sort Order */}
          <div>
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              الترتيب في الصفحة (Sort Order)
            </label>
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* Icon & Emoji selector */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              الأيقونة / الإيموجي (Icon / Emoji)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                maxLength={4}
                className="w-20 rounded-xl text-center text-xl"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-foreground-muted ml-2">اقتراحات سريعة:</span>
                {POPULAR_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border bg-surface-muted text-base hover:bg-brand-50 hover:border-brand-300 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image URL & Live Preview */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-bold text-foreground">
              رابط صورة القسم (Image URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 w-full">
                <Input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="rounded-xl text-xs"
                />
              </div>

              {/* Preview Box */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-surface-border bg-surface-muted shadow-xs flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="معاينة"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  ) : (
                    <span className="text-2xl">{icon || '🛒'}</span>
                  )}
                </div>
                <span className="text-xs text-foreground-muted">معاينة الصورة</span>
              </div>
            </div>

            {/* Quick Unsplash Preset Buttons */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                <Sparkles size={12} />
                أقسام شائعة بصور جاهزة:
              </span>
              {['dairy-eggs', 'bakery', 'fruits-vegetables', 'meat-fish', 'soft-drinks-juices', 'household-care'].map(
                (slugKey) => {
                  const item = CATEGORY_IMAGE_MAP[slugKey];
                  if (!item) return null;
                  return (
                    <button
                      key={slugKey}
                      type="button"
                      onClick={() => handleApplyPreset(slugKey)}
                      className="rounded-lg bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground-muted hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      {item.icon} {item.nameAr}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-surface-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={createMutation.isPending}
            className="rounded-xl"
          >
            إلغاء | Cancel
          </Button>

          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-xl bg-brand-700 px-6 font-bold text-white hover:bg-brand-800 gap-2"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Check size={16} />
                حفظ وإضافة القسم
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
