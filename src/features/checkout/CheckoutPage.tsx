import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/features/auth/store';
import { useCartStore } from '@/features/cart/store';
import { useDeliveryAreasQuery } from './hooks';
import { calculateDelivery } from './api';
import { useCreateOrderMutation } from '@/features/orders/hooks';
import { localizedText } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import type { DeliveryArea } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Phone,
  User,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from 'lucide-react';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  // Read initial delivery area and notes passed from /cart if available
  const stateAreaId = (location.state as { deliveryAreaId?: string })?.deliveryAreaId || '';
  const stateNotes = (location.state as { notes?: string })?.notes || '';

  const [recipientName, setRecipientName] = useState(
    profile?.full_name || user?.user_metadata?.full_name || ''
  );
  const [recipientPhone, setRecipientPhone] = useState(
    profile?.phone || user?.user_metadata?.phone || ''
  );
  const [deliveryAreaId, setDeliveryAreaId] = useState(stateAreaId);
  const [addressLine, setAddressLine] = useState('');
  const [notes, setNotes] = useState(stateNotes);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync profile details if loaded after mount
  useEffect(() => {
    if (profile?.full_name && !recipientName) {
      setRecipientName(profile.full_name);
    }
    if (profile?.phone && !recipientPhone) {
      setRecipientPhone(profile.phone);
    }
  }, [profile, recipientName, recipientPhone]);

  // Delivery areas from database
  const { data: deliveryAreas = [], isLoading: isLoadingAreas } = useDeliveryAreasQuery();

  const selectedArea: DeliveryArea | undefined = deliveryAreas.find(
    (a) => a.id === deliveryAreaId
  );

  const deliveryCalc = calculateDelivery(subtotal, selectedArea);

  const { mutateAsync: createOrder, isPending: isPlacingOrder } = useCreateOrderMutation();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!user) {
      openAuthModal('login');
      return;
    }

    if (!recipientName.trim()) {
      setErrorMsg(isRtl ? 'يرجى إدخال اسم المستلم' : 'Recipient name is required');
      return;
    }

    if (!recipientPhone.trim() || recipientPhone.trim().length < 7) {
      setErrorMsg(isRtl ? 'يرجى إدخال رقم هاتف صحيح للتواصل' : 'Valid phone number is required');
      return;
    }

    if (!deliveryAreaId) {
      setErrorMsg(isRtl ? 'يرجى اختيار منطقة التوصيل في القدس' : 'Please select a delivery area');
      return;
    }

    if (!addressLine.trim() || addressLine.trim().length < 5) {
      setErrorMsg(
        isRtl
          ? 'يرجى كتابة العنوان بالتفصيل (الشارع، رقم العمارة، الطابق)'
          : 'Please enter a detailed address'
      );
      return;
    }

    if (items.length === 0) {
      setErrorMsg(isRtl ? 'سلة المشتريات فارغة' : 'Your cart is empty');
      return;
    }

    try {
      const order = await createOrder({
        recipient_name: recipientName.trim(),
        recipient_phone: recipientPhone.trim(),
        delivery_area_id: deliveryAreaId,
        address_line: addressLine.trim(),
        notes: notes.trim() || undefined,
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      });

      // Clear shopping cart on successful placement
      clearCart();

      // Navigate to order detail page with celebration state
      navigate(`/orders/${order.id}`, { state: { isNewOrder: true } });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
    }
  };

  // If cart is empty and not currently submitting
  if (items.length === 0 && !isPlacingOrder) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center animate-fade-in">
        <div className="rounded-3xl border border-surface-border bg-white p-8 shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-3xl mb-4">
            🛒
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {t('cart.emptyTitle')}
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            {t('cart.emptyDesc')}
          </p>
          <Button
            onClick={() => navigate('/categories')}
            className="mt-6 w-full py-3 text-base font-bold"
          >
            {t('cart.continueShopping')}
          </Button>
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
        <Link to="/cart" className="hover:text-brand-700 transition-colors">
          {t('common.cart')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-foreground">{t('checkout.title')}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-foreground sm:text-4xl">
          {t('checkout.title')}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          {isRtl
            ? 'أدخل بيانات التوصيل والدفع نقداً عند استلام طلبك لباب منزلك'
            : 'Enter your delivery details and pay in cash upon doorstep delivery'}
        </p>
      </div>

      {/* Auth Gate Banner (if not logged in) */}
      {!user && (
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <Lock className="text-amber-700 shrink-0" size={24} />
            <div>
              <p className="text-sm font-bold text-amber-950">
                {isRtl ? 'تسجيل الدخول مطلوب لإتمام وتتبع الطلب' : 'Sign in is required to place and track your order'}
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                {isRtl
                  ? 'سجل دخولك بنقرة واحدة وستبقى محتويات سلتك محفوظة بأمان.'
                  : 'Log in with one click. Your cart items are preserved.'}
              </p>
            </div>
          </div>
          <Button
            onClick={() => openAuthModal('login')}
            className="whitespace-nowrap px-6 py-2.5 text-sm font-bold shadow-md shadow-brand-700/20"
          >
            {t('common.login')} / {t('common.signup')}
          </Button>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800 animate-shake">
          <AlertCircle size={20} className="shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Form (7 cols) + Summary (5 cols) */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Delivery Form */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl border border-surface-border bg-white p-6 sm:p-8 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-surface-border pb-3">
              {isRtl ? 'معلومات التوصيل والمستلم' : 'Recipient & Delivery Information'}
            </h2>

            {/* Recipient Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <User size={15} className="text-brand-700" />
                <span>{t('auth.fullName')}</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={isRtl ? 'الاسم الثلاثي أو الثنائي' : 'Full Name'}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              />
            </div>

            {/* Recipient Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Phone size={15} className="text-brand-700" />
                <span>{t('auth.phone')}</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                dir="ltr"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="05X-XXXXXXX"
                className="w-full text-start rounded-2xl border border-surface-border bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              />
              <p className="text-[11px] text-foreground-subtle">
                {isRtl
                  ? 'سيتواصل معك مندوب التوصيل على هذا الرقم لتسليم الطلب'
                  : 'The courier will call this number prior to delivery'}
              </p>
            </div>

            {/* Delivery Area */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <MapPin size={15} className="text-brand-700" />
                <span>{t('checkout.deliveryArea')}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={deliveryAreaId}
                onChange={(e) => setDeliveryAreaId(e.target.value)}
                disabled={isLoadingAreas}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted px-4 py-3 text-sm font-semibold text-foreground focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              >
                <option value="">{t('checkout.selectArea')}</option>
                {deliveryAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {localizedText(area.name_ar, area.name_en, lang)} (₪{area.fee.toFixed(2)}
                    {area.free_delivery_threshold ? ` - مجاني فوق ₪${area.free_delivery_threshold}` : ''})
                  </option>
                ))}
              </select>
            </div>

            {/* Address Line */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <MapPin size={15} className="text-brand-700" />
                <span>{t('checkout.addressLine')}</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder={t('checkout.addressPlaceholder')}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted px-4 py-3 text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <FileText size={15} className="text-brand-700" />
                <span>{t('checkout.notes')}</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('checkout.notesPlaceholder')}
                rows={2}
                className="w-full rounded-2xl border border-surface-border bg-surface-muted p-4 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm resize-none"
              />
            </div>
          </div>

          {/* Payment Method Banner (Cash on Delivery Only) */}
          <div className="rounded-3xl border border-brand-200 bg-fresh-gradient p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💵
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-950">
                {t('common.cashOnDelivery')}
              </h3>
              <p className="mt-1 text-xs text-brand-900 leading-relaxed">
                {isRtl
                  ? 'ادفع نقداً عند استلام طلبك وفحصه أمام المندوب بكل أمان وسهولة.'
                  : 'Pay in cash upon doorstep delivery after inspecting your items.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Placement CTA */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-foreground border-b border-surface-border pb-3">
              {t('cart.orderSummary')} ({items.length} {items.length === 1 ? 'منتج' : 'منتجات'})
            </h2>

            {/* Items Mini List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pe-1 divide-y divide-surface-border">
              {items.map(({ product, quantity }) => {
                const name = localizedText(product.name_ar, product.name_en, lang);
                const lineTotal = product.price * quantity;

                return (
                  <div key={product.id} className="flex items-center gap-3 pt-3 first:pt-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-muted p-1">
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={name}
                          className="h-full w-full rounded-lg object-contain"
                        />
                      ) : (
                        <span>🛒</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground line-clamp-1">{name}</p>
                      <p className="text-[11px] text-foreground-muted">
                        {quantity} × ₪{product.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-brand-800">
                      ₪{lineTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 border-t border-surface-border pt-4 text-sm">
              <div className="flex justify-between text-foreground-muted">
                <span>{t('common.subtotal')}</span>
                <span className="font-bold text-foreground">₪{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-foreground-muted">
                <span>{t('common.deliveryFee')}</span>
                {selectedArea ? (
                  deliveryCalc.isFreeDelivery ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      {t('common.free')}
                    </span>
                  ) : (
                    <span className="font-bold text-brand-700">
                      ₪{deliveryCalc.deliveryFee.toFixed(2)}
                    </span>
                  )
                ) : (
                  <span className="text-xs text-foreground-subtle">
                    {isRtl ? 'حدد منطقة التوصيل' : 'Select delivery area'}
                  </span>
                )}
              </div>

              <div className="flex justify-between border-t border-surface-border pt-3 text-lg font-black text-foreground">
                <span>{t('common.total')}</span>
                <span className="text-brand-800">₪{deliveryCalc.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Free Delivery Notification */}
            {selectedArea && deliveryCalc.isFreeDelivery && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{t('common.freeDelivery')} 🎉</span>
              </div>
            )}

            {/* Guarantee Badge */}
            <div className="flex items-center gap-2 rounded-2xl bg-surface-muted p-3 text-xs text-foreground-muted">
              <ShieldCheck size={18} className="text-brand-700 shrink-0" />
              <span>
                {isRtl
                  ? 'ضمان طازج وجودة 100% مع فحص المنتجات عند الاستلام'
                  : '100% fresh guarantee with on-door inspection'}
              </span>
            </div>

            {/* Confirm Order Button */}
            <Button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 text-base font-bold shadow-lg shadow-brand-700/20 flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>{t('common.loading')}</span>
                </>
              ) : (
                <>
                  <span>{t('checkout.placeOrder')}</span>
                  <ArrowIcon size={18} />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
