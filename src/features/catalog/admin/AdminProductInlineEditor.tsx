import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/types';
import { useUpdateProductMutation, useCategoriesQuery } from '../hooks';
import { uploadProductImage } from '@/lib/storage';
import { resolveProductImage } from '@/lib/productImages';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Upload,
  Check,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Save,
  Package,
} from 'lucide-react';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

interface AdminProductInlineEditorProps {
  product: Product;
}

export default function AdminProductInlineEditor({ product }: AdminProductInlineEditorProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const updateMutation = useUpdateProductMutation();
  const { data: categories = [] } = useCategoriesQuery();

  // Form State
  const [nameAr, setNameAr] = useState(product.name_ar || '');
  const [nameEn, setNameEn] = useState(product.name_en || '');
  const [price, setPrice] = useState(String(product.price || '0'));
  const [comparePrice, setComparePrice] = useState(
    product.compare_at_price ? String(product.compare_at_price) : ''
  );
  const [stock, setStock] = useState(String(product.stock_quantity ?? 0));
  const [unitAr, setUnitAr] = useState(product.unit_label_ar || 'قطعة');
  const [unitEn, setUnitEn] = useState(product.unit_label_en || 'piece');
  const [categoryId, setCategoryId] = useState(product.category_id || '');
  const [descriptionAr, setDescriptionAr] = useState(product.description_ar || '');
  const [isActive, setIsActive] = useState(product.is_active);
  const [isFeatured, setIsFeatured] = useState(product.is_featured);

  // Image State
  const initialImg = product.images?.[0]?.url || resolveProductImage(product);
  const [imageUrl, setImageUrl] = useState(initialImg);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Status State
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync if product prop changes
  useEffect(() => {
    setNameAr(product.name_ar || '');
    setNameEn(product.name_en || '');
    setPrice(String(product.price || '0'));
    setComparePrice(product.compare_at_price ? String(product.compare_at_price) : '');
    setStock(String(product.stock_quantity ?? 0));
    setUnitAr(product.unit_label_ar || 'قطعة');
    setUnitEn(product.unit_label_en || 'piece');
    setCategoryId(product.category_id || '');
    setDescriptionAr(product.description_ar || '');
    setIsActive(product.is_active);
    setIsFeatured(product.is_featured);
    setImageUrl(product.images?.[0]?.url || resolveProductImage(product));
  }, [product]);

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

  const handleSave = async (e: React.FormEvent) => {
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
        description_ar: descriptionAr.trim() || null,
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
      }, 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل حفظ التعديلات';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-700 transition-colors">
          {t('common.home')}
        </Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-brand-700 transition-colors">
          {t('common.categories')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-foreground line-clamp-1">{nameAr}</span>
      </nav>

      {/* Admin Mode Header Banner */}
      <div className="mb-8 rounded-3xl bg-amber-500/10 border border-amber-300 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
            <Sparkles size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-foreground">
                تعديل المنتج في المتجر | Product Editor
              </h1>
              <span
                className={`rounded-xl px-2.5 py-0.5 text-xs font-bold ${
                  isActive ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isActive ? 'نشط في المتجر' : 'معطل ومخفي'}
              </span>
            </div>
            <p className="text-xs text-foreground-muted mt-0.5">
              رمز المنتج (SKU): <span className="font-mono font-bold text-brand-700">{product.sku}</span> | حساب الإدارة لتعديل السعر والكمية والصورة والتعطيل مباشرة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-initial"
          >
            <ArrowIcon className="me-1.5" size={16} />
            <span>رجوع | Back</span>
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="flex-1 sm:flex-initial bg-brand-700 hover:bg-brand-800 text-white shadow-md shadow-brand-700/20"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="me-2 animate-spin" size={16} />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="me-1.5" size={16} />
                <span>حفظ التعديلات</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 font-bold shadow-sm animate-fade-in">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Check size={18} />
          </div>
          <div>
            <p className="text-sm font-bold">تم حفظ جميع التعديلات بنجاح!</p>
            <p className="text-xs font-normal text-emerald-700">تم تحديث بيانات المنتج وصورته وسعره في قاعدة البيانات والمتجر مباشرة.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900 font-bold shadow-sm animate-fade-in">
          <AlertCircle size={20} className="text-red-600 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Main In-Page Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Product Photo & Media (4 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <ImageIcon size={18} className="text-brand-700" />
              <span>صورة المنتج أو الأيقونة</span>
            </h2>

            {/* Main Preview Box */}
            <div className="relative flex aspect-square items-center justify-center rounded-2xl border border-surface-border bg-surface-muted p-6 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={nameAr}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <span className="text-7xl">🛒</span>
              )}

              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                  <span className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                    المنتج معطل ومخفي
                  </span>
                </div>
              )}
            </div>

            {/* Image URL input */}
            <div>
              <Input
                label="رابط الصورة المباشر (Image URL)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="text-xs"
              />
              <p className="mt-1 text-[11px] text-foreground-muted">
                يمكنك لصق رابط أي صورة من الإنترنت مباشرة وسيعرضها المتجر فوراً.
              </p>
            </div>

            {/* File upload from device */}
            <div className="pt-2">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/50 p-4 text-center text-sm font-semibold text-brand-700 hover:bg-brand-100/60 transition-colors">
                {isUploadingImage ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Upload size={18} />
                )}
                <span>{isUploadingImage ? 'جاري الرفع للتخزين...' : 'أو رفع صورة من جهازك'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  disabled={isUploadingImage}
                />
              </label>

              {uploadError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={13} />
                  <span>{uploadError}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: All Editable Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Active / Disable Toggle Card */}
          <div
            onClick={() => setIsActive(!isActive)}
            className={`cursor-pointer rounded-3xl border p-5 transition-all shadow-sm ${
              isActive
                ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950'
                : 'border-red-300 bg-red-50/90 text-red-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isActive ? (
                  <ToggleRight size={36} className="text-emerald-600" />
                ) : (
                  <ToggleLeft size={36} className="text-red-500" />
                )}
                <div>
                  <h3 className="text-base font-bold">
                    {isActive ? 'المنتج نشط ومفعّل في المتجر' : 'المنتج معطّل ومخفي عن الزبائن'}
                  </h3>
                  <p className="text-xs opacity-80 mt-0.5">
                    {isActive
                      ? 'يظهر في قائمة المنتجات ويمكن للزبائن رؤيته'
                      : 'مخفي تماماً عن الزبائن في المتجر حتى تقوم بإعادة تفعيله'}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-2xl px-3 py-1.5 text-xs font-bold shadow-sm ${
                  isActive ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}
              >
                {isActive ? '🟢 مفعّل' : '🔴 معطّل'}
              </span>
            </div>
          </div>

          {/* 2. Pricing & Stock Card */}
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Package size={18} className="text-brand-700" />
              <span>الأسعار والكميات في المخزن</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  placeholder="مثال: 25.00"
                />
              </div>

              <div>
                <Input
                  label="كمية المخزون *"
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setStock('0')}
                    className="rounded-lg bg-surface-muted px-2 py-0.5 text-foreground-muted hover:bg-red-50 hover:text-red-600 font-semibold"
                  >
                    نفذ (0)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStock(String((parseInt(stock, 10) || 0) + 10))}
                    className="rounded-lg bg-surface-muted px-2 py-0.5 text-foreground-muted hover:bg-brand-50 hover:text-brand-700 font-semibold"
                  >
                    +10
                  </button>
                  <button
                    type="button"
                    onClick={() => setStock(String((parseInt(stock, 10) || 0) + 50))}
                    className="rounded-lg bg-surface-muted px-2 py-0.5 text-foreground-muted hover:bg-brand-50 hover:text-brand-700 font-semibold"
                  >
                    +50
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Product Names & Details */}
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-base font-bold text-foreground">
              الأسماء والتصنيف
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="الاسم بالعربية *"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: تفاح أحمر طازج"
                required
              />
              <Input
                label="Name in English"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Fresh Red Apples"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                label="Unit in English"
                value={unitEn}
                onChange={(e) => setUnitEn(e.target.value)}
                placeholder="piece, kg, L"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-foreground">
                الوصف (اختياري)
              </label>
              <textarea
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                rows={3}
                placeholder="وصف تفصيلي للمنتج..."
                className="w-full rounded-2xl border border-surface-border bg-surface-muted p-3 text-sm focus:border-brand-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="inline_featured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-surface-border text-brand-700 focus:ring-brand-500"
              />
              <label
                htmlFor="inline_featured"
                className="text-xs font-semibold text-foreground cursor-pointer"
              >
                عرض كمنتج مميز في الصفحة الرئيسية (Featured)
              </label>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              إلغاء والرجوع | Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-brand-700 hover:bg-brand-800 text-white min-w-[160px] py-3 text-base font-bold shadow-md shadow-brand-700/20"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="me-2 animate-spin" size={18} />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="me-2" size={18} />
                  <span>حفظ التعديلات</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
