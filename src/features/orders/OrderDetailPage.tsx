import { useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useOrderQuery, useCancelOrderMutation } from './hooks';
import { getStatusBadge } from './OrdersPage';
import { localizedText, cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import type { OrderStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  Package,
  Calendar,
  MapPin,
  Phone,
  User,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

const ORDER_STEPS: { status: OrderStatus; labelAr: string; labelEn: string; icon: typeof Clock }[] = [
  { status: 'pending', labelAr: 'استلام الطلب', labelEn: 'Order Received', icon: Clock },
  { status: 'confirmed', labelAr: 'تم التأكيد', labelEn: 'Confirmed', icon: CheckCircle2 },
  { status: 'preparing', labelAr: 'جاري التجهيز', labelEn: 'Preparing', icon: Package },
  { status: 'out_for_delivery', labelAr: 'في الطريق للتسليم', labelEn: 'Out for Delivery', icon: Truck },
  { status: 'delivered', labelAr: 'تم التوصيل', labelEn: 'Delivered', icon: CheckCircle2 },
];

function getStepIndex(status: OrderStatus): number {
  switch (status) {
    case 'pending':
      return 0;
    case 'confirmed':
      return 1;
    case 'preparing':
      return 2;
    case 'out_for_delivery':
      return 3;
    case 'delivered':
      return 4;
    case 'cancelled':
      return -1;
  }
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const isNewOrder = Boolean((location.state as { isNewOrder?: boolean })?.isNewOrder);

  const { data: order, isLoading, error } = useOrderQuery(id);
  const { mutateAsync: cancelOrder, isPending: isCancelling } = useCancelOrderMutation();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center animate-fade-in">
        <div className="rounded-3xl border border-surface-border bg-white p-8 shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 mb-4">
            <XCircle size={40} />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {isRtl ? 'الطلب غير موجود' : 'Order Not Found'}
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            {isRtl
              ? 'لم نتمكن من العثور على هذا الطلب أو ليس لديك صلاحية الوصول إليه.'
              : 'Could not find this order or you do not have permission to view it.'}
          </p>
          <Button onClick={() => navigate('/orders')} className="mt-6">
            {t('common.orders')}
          </Button>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(order.status, lang);
  const StatusIcon = statusBadge.icon;
  const currentStep = getStepIndex(order.status);
  const isCancelled = order.status === 'cancelled';
  const canCancel = order.status === 'pending';

  const areaName = order.delivery_area
    ? localizedText(order.delivery_area.name_ar, order.delivery_area.name_en, lang)
    : '';

  const dateStr = new Date(order.created_at).toLocaleDateString(
    lang === 'ar' ? 'ar-EG' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const handleCancelOrder = async () => {
    try {
      setCancelError(null);
      await cancelOrder(order.id);
      setShowCancelConfirm(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setCancelError(msg);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-foreground-muted" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand-700 transition-colors">
          {t('common.home')}
        </Link>
        <span>/</span>
        <Link to="/orders" className="hover:text-brand-700 transition-colors">
          {t('common.orders')}
        </Link>
        <span>/</span>
        <span className="font-semibold text-foreground">#{order.order_number}</span>
      </nav>

      {/* New Order Celebration Banner */}
      {isNewOrder && (
        <div className="mb-8 rounded-3xl border border-brand-200 bg-fresh-gradient p-6 sm:p-8 shadow-card animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
              🎉
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-950">
                {t('checkout.orderPlaced')}
              </h2>
              <p className="mt-1 text-sm text-brand-900 leading-relaxed">
                {isRtl
                  ? `شكراً لتسوقك من القدس ماركت! تم تسجيل طلبك رقم #${order.order_number} بنجاح وسيتواصل معك المندوب قريباً.`
                  : `Thank you for shopping at Al Quds Market! Order #${order.order_number} has been received and our driver will contact you soon.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header Card: Order #, Date, Status */}
      <div className="mb-8 rounded-3xl border border-surface-border bg-white p-6 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-foreground sm:text-3xl">
              {isRtl ? 'طلب رقم' : 'Order #'} {order.order_number}
            </h1>
            <div
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border',
                statusBadge.bg
              )}
            >
              <StatusIcon size={14} />
              <span>{statusBadge.label}</span>
            </div>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-foreground-muted mt-2">
            <Calendar size={13} />
            <span>{dateStr}</span>
          </p>
        </div>

        {/* Cancel Action if still pending */}
        {canCancel && (
          <div>
            {showCancelConfirm ? (
              <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-2.5">
                <span className="text-xs font-bold text-red-800">
                  {isRtl ? 'تأكيد إلغاء الطلب؟' : 'Confirm cancel?'}
                </span>
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isCancelling ? '...' : t('common.confirm')}
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="rounded-xl border border-red-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-colors shadow-sm"
              >
                {isRtl ? 'إلغاء الطلب' : 'Cancel Order'}
              </button>
            )}
          </div>
        )}
      </div>

      {cancelError && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-800">
          {cancelError}
        </div>
      )}

      {/* Status Stepper / Timeline (if not cancelled) */}
      {!isCancelled ? (
        <div className="mb-8 rounded-3xl border border-surface-border bg-white p-6 sm:p-8 shadow-card">
          <h2 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">
            {isRtl ? 'تتبع حالة الطلب' : 'Order Progress Tracker'}
          </h2>

          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-1/2 start-6 end-6 -translate-y-1/2 h-1 bg-surface-muted hidden sm:block" />
            <div
              className="absolute top-1/2 start-6 -translate-y-1/2 h-1 bg-brand-600 hidden sm:block transition-all duration-500"
              style={{
                width: `${(currentStep / (ORDER_STEPS.length - 1)) * 100}%`,
              }}
            />

            {/* Stepper items */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {ORDER_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                const StepIcon = step.icon;

                return (
                  <div key={step.status} className="flex flex-col items-center text-center">
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all shadow-sm',
                        isCurrent
                          ? 'border-brand-600 bg-brand-700 text-white scale-110 shadow-brand-700/30'
                          : isPassed
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-surface-border bg-surface-muted text-foreground-subtle'
                      )}
                    >
                      <StepIcon size={20} />
                    </div>
                    <p
                      className={cn(
                        'mt-2.5 text-xs font-bold leading-tight',
                        isCurrent
                          ? 'text-brand-800'
                          : isPassed
                          ? 'text-foreground'
                          : 'text-foreground-subtle'
                      )}
                    >
                      {isRtl ? step.labelAr : step.labelEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm flex items-center gap-3">
          <AlertTriangle className="text-red-600 shrink-0" size={24} />
          <div>
            <h3 className="text-sm font-bold text-red-950">
              {isRtl ? 'تم إلغاء هذا الطلب' : 'This order has been cancelled'}
            </h3>
            <p className="text-xs text-red-800 mt-0.5">
              {isRtl
                ? 'تم إلغاء الطلب وتمت إعادة المنتجات للمخزون تلقائياً.'
                : 'The order was cancelled and inventory has been automatically restored.'}
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Order Items (7 cols) + Delivery Info & Summary (5 cols) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Order Items */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-surface-border pb-3">
              {isRtl ? 'المنتجات المطلوبة' : 'Ordered Products'} ({order.items.length})
            </h2>

            <div className="divide-y divide-surface-border">
              {order.items.map((item) => {
                const name = localizedText(item.product_name_ar, item.product_name_en, lang);
                const unit = localizedText(item.unit_label_ar, item.unit_label_en, lang);

                return (
                  <div key={item.id} className="flex items-center gap-4 py-3.5 first:pt-0">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface-muted p-1 border border-surface-border text-2xl">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={name}
                          className="h-full w-full rounded-xl object-contain"
                        />
                      ) : (
                        <span>🛒</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground line-clamp-1">
                        {name}
                      </h4>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        ₪{item.unit_price.toFixed(2)} / {unit}
                      </p>
                      <p className="text-xs text-brand-700 font-semibold mt-0.5">
                        {isRtl ? 'الكمية:' : 'Qty:'} {item.quantity}
                      </p>
                    </div>

                    <div className="text-end">
                      <span className="text-sm font-black text-brand-800">
                        ₪{item.line_total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Details & Payment Summary */}
        <div className="space-y-6 lg:col-span-5">
          {/* Delivery & Recipient Card */}
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-surface-border pb-3">
              {isRtl ? 'بيانات التوصيل والمستلم' : 'Delivery Details'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-foreground">
                <User size={15} className="text-brand-700 shrink-0" />
                <span className="font-bold">{order.recipient_name}</span>
              </div>

              <div className="flex items-center gap-2.5 text-foreground">
                <Phone size={15} className="text-brand-700 shrink-0" />
                <span dir="ltr" className="font-semibold">{order.recipient_phone}</span>
              </div>

              <div className="flex items-start gap-2.5 text-foreground">
                <MapPin size={15} className="text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{areaName}</p>
                  <p className="text-foreground-muted mt-0.5 leading-relaxed">
                    {order.address_line}
                  </p>
                </div>
              </div>

              {order.notes && (
                <div className="flex items-start gap-2.5 text-foreground border-t border-surface-border pt-3">
                  <FileText size={15} className="text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{t('checkout.notes')}:</span>
                    <p className="text-foreground-muted mt-0.5 italic">{order.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Breakdown Card */}
          <div className="rounded-3xl border border-surface-border bg-white p-6 shadow-card space-y-4">
            <h3 className="text-base font-bold text-foreground border-b border-surface-border pb-3">
              {t('cart.orderSummary')}
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-foreground-muted">
                <span>{t('common.subtotal')}</span>
                <span className="font-bold text-foreground">₪{order.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-foreground-muted">
                <span>{t('common.deliveryFee')}</span>
                {order.delivery_fee === 0 ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    {t('common.free')}
                  </span>
                ) : (
                  <span className="font-bold text-brand-700">
                    ₪{order.delivery_fee.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex justify-between border-t border-surface-border pt-3 text-lg font-black text-foreground">
                <span>{t('common.total')}</span>
                <span className="text-brand-800">₪{order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Cash On Delivery callout */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-brand-50 p-3.5 border border-brand-200/60">
              <ShieldCheck className="text-brand-700 shrink-0" size={18} />
              <div className="text-xs">
                <p className="font-bold text-brand-950">{t('common.cashOnDelivery')}</p>
                <p className="text-brand-800 text-[11px] mt-0.5">
                  {isRtl
                    ? `المبلغ المطلوب دفعه للمندوب عند الاستلام: ₪${order.total.toFixed(2)}`
                    : `Amount to pay in cash to courier: ₪${order.total.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>

          {/* Back links */}
          <div className="flex flex-col gap-2">
            <Link to="/orders">
              <Button variant="outline" className="w-full py-3 text-xs font-bold flex items-center justify-center gap-1.5">
                <ArrowIcon size={14} />
                <span>{isRtl ? 'العودة لجميع طلباتي' : 'Back to My Orders'}</span>
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="secondary" className="w-full py-3 text-xs font-semibold">
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
