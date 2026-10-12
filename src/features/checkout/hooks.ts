import { useQuery } from '@tanstack/react-query';
import { fetchDeliveryAreas } from './api';

export const CHECKOUT_KEYS = {
  all: ['checkout'] as const,
  deliveryAreas: () => [...CHECKOUT_KEYS.all, 'delivery-areas'] as const,
};

export function useDeliveryAreasQuery() {
  return useQuery({
    queryKey: CHECKOUT_KEYS.deliveryAreas(),
    queryFn: fetchDeliveryAreas,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}
