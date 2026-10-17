import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  Check,
  ShieldCheck,
  Pencil,
  Truck,
} from 'lucide-react';
import { useProductQuickViewStore } from './quickViewStore';
import { useCartStore } from '@/features/cart/store';
import { useFavoritesStore } from '@/features/favorites/store';
import { useAuthStore } from '@/features/auth/store';
import { localizedText, cn } from '@/lib/utils';
import { resolveProductImage } from '@/lib/productImages';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';

export default function ProductQuickViewModal() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isAr = lang === 'ar';

  const product = useProductQuickViewStore((s) => s.product);
  const isOpen = useProductQuickViewStore((s) => s.isOpen);
  const closeQuickView = useProductQuickViewStore((s) => s.closeQuickView);

  const profile = useAuthStore((s) => s.profile);
  const isAdmin = profile?.role === 'admin';

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const cartItems = useCartStore((s) => s.items);

  const cartItem = product ? cartItems.find((i) => i.product.id === product.id) : undefined;
  const inCartQty = cartItem?.quantity || 0;

  const isFav = useFavoritesStore((s) => (product ? s.isFavorite(product.id) : false));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Sync internal quantity with cart or reset to 1
  useEffect(() => {
    if (inCartQty > 0) {
      setQuantity(inCartQty);
    } else {
      setQuantity(1);
    }
  }, [inCartQty, product?.id]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeQuickView]);

  if (!isOpen || !product) return null;

  const name = localizedText(product.name_ar, product.name_en, lang);
  const description = localizedText(product.description_ar, product.description_en, lang);
  const unit = localizedText(product.unit_label_ar, product.unit_label_en, lang);

  const hasDiscount = product.compare_at_price !== null && product.compare_at_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const isOutOfStock = product.stock_quantity <= 0;
  const imageUrl = resolveProductImage(product);

  const handleApplyQuantity = (newQty: number) => {
    if (!product || isOutOfStock) return;
    if (newQty <= 0) {
      removeItem(product.id);
      setQuantity(1);
    } else {
      const capped = Math.min(newQty, product.stock_quantity);
      setQuantity(capped);
      if (inCartQty > 0) {
        updateQuantity(product.id, capped);
      } else {
        addItem(product, capped);
      }
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-surface-border bg-white shadow-2xl animate-scale-up">
        {/* Header / Close Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-surface-border/80 bg-white/95 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
              {isAr ? 'تفاصيل سريعة' : 'Quick View'}
            </span>
            {isAdmin && (
              <Link
                to={`/product/${product.id}`}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800 hover:bg-amber-100 border border-amber-200"
              >
                <Pencil size={12} />
                <span>{isAr ? 'تعديل كامل' : 'Edit'}</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted transition-colors hover:bg-red-50',
                isFav ? 'text-red-500' : 'text-foreground-muted hover:text-red-500'
              )}
              aria-label="Toggle favorite"
            >
              <Heart size={18} className={isFav ? 'fill-red-500' : ''} />
            </button>

            <button
              type="button"
              onClick={closeQuickView}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-foreground-muted transition-colors hover:bg-surface-border hover:text-foreground"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Product Content */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Product Image Area */}
          <div className="relative flex aspect-square sm:aspect-[4/3] w-full items-center justify-center rounded-2xl bg-surface-muted/50 p-6 overflow-hidden border border-surface-border">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <span className="text-7xl">🛒</span>
            )}

            {/* Badges */}
            <div className="absolute start-3 top-3 flex flex-col gap-1.5">
              {hasDiscount && (
                <span className="rounded-xl bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  -{discountPct}%
                </span>
              )}
              {isOutOfStock && (
                <span className="rounded-xl bg-foreground/80 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  {t('common.outOfStock')}
                </span>
              )}
            </div>
          </div>

          {/* Title & Unit */}
          <div>
            <h2 className="text-lg sm:text-xl font-black text-foreground leading-snug">
              {name}
            </h2>
            {unit && (
              <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground-muted">
                {unit}
              </p>
            )}
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-2.5 border-y border-surface-border py-3">
            <span className="text-2xl font-black text-foreground">
              {product.price.toFixed(2)} {t('common.currency')}
            </span>
            {hasDiscount && (
              <span className="text-sm font-medium text-foreground-subtle line-through">
                {product.compare_at_price!.toFixed(2)} {t('common.currency')}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-subtle mb-1.5">
                {isAr ? 'عن المنتج' : 'Product Information'}
              </h3>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* Features Highlights */}
          <div className="grid grid-cols-2 gap-3 text-xs text-foreground-muted pt-1">
            <div className="flex items-center gap-2 rounded-xl bg-surface-muted/60 p-2.5">
              <Truck size={16} className="text-brand-600 shrink-0" />
              <span>{isAr ? 'توصيل في 15 دقيقة' : '15-Min Express Delivery'}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-muted/60 p-2.5">
              <ShieldCheck size={16} className="text-brand-600 shrink-0" />
              <span>{isAr ? 'طازج ومضمون 100%' : '100% Quality Guaranteed'}</span>
            </div>
          </div>

          {/* Bottom Action Bar: Stepper & Add Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {/* Stepper */}
            <div className="flex h-12 w-full sm:w-auto items-center justify-between sm:justify-start gap-3 rounded-2xl border border-surface-border bg-surface-muted/50 px-4">
              <button
                type="button"
                onClick={() => handleApplyQuantity(quantity - 1)}
                disabled={isOutOfStock || quantity <= 1}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-foreground shadow-xs transition-colors hover:bg-surface-border disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span className="min-w-[2rem] text-center font-black text-foreground text-base">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleApplyQuantity(quantity + 1)}
                disabled={isOutOfStock || quantity >= product.stock_quantity}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-foreground shadow-xs transition-colors hover:bg-surface-border disabled:opacity-40"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart button */}
            <Button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={cn(
                'h-12 flex-1 w-full rounded-2xl text-sm font-bold gap-2 text-white shadow-md transition-all',
                isOutOfStock
                  ? 'bg-surface-border text-foreground-subtle cursor-not-allowed'
                  : justAdded
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-brand-700 hover:bg-brand-800'
              )}
            >
              {justAdded ? (
                <>
                  <Check size={18} />
                  <span>{isAr ? 'تمت الإضافة للسلة' : 'Added to Basket'}</span>
                </>
              ) : inCartQty > 0 ? (
                <>
                  <ShoppingCart size={18} />
                  <span>
                    {isAr
                      ? `في السلة (${inCartQty}) • تحديث`
                      : `In Basket (${inCartQty}) • Update`}
                  </span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>
                    {isAr ? 'إضافة إلى السلة' : 'Add to Basket'} •{' '}
                    {(product.price * quantity).toFixed(2)} {t('common.currency')}
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
