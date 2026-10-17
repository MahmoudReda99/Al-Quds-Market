import { create } from 'zustand';
import type { Product } from '@/types';

interface ProductQuickViewState {
  product: Product | null;
  isOpen: boolean;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useProductQuickViewStore = create<ProductQuickViewState>((set) => ({
  product: null,
  isOpen: false,
  openQuickView: (product) => set({ product, isOpen: true }),
  closeQuickView: () => set({ isOpen: false, product: null }),
}));
