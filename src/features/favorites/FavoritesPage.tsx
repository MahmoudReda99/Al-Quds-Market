import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavoritesStore } from './store';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';
import ProductCard from '@/features/catalog/ProductCard';
import { Button } from '@/components/ui/Button';
import { Heart, Loader2 } from 'lucide-react';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);
  const loadUserFavorites = useFavoritesStore((s) => s.loadUserFavorites);

  useEffect(() => {
    loadUserFavorites();
  }, [loadUserFavorites]);

  // Fetch favorite products by their IDs
  const { data: favoriteProducts = [], isLoading } = useQuery({
    queryKey: ['favorites', favoriteIds],
    queryFn: async (): Promise<Product[]> => {
      if (favoriteIds.length === 0) return [];

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', favoriteIds)
        .eq('is_active', true);

      if (error || !data) return [];
      return data as unknown as Product[];
    },
    enabled: favoriteIds.length > 0,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8 border-b border-surface-border pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Heart size={24} className="fill-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              {t('common.favorites')}
            </h1>
            <p className="mt-1 text-sm text-foreground-muted">
              {favoriteIds.length} {t('common.items')}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : favoriteIds.length === 0 || favoriteProducts.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl border border-dashed border-surface-border bg-white p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 text-3xl mb-4">
            <Heart size={32} />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            قائمة المفضلة فارغة
          </h3>
          <p className="mt-1 text-sm text-foreground-muted max-w-sm">
            احفظ منتجاتك المفضلة بالنقر على أيقونة القلب لتصل إليها بسرعة في أي وقت.
          </p>
          <Link to="/categories" className="mt-6">
            <Button>{t('home.shopCategories')}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
