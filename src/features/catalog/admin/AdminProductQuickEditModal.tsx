import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/types';
import { useUpdateProductMutation, useCategoriesQuery } from '../hooks';
import { uploadProductImage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  X,
  Upload,
  Check,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from 'lucide-react';

interface AdminProductQuickEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AdminProductQuickEditModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: AdminProductQuickEditModalProps) {
  const { t } = useTranslation();
  const updateMutation = useUpdateProductMutation();
  const { data: categories = [] } = useCategoriesQuery();

  // Form State
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [stock, setStock] = useState('0');
  const [unitAr, setUnitAr] = useState('');
  const [unitEn, setUnitEn] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Image State
  const [imageUrl, setImageUrl] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Status message
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setNameAr(product.name_ar || '');
      setNameEn(product.name_en || '');
      setPrice(product.price ? String(product.price) : '0');
      setComparePrice(product.compare_at_price ? String(product.compare_at_price) : '');
      setStock(String(product.stock_quantity ?? 0));
      setUnitAr(product.unit_label_ar || 'قطعة');
      setUnitEn(product.unit_label_en || 'piece');
      setCategoryId(product.category_id || (categories[0]?.id || ''));
      setIsActive(product.is_active);
      setIsFeatured(product.is_featured);

      const firstImg = product.images?.[0]?.url || '';
      setImageUrl(firstImg);
      setSuccessMessage(false);
      setErrorMessage(null);
      setUploadError(null);
    }
  }, [product, categories]);

  if (!isOpen || !product) return null;

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('يرجى اختيار ملف صورة صالح (PNG, JPG, WebP)');
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadError(null);
      const res = await uploadProductImage(file, 'catalog');
      setImageUrl(res.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل رفع الصورة إلى التخزين';
      setUploadError(msg);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedComparePrice = comparePrice.trim() ? parseFloat(comparePrice) : null;

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setErrorMessage('يرجى إدخال سعر صحيح للمنتج');
      return;
    }

    if (isNaN(parsedStock) || parsedStock < 0) {
      setErrorMessage('يرجى إدخال كمية مخزون صحيحة');
      return;
    }

    // Build image array
    const images = imageUrl.trim()
      ? [
          {
            url: imageUrl.trim(),
            alt_ar: nameAr,
            alt_en: nameEn || nameAr,
          },
        ]
      : [];

    try {
      await updateMutation.mutateAsync({
        id: product.id,
        name_ar: nameAr.trim(),
        name_en: nameEn.trim() || nameAr.trim(),
        price: parsedPrice,
        compare_at_price: parsedComparePrice,
        stock_quantity: parsedStock,
        unit_label_ar: unitAr.trim() || 'قطعة',
        unit_label_en: unitEn.trim() || 'piece',
        category_id: categoryId || product.category_id,
        is_active: isActive,
        is_featured: isFeatured,
        images,
      });

      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل حفظ التعديلات';
      setErrorMessage(msg);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-surface-border max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute end-4 top-4 rounded-xl p-2 text-foreground-subtle hover:bg-surface-subtle transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-surface-border pb-4 pe-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              تعديل بيانات المنتج | Quick Product Editor
            </h3>
            <p className="text-xs text-foreground-muted">
              رمز المنتج (SKU): <span className="font-mono font-bold text-brand-700">{product.sku}</span>
            </p>
          </div>
        </div>

        {/* Feedback alerts */}
        {successMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-semibold text-emerald-800 animate-fade-in">
            <Check size={18} className="text-emerald-600" />
            <span>تم حفظ التعديلات بنجاح وتم تحديث المتجر مباشرة!</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-sm font-semibold text-red-700 animate-fade-in">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Active / Inactive Status Toggle (Prominent) */}
          <div
            onClick={() => setIsActive(!isActive)}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition-all ${
              isActive
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                : 'border-red-200 bg-red-50/80 text-red-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isActive ? (
                <ToggleRight size={28} className="text-emerald-600" />
              ) : (
                <ToggleLeft size={28} className="text-red-500" />
              )}
              <div>
                <p className="text-sm font-bold">
                  {isActive ? 'المنتج مفعّل ونشط في المتجر' : 'المنتج معطّل ومخفي عن الزبائن'}
                </p>
                <p className="text-xs opacity-75">
                  {isActive
                    ? 'يظهر للزبائن ويمكنهم شراؤه'
                    : 'لن يظهر في المتجر للزبائن حتى تقوم بإعادة تفعيله'}
                </p>
              </div>
            </div>
            <span
              className={`rounded-xl px-2.5 py-1 text-xs font-bold ${
                isActive ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isActive ? 'نشط | Active' : 'معطل | Disabled'}
            </span>
          </div>

          {/* Product Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <Input
              label="الاسم بالعربية *"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: ببسى كانز"
              required
            />
            <Input
              label="Name in English"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. Pepsi Can"
            />
          </div>

          {/* Pricing & Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <Input
                label={`السعر الحالي (${t('common.currency')}) *`}
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Input
                label="السعر قبل الخصم (اختياري)"
                type="number"
                step="0.01"
                min="0"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="مثال: 20.00"
              />
            </div>

            <div>
              <Input
                label="كمية المخزون *"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                required
              />
              {/* Quick stock adjustment buttons */}
              <div className="mt-1 flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStock('0')}
                  className="rounded bg-surface-muted px-1.5 py-0.5 text-foreground-muted hover:bg-red-50 hover:text-red-600"
                >
                  نفذ (0)
                </button>
                <button
                  type="button"
                  onClick={() => setStock(String((parseInt(stock, 10) || 0) + 10))}
                  className="rounded bg-surface-muted px-1.5 py-0.5 text-foreground-muted hover:bg-brand-50 hover:text-brand-700"
                >
                  +10
                </button>
                <button
                  type="button"
                  onClick={() => setStock(String((parseInt(stock, 10) || 0) + 50))}
                  className="rounded bg-surface-muted px-1.5 py-0.5 text-foreground-muted hover:bg-brand-50 hover:text-brand-700"
                >
                  +50
                </button>
              </div>
            </div>
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="mb-1 block text-xs font-semibold text-foreground">
                القسم | Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 px-3 text-xs focus:border-brand-600 focus:bg-white focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name_ar}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="الوحدة بالعربية *"
              value={unitAr}
              onChange={(e) => setUnitAr(e.target.value)}
              placeholder="قطعة، كغ، لتر"
              required
            />

            <Input
              label="Unit (English)"
              value={unitEn}
              onChange={(e) => setUnitEn(e.target.value)}
              placeholder="piece, kg, L"
            />
          </div>

          {/* Image & Icon Section */}
          <div className="rounded-2xl border border-surface-border bg-surface-muted/50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ImageIcon size={15} className="text-brand-700" />
                <span>صورة أو أيقونة المنتج | Product Image</span>
              </label>
              {imageUrl && (
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="text-[11px] text-red-600 hover:underline"
                >
                  إزالة الصورة
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-surface-border bg-white shadow-sm overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&auto=format&fit=crop&q=80';
                    }}
                  />
                ) : (
                  <span className="text-2xl">🛒</span>
                )}
              </div>

              {/* Direct URL input + Upload Button */}
              <div className="flex-1 space-y-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... رابط صورة المنتج المباشر"
                  className="text-xs"
                />

                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 transition-colors">
                    {isUploadingImage ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Upload size={14} />
                    )}
                    <span>{isUploadingImage ? 'جاري الرفع...' : 'رفع صورة من جهازك'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
              </div>
            </div>

            {uploadError && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={13} />
                <span>{uploadError}</span>
              </p>
            )}
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="quick_featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-surface-border text-brand-700 focus:ring-brand-500"
            />
            <label
              htmlFor="quick_featured"
              className="text-xs font-semibold text-foreground cursor-pointer"
            >
              عرض كمنتج مميز في الصفحة الرئيسية (Featured)
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updateMutation.isPending}
            >
              إلغاء | Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-brand-700 hover:bg-brand-800 min-w-[120px]"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="me-2 animate-spin" size={16} />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Check className="me-1.5" size={16} />
                  <span>حفظ التعديلات</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
