import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCustomerOrdersQuery } from './hooks';
import { localizedText, cn } from '@/lib/utils';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';
import type { OrderStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  Package,
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
} from 'lucide-react';

export function getStatusBadge(status: OrderStatus, lang: SupportedLanguage) {
  const isRtl = lang === 'ar';
  switch (status) {
    case 'pending':
      return {
        label: isRtl ? 'قيد المراجعة' : 'Pending',
        bg: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Clock,
      };
    case 'confirmed':
      return {
        label: isRtl ? 'تم التأكيد' : 'Confirmed',
        bg: 'bg-sky-100 text-sky-800 border-sky-200',
        icon: CheckCircle2,
      };
    case 'preparing':
      return {
        label: isRtl ? 'جاري التجهيز' : 'Preparing',
        bg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: Package,
      };
    case 'out_for_delivery':
      return {
        label: isRtl ? 'في الطريق إليك' : 'Out for Delivery',
        bg: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: Truck,
      };
    case 'delivered':
      return {
        label: isRtl ? 'تم التوصيل' : 'Delivered',
        bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        icon: CheckCircle2,
      };
    case 'cancelled':
      return {
        label: isRtl ? 'ملغي' : 'Cancelled',
        bg: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
      };
  }
}

export default function OrdersPage() {
  const { t } = useTranslation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const { data: orders = [], isLoading } = useCustomerOrdersQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center animate-fade-in">
        <div className="rounded-3xl border border-surface-border bg-white p-8 sm:p-12 shadow-card">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 mb-4">
            <Package size={40} />
          </div>
          <h2 className="text-2xl font-black text-foreground">
            {isRtl ? 'لا توجد طلبات سابقة' : 'No previous orders'}
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            {isRtl
              ? 'لم تقم بإنشاء أي طلبات حتى الآن. استكشف أقسام المتجر وابدأ التسوق!'
              : 'You have not placed any orders yet. Explore our grocery catalog!'}
          </p>
          <Link to="/categories" className="mt-6 inline-block w-full">
            <Button className="w-full py-3.5 text-base font-bold shadow-md shadow-brand-700/20">
              {t('home.shopNow')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground sm:text-4xl">
            {t('common.orders')}
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {isRtl
              ? `لديك ${orders.length} ${orders.length === 1 ? 'طلب' : 'طلبات'} سابقة`
              : `You have ${orders.length} past ${orders.length === 1 ? 'order' : 'orders'}`}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const statusBadge = getStatusBadge(order.status, lang);
          const StatusIcon = statusBadge.icon;
          const areaName = order.delivery_area
            ? localizedText(order.delivery_area.name_ar, order.delivery_area.name_en, lang)
            : '';
          const dateStr = new Date(order.created_at).toLocaleDateString(
            lang === 'ar' ? 'ar-EG' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }
          );

          return (
            <div
              key={order.id}
              className="rounded-3xl border border-surface-border bg-white p-5 sm:p-6 shadow-card hover:border-brand-200 transition-all"
            >
              {/* Top row: Order Number + Status Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-muted text-brand-700 font-extrabold text-sm">
                    #{order.order_number}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {isRtl ? 'طلب رقم' : 'Order #'} {order.order_number}
                    </h3>
                    <p className="flex items-center gap-1.5 text-xs text-foreground-subtle mt-0.5">
                      <Calendar size={12} />
                      <span>{dateStr}</span>
                    </p>
                  </div>
                </div>

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

              {/* Middle row: Items Thumbnails + Info */}
              <div className="my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                  {order.items.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface-muted p-1 border border-surface-border text-lg"
                      title={localizedText(item.product_name_ar, item.product_name_en, lang)}
                    >
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt=""
                          className="h-full w-full rounded-lg object-contain"
                        />
                      ) : (
                        <span>🛒</span>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-xs font-bold text-foreground-subtle border border-surface-border">
                      +{order.items.length - 4}
                    </span>
                  )}
                </div>

                {/* Delivery Area & Address */}
                <div className="text-xs text-foreground-muted space-y-1">
                  <p className="flex items-center gap-1 font-semibold text-foreground">
                    <MapPin size={13} className="text-brand-700 shrink-0" />
                    <span>{areaName}</span>
                  </p>
                  <p className="line-clamp-1 max-w-xs">{order.address_line}</p>
                </div>

                {/* Total */}
                <div className="text-start sm:text-end">
                  <p className="text-xs text-foreground-muted">{t('common.total')}</p>
                  <p className="text-lg font-black text-brand-800">
                    ₪{order.total.toFixed(2)}
                  </p>
                  <span className="text-[11px] font-semibold text-brand-600">
                    {t('common.cashOnDelivery')}
                  </span>
                </div>
              </div>

              {/* Footer row: Actions */}
              <div className="flex items-center justify-between border-t border-surface-border pt-4">
                <span className="text-xs text-foreground-subtle">
                  {order.items.reduce((sum, i) => sum + i.quantity, 0)}{' '}
                  {isRtl ? 'قطع في الطلب' : 'items'}
                </span>

                <Link
                  to={`/orders/${order.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-surface-muted px-4 py-2 text-xs font-bold text-foreground hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  <span>{isRtl ? 'عرض تفاصيل الطلب والتتبع' : 'View Details & Track'}</span>
                  <ArrowIcon size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
