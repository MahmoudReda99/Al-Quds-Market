import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/features/auth/store';

interface FavoritesState {
  favoriteIds: string[];
  isLoading: boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  loadUserFavorites: () => Promise<void>;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isLoading: false,

      isFavorite: (productId: string) => {
        return get().favoriteIds.includes(productId);
      },

      toggleFavorite: async (productId: string) => {
        const user = useAuthStore.getState().user;
        const currentIds = get().favoriteIds;
        const exists = currentIds.includes(productId);

        const nextIds = exists
          ? currentIds.filter((id) => id !== productId)
          : [...currentIds, productId];

        set({ favoriteIds: nextIds });

        // If authenticated, sync with Supabase favorites table
        if (user) {
          try {
            if (exists) {
              await supabase
                .from('favorites')
                .delete()
                .eq('profile_id', user.id)
                .eq('product_id', productId);
            } else {
              await supabase
                .from('favorites')
                .insert({ profile_id: user.id, product_id: productId });
            }
          } catch (err) {
            console.error('[favorites] Supabase sync error:', err);
          }
        }
      },

      loadUserFavorites: async () => {
        const user = useAuthStore.getState().user;
        if (!user) return;

        try {
          set({ isLoading: true });
          const { data, error } = await supabase
            .from('favorites')
            .select('product_id')
            .eq('profile_id', user.id);

          if (!error && data) {
            const dbIds = data.map((row: { product_id: string }) => row.product_id);
            // Merge with local favorites and deduplicate
            const merged = Array.from(new Set([...get().favoriteIds, ...dbIds]));
            set({ favoriteIds: merged });
          }
        } catch (err) {
          console.error('[favorites] Load error:', err);
        } finally {
          set({ isLoading: false });
        }
      },

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'al-quds-favorites',
    }
  )
);
