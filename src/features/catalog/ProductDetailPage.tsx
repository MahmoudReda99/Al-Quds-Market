import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProductQuery, useRelatedProductsQuery } from './hooks';
import ProductCard from './ProductCard';
import { localizedText, cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { useCartStore } from '@/features/cart/store';
import { useFavoritesStore } from '@/features/favorites/store';
import { useAuthStore } from '@/features/auth/store';
import AdminProductQuickEditModal from './admin/AdminProductQuickEditModal';
import { Button } from '@/components/ui/Button';
import {
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Pencil,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const { data: product, isLoading, error } = useProductQuery(id);
  const { data: relatedProducts = [] } = useRelatedProductsQuery(product?.category_id, product?.id);

  const profile = useAuthStore((s) => s.profile);
  const isAdmin = profile?.role === 'admin';

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const isFav = useFavoritesStore((s) => s.isFavorite(product?.id || ''));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-bold text-foreground">المنتج غير متوفر</h2>
        <p className="mt-2 text-sm text-foreground-muted">
          لم نتمكن من العثور على هذا المنتج.
        </p>
        <Button className="mt-6" onClick={() => navigate('/categories')}>
          {t('home.shopCategories')}
        </Button>
      </div>
    );
  }

  const name = localizedText(product.name_ar, product.name_en, lang);
  const description = localizedText(product.description_ar, product.description_en, lang);
  const unit = localizedText(product.unit_label_ar, product.unit_label_en, lang);

  const hasDiscount = product.compare_at_price !== null && product.compare_at_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: '', alt_ar: name, alt_en: name }];

  const activeImageUrl = images[selectedImageIndex]?.url;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
    openCart();
  };

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
        <span className="font-semibold text-foreground line-clamp-1">{name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
        {/* Left / Start: Image Gallery */}
        <div className="space-y-4">
          {/* Main Hero Image */}
          <div className="relative flex aspect-square items-center justify-center rounded-3xl border border-surface-border bg-surface-muted p-8 shadow-card overflow-hidden">
            {activeImageUrl ? (
              <img
                src={activeImageUrl}
                alt={name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-8xl" aria-hidden="true">
                🛒
              </span>
            )}

            {/* Badges */}
            <div className="absolute start-4 top-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="rounded-xl bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                  -{discountPct}%
                </span>
              )}
            </div>

            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className={cn(
                'absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 active:scale-95',
                isFav ? 'text-red-500' : 'text-foreground-subtle hover:text-red-500'
              )}
              aria-label="Toggle favorite"
            >
              <Heart size={20} className={isFav ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    'flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-surface-muted p-2 transition-all',
                    selectedImageIndex === idx
                      ? 'border-brand-700 ring-2 ring-brand-700/20 shadow-sm'
                      : 'border-surface-border opacity-70 hover:opacity-100'
                  )}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right / End: Product Info & Actions */}
        <div className="flex flex-col">
          {/* SKU & Category badge */}
          <div className="flex items-center gap-2 text-xs text-foreground-subtle mb-2">
            <span>{t('product.sku')}: {product.sku}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-black text-foreground sm:text-3xl leading-snug">
            {name}
          </h1>

          {/* Unit */}
          <p className="mt-1 text-sm font-medium text-foreground-muted">
            {t('product.unit')}: {unit}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3 border-y border-surface-border py-4">
            <span className="text-3xl font-black text-foreground">
              {product.price.toFixed(2)}{' '}
              <span className="text-lg font-bold text-brand-700">{t('common.currency')}</span>
            </span>
            {hasDiscount && (
              <span className="text-lg text-foreground-subtle line-through">
                {product.compare_at_price!.toFixed(2)} {t('common.currency')}
              </span>
            )}
            <span className="ms-auto text-xs font-semibold text-brand-700">
              {unit ? `/ ${unit}` : ''}
            </span>
          </div>

          {/* Stock Status Badge */}
          <div className="mt-4 flex items-center gap-2">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                {t('common.outOfStock')}
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
                {t('product.lowStock')} ({product.stock_quantity} متبقي)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                {t('product.inStock')}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="mt-5 text-sm text-foreground-muted leading-relaxed">
              <h3 className="font-semibold text-foreground mb-1">
                {t('product.description')}
              </h3>
              <p>{description}</p>
            </div>
          )}

          {/* Quantity and Add to Cart Section OR Admin Controls */}
          {isAdmin ? (
            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/70 p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
                  <Pencil size={18} className="text-amber-600" />
                  <span>وضع الإدارة والتحكم | Admin Controls</span>
                </div>
                <span
                  className={`rounded-xl px-3 py-1 text-xs font-bold ${
                    product.is_active ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {product.is_active ? 'نشط في المتجر' : 'معطل ومخفي'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-white/80 p-3 rounded-2xl border border-amber-100">
                <div>
                  <span className="text-foreground-muted block">المخزون الحالي:</span>
                  <span className="font-bold text-foreground text-sm">{product.stock_quantity} {unit}</span>
                </div>
                <div>
                  <span className="text-foreground-muted block">السعر:</span>
                  <span className="font-bold text-brand-700 text-sm">{product.price.toFixed(2)} {t('common.currency')}</span>
                </div>
              </div>

              <p className="text-xs text-foreground-muted leading-relaxed">
                بصفتك مسؤول إدارة (Admin)، حسابك مخصص للتحكم وتعديل الأسعار والكميات وتفعيل/تعطيل المنتجات، ولا يمكنه إجراء طلبات شراء.
              </p>

              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md shadow-amber-500/20"
              >
                <Pencil className="me-2" size={18} />
                <span>تعديل هذا المنتج | Edit This Product</span>
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex h-12 items-center justify-between rounded-xl border border-surface-border bg-surface-muted px-3 min-w-[130px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle disabled:opacity-40 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="text-base font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity || isOutOfStock}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle disabled:opacity-40 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add To Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 h-12 text-base font-bold shadow-md shadow-brand-700/20"
              >
                {addedToast ? (
                  <>
                    <Check className="me-2" size={18} />
                    <span>{t('common.addedToCart')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="me-2" size={18} />
                    <span>{t('common.addToCart')} ({(product.price * quantity).toFixed(2)} {t('common.currency')})</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Guarantees row */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-surface-border pt-6">
            <div className="flex items-center gap-3 rounded-2xl bg-surface-muted p-3">
              <Truck className="text-brand-700 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-foreground">{t('home.feature1Title')}</p>
                <p className="text-[11px] text-foreground-muted">{t('home.feature1Desc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-surface-muted p-3">
              <ShieldCheck className="text-brand-700 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-foreground">{t('common.cashOnDelivery')}</p>
                <p className="text-[11px] text-foreground-muted">{t('home.feature4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-surface-border pt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {t('product.relatedProducts')}
            </h2>
            <Link
              to={`/category/${product.category_id}`}
              className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              <span>{t('common.seeAll')}</span>
              <ArrowIcon size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Admin Quick Edit Modal */}
      {isAdmin && (
        <AdminProductQuickEditModal
          product={product}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
