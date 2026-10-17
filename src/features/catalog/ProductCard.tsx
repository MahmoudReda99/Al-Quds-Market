import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Plus, Minus, Info, Pencil, Check } from 'lucide-react';
import type { Product } from '@/types';
import { localizedText, cn } from '@/lib/utils';
import { resolveProductImage } from '@/lib/productImages';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { useCartStore } from '@/features/cart/store';
import { useFavoritesStore } from '@/features/favorites/store';
import { useAuthStore } from '@/features/auth/store';
import { useProductQuickViewStore } from './quickViewStore';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const name = localizedText(product.name_ar, product.name_en, lang);
  const unit = localizedText(product.unit_label_ar, product.unit_label_en, lang);

  const profile = useAuthStore((s) => s.profile);
  const isAdmin = profile?.role === 'admin';

  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.find((i) => i.product.id === product.id);

  const isFav = useFavoritesStore((s) => s.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const openQuickView = useProductQuickViewStore((s) => s.openQuickView);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const hasDiscount = product.compare_at_price !== null && product.compare_at_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    if (inCart) {
      updateQuantity(product.id, inCart.quantity + 1);
    } else {
      addItem(product, 1);
    }
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) return;

    if (inCart.quantity <= 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, inCart.quantity - 1);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const imageUrl = resolveProductImage(product);

  return (
    <div
      onClick={handleIncrement}
      className={cn(
        'group relative flex flex-col rounded-2xl border border-surface-border bg-white shadow-card card-hover overflow-hidden transition-all select-none',
        isOutOfStock ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:border-brand-500/50 hover:shadow-card-hover',
        className
      )}
    >
      {/* Top Bar: Minus button (when in cart), Badges, and Quantity Badge */}
      <div className="absolute inset-x-2 top-2 z-10 flex items-center justify-between pointer-events-none">
        {/* Start corner: Minus button if inCart OR Discount/Stock badge */}
        <div className="flex items-center gap-1 pointer-events-auto">
          {inCart && inCart.quantity > 0 ? (
            <button
              type="button"
              onClick={handleDecrement}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 active:scale-90 transition-transform"
              aria-label="Decrease quantity"
              title="Decrease quantity"
            >
              <Minus size={14} className="stroke-[3]" />
            </button>
          ) : hasDiscount ? (
            <span className="rounded-lg bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              -{discountPct}%
            </span>
          ) : !product.is_active ? (
            <span className="rounded-lg bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              معطل
            </span>
          ) : isLowStock ? (
            <span className="rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {t('product.lowStock')}
            </span>
          ) : null}
        </div>

        {/* End corner: Green quantity badge if inCart, plus favorite heart */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {inCart && inCart.quantity > 0 && (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white shadow-md">
              {inCart.quantity}
            </span>
          )}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95',
              isFav ? 'text-red-500' : 'text-foreground-subtle hover:text-red-500'
            )}
            aria-label="Toggle favorite"
          >
            <Heart size={14} className={isFav ? 'fill-red-500' : ''} />
          </button>
        </div>
      </div>

      {/* Product Image Area */}
      <div className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl" aria-hidden="true">
            🛒
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-xl bg-foreground/80 px-2.5 py-1 text-[11px] font-bold text-white">
              {t('common.outOfStock')}
            </span>
          </div>
        )}

        {/* Product Details Icon Button with hover tooltip */}
        <div className="group/details absolute bottom-2 end-2 z-10 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground-muted shadow-sm hover:bg-brand-700 hover:text-white hover:scale-110 active:scale-95 transition-all"
            aria-label={lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
            title={lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
          >
            <Info size={14} className="stroke-[2.2]" />
          </button>

          {/* Floating Tooltip */}
          <div className="pointer-events-none absolute bottom-full end-0 mb-1.5 hidden group-hover/details:flex flex-col items-center whitespace-nowrap rounded-lg bg-foreground/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xl z-30 animate-fade-in">
            <span>{lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</span>
            <div className="absolute -bottom-1 end-2.5 h-2 w-2 rotate-45 bg-foreground/95" />
          </div>
        </div>
      </div>

      {/* Info: Compact spacing */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-foreground leading-snug group-hover:text-brand-700 transition-colors min-h-[2.25rem]">
          {name}
        </h3>

        <p className="mt-0.5 text-[11px] text-foreground-muted">
          {unit || '\u00A0'}
        </p>

        {/* Price & Action Button (Edit for Admin, Plus / Cart for Customer) */}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-extrabold text-foreground">
                {product.price.toFixed(2)} {t('common.currency')}
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-foreground-subtle line-through">
                  {product.compare_at_price!.toFixed(2)} {t('common.currency')}
                </span>
              )}
            </div>
          </div>

          {isAdmin ? (
            <Link
              to={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex h-8 items-center gap-1 px-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-sm transition-all hover:bg-amber-600 active:scale-95"
              aria-label="تعديل المنتج | Edit Product"
              title="تعديل المنتج | Edit Product"
            >
              <Pencil size={12} />
              <span>تعديل</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleIncrement}
              disabled={isOutOfStock}
              className={cn(
                'flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-xl shadow-sm transition-all active:scale-90',
                isOutOfStock
                  ? 'bg-surface-border text-foreground-subtle cursor-not-allowed'
                  : isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : inCart
                  ? 'bg-brand-700 text-white hover:bg-brand-800'
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-700 hover:text-white'
              )}
              aria-label={t('common.addToCart')}
              title={inCart ? `${inCart.quantity} in cart` : t('common.addToCart')}
            >
              {isAddedRecently ? (
                <Check size={16} />
              ) : inCart ? (
                <Plus size={16} className="stroke-[2.5]" />
              ) : (
                <Plus size={16} className="stroke-[2.5]" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
