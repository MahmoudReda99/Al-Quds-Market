import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from './store';
import { useDeliveryAreasQuery } from '@/features/checkout/hooks';
import { calculateDelivery } from '@/features/checkout/api';
import { localizedText } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import type { DeliveryArea } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowRight,
  ArrowLeft,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());
  const itemCount = useCartStore((s) => s.itemCount());

  // Delivery areas from live Supabase
  const { data: deliveryAreas = [], isLoading: isLoadingAreas } = useDeliveryAreasQuery();

  // Selected delivery area for dynamic fee estimation
  const [selectedAreaId, setSelectedAreaId] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const selectedArea: DeliveryArea | undefined = deliveryAreas.find(
    (area) => area.id === selectedAreaId
  );

  const deliveryCalc = calculateDelivery(subtotal, selectedArea);

  // Free delivery progress calculation
  const freeThreshold = deliveryCalc.freeDeliveryThreshold ?? 100;
  const freeProgress = Math.min(100, (subtotal / freeThreshold) * 100);

  const handleProceedToCheckout = () => {
    // Navigate to checkout and pass selected area and notes in state if needed
    navigate('/checkout', {
      state: {
        deliveryAreaId: selectedAreaId || undefined,
        notes: orderNotes.trim() || undefined,
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
        <div className="mx-auto max-w-lg rounded-3xl border border-surface-border bg-white p-8 sm:p-12 text-center shadow-card">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 mb-6">
            <ShoppingBag size={48} />
          </div>
          <h1 className="text-2xl font-black text-foreground sm:text-3xl">
            {t('cart.emptyTitle')}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            {t('cart.emptyDesc')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => navigate('/categories')}
              className="py-3 px-6 text-base font-bold shadow-md shadow-brand-700/20"
            >
              {t('cart.continueShopping')}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="py-3 px-6 text-base font-semibold"
            >
              {t('common.home')}
            </Button>
          </div>

          {/* Popular departments quick links */}
          <div className="mt-10 border-t border-surface-border pt-6 text-start">
            <p className="text-xs font-bold text-foreground-muted mb-3 uppercase tracking-wider">
              {isRtl ? 'أقسام مقترحة للتسوق:' : 'Suggested Departments:'}
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/categories"
                className="rounded-xl border border-surface-border bg-surface-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-300 hover:text-brand-700 transition-colors"
              >
                🥦 {t('nav.freshProduce')}
              </Link>
              <Link
                to="/categories"
                className="rounded-xl border border-surface-border bg-surface-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-300 hover:text-brand-700 transition-colors"
              >
                🥛 {t('nav.dairy')}
              </Link>
              <Link
                to="/categories"
                className="rounded-xl border border-surface-border bg-surface-muted px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand-300 hover:text-brand-700 transition-colors"
              >
                🍞 {t('nav.bakery')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-700 transition-colors">
          {t('common.home')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-foreground">{t('common.cart')}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground sm:text-4xl">
            {t('common.cart')}
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {isRtl
              ? `لديك ${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'} في سلة المشتريات`
              : `You have ${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {/* Clear cart action */}
        {showClearConfirm ? (
          <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-2">
            <span className="text-xs font-bold text-red-800">
              {t('cart.clearCartConfirm')}
            </span>
            <button
              onClick={() => {
                clearCart();
                setShowClearConfirm(false);
              }}
              className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
            >
              {t('common.confirm')}
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="rounded-xl border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-foreground-subtle hover:text-red-600 transition-colors"
          >
            <Trash2 size={15} />
            <span>{t('cart.clearCart')}</span>
          </button>
        )}
      </div>

      {/* Free Delivery Banner */}
      <div className="mb-8 rounded-3xl border border-brand-200 bg-fresh-gradient p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm font-bold text-brand-950 mb-2">
          <span className="flex items-center gap-2">
            <Truck className="text-brand-700" size={18} />
            {deliveryCalc.isFreeDelivery ? (
              <span className="flex items-center gap-1 text-brand-800">
                <CheckCircle2 size={16} className="text-brand-600" />
                {isRtl
                  ? 'مبروك! طلبك مؤهل للتوصيل المجاني بالكامل 🎉'
                  : 'Congratulations! Your order qualifies for Free Delivery 🎉'}
              </span>
            ) : (
              <span>
                {isRtl
                  ? `أضف بقيمة ₪${deliveryCalc.amountNeededForFreeDelivery.toFixed(2)} إضافية للحصول على توصيل مجاني`
                  : `Add ₪${deliveryCalc.amountNeededForFreeDelivery.toFixed(2)} more to qualify for Free Delivery`}
              </span>
            )}
          </span>
          <span className="text-brand-800">{Math.round(freeProgress)}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-200/80">
          <div
            className="h-full rounded-full bg-brand-700 transition-all duration-300"
            style={{ width: `${freeProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Items List + Summary Column */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Cart Items (8 cols) */}
        <div className="space-y-4 lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-surface-border bg-white shadow-card">
            <div className="divide-y divide-surface-border">
              {items.map(({ product, quantity }) => {
                const name = localizedText(product.name_ar, product.name_en, lang);
                const unit = localizedText(product.unit_label_ar, product.unit_label_en, lang);
                const lineTotal = product.price * quantity;
                const isMax = quantity >= product.stock_quantity;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 hover:bg-surface-subtle/40 transition-colors"
                  >
                    {/* Item Thumbnail & Name */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-surface-muted p-2 hover:scale-105 transition-transform"
                      >
                        {product.images?.[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={name}
                            className="h-full w-full rounded-xl object-contain"
                          />
                        ) : (
                          <span className="text-3xl">🛒</span>
                        )}
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-base font-bold text-foreground hover:text-brand-700 transition-colors line-clamp-1"
                        >
                          {name}
                        </Link>
                        <p className="mt-0.5 text-xs text-foreground-muted">
                          ₪{product.price.toFixed(2)} / {unit}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-foreground-subtle">
                            {t('product.sku')}: {product.sku}
                          </span>
                          {isMax && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                              <AlertCircle size={10} />
                              {t('cart.maxStockReached')} ({product.stock_quantity})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stepper + Total Price + Remove */}
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-border">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-muted p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle transition-colors"
                          aria-label="Decrease quantity"
                        >
                          {quantity === 1 ? (
                            <Trash2 size={14} className="text-red-500" />
                          ) : (
                            <Minus size={14} />
                          )}
                        </button>

                        <span className="w-8 text-center text-sm font-bold text-foreground">
                          {quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={isMax}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-foreground shadow-sm hover:bg-surface-subtle disabled:opacity-40 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Total */}
                      <div className="text-end min-w-[80px]">
                        <p className="text-base font-extrabold text-brand-800">
                          ₪{lineTotal.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="rounded-lg p-2 text-foreground-subtle hover:bg-red-50 hover:text-red-600 transition-colors"
                        aria-label={t('cart.remove')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue Shopping Link */}
          <div className="flex items-center justify-between pt-2">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
            >
              <ArrowIcon size={16} />
              <span>{t('cart.continueShopping')}</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary & Calculator (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-surface-border pb-3">
              {t('cart.orderSummary')}
            </h2>

            {/* Delivery Area Selector (Dynamic Calculator) */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <MapPin size={14} className="text-brand-700" />
                <span>{t('checkout.deliveryArea')}</span>
              </label>

              <select
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                disabled={isLoadingAreas}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted px-3.5 py-3 text-sm font-medium text-foreground focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              >
                <option value="">{t('checkout.selectArea')}</option>
                {deliveryAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {localizedText(area.name_ar, area.name_en, lang)} (₪
                    {area.fee.toFixed(2)}
                    {area.free_delivery_threshold
                      ? ` - مجاني فوق ₪${area.free_delivery_threshold}`
                      : ''}
                    )
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-foreground-subtle">
                {t('cart.selectDeliveryArea')}
              </p>
            </div>

            {/* Delivery driver note */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <FileText size={14} className="text-brand-700" />
                <span>{t('checkout.notes')}</span>
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder={t('checkout.notesPlaceholder')}
                rows={2}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted p-3 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm resize-none"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 border-t border-surface-border pt-4 text-sm">
              <div className="flex justify-between text-foreground-muted">
                <span>{t('common.subtotal')}</span>
                <span className="font-bold text-foreground">
                  ₪{subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-foreground-muted">
                <span>{t('common.deliveryFee')}</span>
                {selectedArea ? (
                  deliveryCalc.isFreeDelivery ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                      {t('common.free')}
                    </span>
                  ) : (
                    <span className="font-bold text-brand-700">
                      ₪{deliveryCalc.deliveryFee.toFixed(2)}
                    </span>
                  )
                ) : (
                  <span className="text-xs text-foreground-subtle">
                    {isRtl ? 'اختر المنطقة أعلاه' : 'Select area above'}
                  </span>
                )}
              </div>

              <div className="flex justify-between border-t border-surface-border pt-3 text-lg font-black text-foreground">
                <span>{t('common.total')}</span>
                <span className="text-brand-800">
                  ₪{deliveryCalc.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Cash on Delivery Notice */}
            <div className="flex items-center gap-3 rounded-2xl bg-brand-50/80 p-3.5 border border-brand-200/60">
              <ShieldCheck className="text-brand-700 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold text-brand-950">
                  {t('common.cashOnDelivery')}
                </p>
                <p className="text-[11px] text-brand-800 mt-0.5">
                  {isRtl
                    ? 'تدفع عند باب المنزل عند استلام مشترياتك بعد التحقق منها'
                    : 'Pay in cash at your doorstep upon checking your groceries'}
                </p>
              </div>
            </div>

            {/* Checkout CTA */}
            <Button
              onClick={handleProceedToCheckout}
              className="w-full py-4 text-base font-bold shadow-lg shadow-brand-700/20 flex items-center justify-center gap-2"
            >
              <span>{t('cart.proceedToCheckout')}</span>
              <ArrowIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
