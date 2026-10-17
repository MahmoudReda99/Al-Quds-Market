import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
} from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { localizedText } from '@/lib/utils';
import { resolveProductImage } from '@/lib/productImages';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import { useDeliveryPromotionStore } from '@/features/admin/deliveryPromotionStore';
import { Button } from './Button';

export default function CartDrawer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const itemCount = useCartStore((s) => s.itemCount());

  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Free delivery threshold indicator — controlled by Admin
  const isPromoEnabled = useDeliveryPromotionStore((s) => s.isEnabled);
  const freeDeliveryThreshold = useDeliveryPromotionStore((s) => s.threshold);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = freeDeliveryThreshold > 0
    ? Math.min(100, (subtotal / freeDeliveryThreshold) * 100)
    : 100;

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in" />

        {/* Drawer content sliding from logical end (left in RTL, right in LTR) */}
        <Dialog.Content
          className={`fixed inset-y-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isRtl
              ? 'left-0 data-[state=closed]:-translate-x-full'
              : 'right-0 data-[state=closed]:translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand-700" size={22} />
              <Dialog.Title className="text-lg font-bold text-foreground">
                {t('common.cart')}
              </Dialog.Title>
              {itemCount > 0 && (
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-bold text-brand-800">
                  {itemCount}
                </span>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                className="rounded-xl p-2 text-foreground-subtle hover:bg-surface-subtle hover:text-foreground transition-colors"
                aria-label={t('common.cancel')}
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            {t('cart.emptyDesc')}
          </Dialog.Description>

          {/* Delivery Progress Bar — Only if enabled by admin */}
          {items.length > 0 && isPromoEnabled && (
            <div className="border-b border-surface-border bg-brand-50/60 px-5 py-3">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-900 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck size={15} className="text-brand-700" />
                  {remainingForFreeDelivery === 0
                    ? isRtl
                      ? 'مبروك! حصلت على توصيل مجاني 🎉'
                      : 'Congratulations! You qualified for Free Delivery 🎉'
                    : isRtl
                    ? `أضف بـ ${remainingForFreeDelivery.toFixed(2)} ${t('common.currency')} إضافية للتوصيل المجاني`
                    : `Add ${remainingForFreeDelivery.toFixed(2)} ${t('common.currency')} more for Free Delivery`}
                </span>
                <span>{Math.round(freeDeliveryProgress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-brand-200">
                <div
                  className="h-full rounded-full bg-brand-700 transition-all duration-300"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-surface-muted text-foreground-subtle mb-4">
                  <ShoppingBag size={40} />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t('cart.emptyTitle')}
                </h3>
                <p className="mt-1 text-sm text-foreground-muted max-w-xs">
                  {t('cart.emptyDesc')}
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    closeCart();
                    navigate('/categories');
                  }}
                >
                  {t('cart.continueShopping')}
                </Button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const name = localizedText(product.name_ar, product.name_en, lang);
                const unit = localizedText(product.unit_label_ar, product.unit_label_en, lang);
                const lineTotal = product.price * quantity;

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-3.5 rounded-2xl border border-surface-border bg-white p-3 shadow-card transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-2xl overflow-hidden">
                      <img
                        src={resolveProductImage(product)}
                        alt={name}
                        className="h-full w-full rounded-xl object-contain p-1"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="line-clamp-1 text-sm font-semibold text-foreground">
                        {name}
                      </h4>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {product.price.toFixed(2)} {t('common.currency')} / {unit}
                      </p>
                      <p className="text-sm font-bold text-brand-700 mt-1">
                        {lineTotal.toFixed(2)} {t('common.currency')}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted p-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle transition-colors"
                        aria-label="Decrease quantity"
                      >
                        {quantity === 1 ? (
                          <Trash2 size={13} className="text-red-500" />
                        ) : (
                          <Minus size={13} />
                        )}
                      </button>

                      <span className="w-6 text-center text-xs font-bold text-foreground">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock_quantity}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle disabled:opacity-40 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Quick remove button */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-1 text-foreground-subtle hover:text-red-500 transition-colors"
                      aria-label={t('cart.remove')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="border-t border-surface-border bg-surface-muted/50 p-5 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-foreground-muted">
                  <span>{t('common.subtotal')}</span>
                  <span className="font-semibold text-foreground">
                    {subtotal.toFixed(2)} {t('common.currency')}
                  </span>
                </div>
                <div className="flex justify-between text-foreground-muted">
                  <span>{t('common.deliveryFee')}</span>
                  <span className="font-semibold text-brand-700">
                    {remainingForFreeDelivery === 0
                      ? t('common.free')
                      : isRtl
                      ? 'يُحسب عند الدفع'
                      : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-surface-border pt-2 text-base font-bold text-foreground">
                  <span>{t('common.total')}</span>
                  <span className="text-brand-800">{subtotal.toFixed(2)} {t('common.currency')}</span>
                </div>
              </div>

              {/* Cash On Delivery reminder */}
              <div className="flex items-center gap-2 rounded-xl bg-brand-50 p-2.5 text-xs font-medium text-brand-800">
                <span>💵</span>
                <span>{t('common.cashOnDelivery')}</span>
              </div>

              {/* Checkout button */}
              <Button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 text-base font-bold flex items-center justify-center gap-2"
              >
                <span>{t('cart.proceedToCheckout')}</span>
                <ArrowIcon size={18} />
              </Button>

              {/* View full cart link */}
              <button
                onClick={() => {
                  closeCart();
                  navigate('/cart');
                }}
                className="w-full text-center text-xs font-bold text-brand-700 hover:text-brand-900 transition-colors py-1"
              >
                {t('cart.viewFullCart')}
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
