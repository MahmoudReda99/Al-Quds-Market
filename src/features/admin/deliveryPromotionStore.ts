import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DeliveryPromotionState {
  isEnabled: boolean;
  threshold: number;
  setEnabled: (enabled: boolean) => void;
  setThreshold: (amount: number) => void;
  updatePromotion: (settings: { isEnabled?: boolean; threshold?: number }) => void;
}

export const useDeliveryPromotionStore = create<DeliveryPromotionState>()(
  persist(
    (set) => ({
      isEnabled: true,
      threshold: 200,

      setEnabled: (isEnabled) => set({ isEnabled }),
      setThreshold: (threshold) => set({ threshold: Math.max(0, Number(threshold) || 0) }),
      updatePromotion: (settings) =>
        set((state) => ({
          isEnabled: settings.isEnabled !== undefined ? settings.isEnabled : state.isEnabled,
          threshold:
            settings.threshold !== undefined
              ? Math.max(0, Number(settings.threshold) || 0)
              : state.threshold,
        })),
    }),
    {
      name: 'al-quds-free-delivery-promotion',
    }
  )
);
