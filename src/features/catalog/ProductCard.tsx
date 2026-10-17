import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShoppingCart, Check, Pencil } from 'lucide-react';
import type { Product } from '@/types';
import { localizedText, cn } from '@/lib/utils';
import { resolveProductImage } from '@/lib/productImages';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { useCartStore } from '@/features/cart/store';
import { useFavoritesStore } from '@/features/favorites/store';
import { useAuthStore } from '@/features/auth/store';
import { useState } from 'react';

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
  const openCart = useCartStore((s) => s.openCart);
  const cartItems = useCartStore((s) => s.items);
  const inCart = cartItems.find((i) => i.product.id === product.id);

  const isFav = useFavoritesStore((s) => s.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const hasDiscount = product.compare_at_price !== null && product.compare_at_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const isOutOfStock = product.stock_quantity <= 0;
  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= 5;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addItem(product, 1);
    openCart();
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id);
  };

  const imageUrl = resolveProductImage(product);

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-2xl border border-surface-border bg-white shadow-card card-hover overflow-hidden transition-all',
        className
      )}
    >
      {/* Top badges & Favorite */}
      <div className="absolute inset-x-2 top-2 z-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {!product.is_active && (
            <span className="rounded-lg bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              معطل | Inactive
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-lg bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              -{discountPct}%
            </span>
          )}
          {isLowStock && (
            <span className="rounded-lg bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {t('product.lowStock')}
            </span>
          )}
        </div>

        <button
          onClick={handleToggleFavorite}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95',
            isFav ? 'text-red-500' : 'text-foreground-subtle hover:text-red-500'
          )}
          aria-label="Toggle favorite"
        >
          <Heart size={16} className={isFav ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Product Image Area: Shorter aspect-[4/3] ratio for compact card height */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-muted"
      >
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
      </Link>

      {/* Info: Compact spacing */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-1 sm:line-clamp-2 text-xs sm:text-sm font-semibold text-foreground leading-snug hover:text-brand-700 transition-colors"
        >
          {name}
        </Link>

        <p className="mt-0.5 text-[11px] text-foreground-muted">
          {unit}
        </p>

        {/* Price & Action Button (Edit for Admin, Add to Cart for Customer) */}
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
              className="flex h-8 items-center gap-1 px-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-sm transition-all hover:bg-amber-600 active:scale-95"
              aria-label="تعديل المنتج | Edit Product"
              title="تعديل المنتج | Edit Product"
            >
              <Pencil size={12} />
              <span>تعديل</span>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
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
                <Check size={15} />
              ) : inCart ? (
                <span className="text-xs font-bold">{inCart.quantity}</span>
              ) : (
                <ShoppingCart size={15} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
