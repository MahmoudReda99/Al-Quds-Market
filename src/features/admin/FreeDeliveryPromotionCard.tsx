import { useState } from 'react';
import { Sparkles, Check, X, Layers } from 'lucide-react';
import { useDeliveryPromotionStore } from './deliveryPromotionStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface FreeDeliveryPromotionCardProps {
  isAr: boolean;
  onSyncAllAreas?: (newThreshold: number | null) => Promise<void>;
  isSyncing?: boolean;
}

export default function FreeDeliveryPromotionCard({
  isAr,
  onSyncAllAreas,
  isSyncing = false,
}: FreeDeliveryPromotionCardProps) {
  const isEnabled = useDeliveryPromotionStore((s) => s.isEnabled);
  const threshold = useDeliveryPromotionStore((s) => s.threshold);
  const setEnabled = useDeliveryPromotionStore((s) => s.setEnabled);
  const setThreshold = useDeliveryPromotionStore((s) => s.setThreshold);

  const [inputThreshold, setInputThreshold] = useState(String(threshold));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = () => {
    const next = !isEnabled;
    setEnabled(next);
    triggerSaved();
  };

  const handleSaveThreshold = (val: number) => {
    if (isNaN(val) || val < 0) return;
    setThreshold(val);
    setInputThreshold(String(val));
    triggerSaved();
  };

  const triggerSaved = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const presets = [100, 150, 200, 250, 300, 500];

  return (
    <div className="rounded-3xl border-2 border-brand-200 bg-fresh-gradient/40 p-5 sm:p-7 shadow-sm transition-all mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-200/80 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-md">
            <Sparkles size={22} className="text-accent-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-brand-900">
                {isAr ? 'إعدادات عرض التوصيل المجاني للمتجر' : 'Storefront Free Delivery Promotion Settings'}
              </h3>
              {savedSuccess && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white animate-fade-in shadow-xs">
                  <Check size={12} />
                  <span>{isAr ? 'تم الحفظ' : 'Saved'}</span>
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-brand-800/80 leading-relaxed max-w-2xl">
              {isAr
                ? 'التحكم في تفعيل أو إيقاف إشعار التوصيل المجاني (الشريط العائم والسلة)، وتعديل الحد الأدنى لقيمة الطلب.'
                : 'Enable or disable the free delivery promotion notice (floating basket pill & cart drawer) and set the minimum order amount.'}
            </p>
          </div>
        </div>

        {/* Master Enable/Disable Toggle */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 bg-white/80 p-2 rounded-2xl border border-brand-200 shadow-xs">
          <span className="text-xs font-bold text-brand-900 ps-1">
            {isAr ? 'حالة العرض:' : 'Status:'}
          </span>
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all shadow-xs cursor-pointer ${
              isEnabled
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
            }`}
          >
            {isEnabled ? (
              <>
                <Check size={14} className="stroke-[3]" />
                <span>{isAr ? 'مفعل (يظهر للعملاء)' : 'Enabled (Active)'}</span>
              </>
            ) : (
              <>
                <X size={14} className="stroke-[3]" />
                <span>{isAr ? 'معطل (مخفي)' : 'Disabled (Hidden)'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Threshold Value & Presets */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-900 mb-1.5">
              {isAr
                ? 'الحد الأدنى لقيمة الطلب للحصول على التوصيل المجاني (بالجنيه المصري):'
                : 'Minimum Order Value for Free Delivery (EGP):'}
            </label>
            <div className="flex items-center gap-2 max-w-xs">
              <Input
                type="number"
                min="0"
                step="10"
                value={inputThreshold}
                onChange={(e) => setInputThreshold(e.target.value)}
                onBlur={() => handleSaveThreshold(parseFloat(inputThreshold))}
                className="h-10 text-sm font-bold bg-white rounded-xl border-brand-300 focus:border-brand-700 text-center"
              />
              <Button
                type="button"
                size="sm"
                onClick={() => handleSaveThreshold(parseFloat(inputThreshold))}
                className="h-10 bg-brand-700 text-white px-4 font-bold rounded-xl shrink-0"
              >
                {isAr ? 'تطبيق' : 'Apply'}
              </Button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <span className="text-[11px] font-bold text-brand-800/80 block mb-1.5">
              {isAr ? 'قيم سريعة جاهزة:' : 'Quick Presets:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => {
                const isSelected = threshold === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSaveThreshold(p)}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-brand-700 text-white shadow-xs'
                        : 'bg-white text-brand-800 hover:bg-brand-100 border border-brand-200'
                    }`}
                  >
                    {p} {isAr ? 'ج.م' : 'EGP'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sync All Areas Button (Optional Helper) */}
          {onSyncAllAreas && (
            <div className="pt-2">
              <button
                type="button"
                disabled={isSyncing}
                onClick={() => onSyncAllAreas(isEnabled ? threshold : null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-brand-950 underline underline-offset-4 disabled:opacity-50"
              >
                <Layers size={14} />
                <span>
                  {isSyncing
                    ? isAr
                      ? 'جاري التحديث...'
                      : 'Updating...'
                    : isAr
                    ? `تحديث كافة مناطق التوصيل بهذا الحد (${threshold} ج.م)`
                    : `Apply this threshold (${threshold} EGP) to all delivery zones`}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Real-Time Live Preview */}
        <div className="rounded-2xl border border-brand-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700 block mb-2">
            {isAr ? 'معاينة حية للمتجر (Live Storefront Preview):' : 'Live Storefront Preview:'}
          </span>

          {isEnabled ? (
            <div className="space-y-3">
              {/* Preview 1: Basket Pill */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900">
                    {isAr
                      ? `رائع! حصلت على توصيل مجاني لهذا الطلب! (فوق ${threshold} ج.م)`
                      : `Great! You have free delivery on this order! (Over ${threshold} EGP)`}
                  </span>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  {isAr ? 'مفعل' : 'Active'}
                </span>
              </div>

              {/* Preview 2: When amount is needed */}
              <div className="rounded-xl border border-surface-border bg-surface-muted/60 p-3 flex items-center justify-between">
                <span className="text-xs text-foreground-muted">
                  {isAr
                    ? `أضف 50 ج.م للحصول على توصيل مجاني!`
                    : `Add 50 EGP for FREE delivery!`}
                </span>
                <span className="text-[11px] font-bold text-brand-700">
                  {isAr ? `الحد: ${threshold} ج.م` : `Limit: ${threshold} EGP`}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-center">
              <X size={24} className="text-neutral-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-neutral-700">
                {isAr ? 'العرض معطل حالياً' : 'Free Delivery Promotion is Disabled'}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {isAr
                  ? 'لن يظهر أي إشعار أو شريط توصيل مجاني للمستهلكين في واجهة المتجر.'
                  : 'No free delivery notice or progress bar will be displayed to customers.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
