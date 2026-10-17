import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { useAuthStore } from '@/features/auth/store';
import { useDeliveryPromotionStore } from '@/features/admin/deliveryPromotionStore';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

export default function FloatingBasketBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const lang = (i18n.language as SupportedLanguage) ?? 'ar';
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const profile = useAuthStore((s) => s.profile);
  const isAdmin = profile?.role === 'admin';

  const itemCount = useCartStore((s) => s.itemCount());
  const subtotal = useCartStore((s) => s.subtotal());
  const openCart = useCartStore((s) => s.openCart);

  const isPromoEnabled = useDeliveryPromotionStore((s) => s.isEnabled);
  const freeDeliveryThreshold = useDeliveryPromotionStore((s) => s.threshold);

  // Don't show for admin or on checkout / cart page or when empty
  if (isAdmin || itemCount === 0) return null;
  if (location.pathname === '/cart' || location.pathname === '/checkout') return null;

  const qualifiesForFreeDelivery = subtotal >= freeDeliveryThreshold;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <aside
      aria-label={isAr ? 'شريط السلة العائم' : 'Floating Basket Bar'}
      className="fixed bottom-5 end-4 sm:end-8 z-40 flex flex-col items-end gap-1.5 animate-slide-up pointer-events-auto"
    >
      {/* Free Delivery Pill Notice — Controlled by Admin (Toggle & Threshold) */}
      {isPromoEnabled && (
        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-foreground shadow-md border border-surface-border backdrop-blur-sm">
          <Sparkles size={13} className="text-emerald-600 shrink-0" />
          <span>
            {qualifiesForFreeDelivery
              ? isAr
                ? 'رائع! حصلت على توصيل مجاني لهذا الطلب!'
                : 'Great! You have free delivery on this order!'
              : isAr
              ? `أضف ${remainingForFree.toFixed(0)} ج.م للحصول على توصيل مجاني!`
              : `Add ${remainingForFree.toFixed(0)} EGP for FREE delivery!`}
          </span>
        </div>
      )}

      {/* Main InstaShop-Style Floating Basket Button */}
      <button
        type="button"
        onClick={openCart}
        className="group flex items-center justify-between gap-3 sm:gap-5 rounded-2xl sm:rounded-full bg-emerald-600 px-4 sm:px-6 py-3 text-white shadow-xl hover:bg-emerald-700 active:scale-95 transition-all duration-200 border-2 border-white/20 min-w-[240px] sm:min-w-[280px]"
        aria-label={`${t('common.cart')} - ${itemCount} ${t('common.items')}`}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-xs font-black text-white">
            {itemCount}
          </span>
          <span className="text-sm font-black tracking-wide uppercase">
            {isAr ? 'عرض السلة' : 'VIEW BASKET'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-black text-sm">
          <span>
            ({subtotal.toFixed(2)} {t('common.currency')})
          </span>
          <ArrowIcon size={16} className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </div>
      </button>
    </aside>
  );
}
