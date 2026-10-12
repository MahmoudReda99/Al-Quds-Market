import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCustomerOrders, fetchOrderById, createOrder, cancelOrder } from './api';
import type { CreateOrderInput } from './types';

export const ORDERS_KEYS = {
  all: ['orders'] as const,
  customerOrders: () => [...ORDERS_KEYS.all, 'customer'] as const,
  order: (id: string) => [...ORDERS_KEYS.all, 'detail', id] as const,
};

export function useCustomerOrdersQuery() {
  return useQuery({
    queryKey: ORDERS_KEYS.customerOrders(),
    queryFn: fetchCustomerOrders,
    staleTime: 1000 * 30, // 30 seconds
  });
}

export function useOrderQuery(orderId: string | undefined) {
  return useQuery({
    queryKey: ORDERS_KEYS.order(orderId || ''),
    queryFn: () => fetchOrderById(orderId!),
    enabled: Boolean(orderId),
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(input),
    onSuccess: (newOrder) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_KEYS.customerOrders() });
      queryClient.setQueryData(ORDERS_KEYS.order(newOrder.id), newOrder);
    },
  });
}

export function useCancelOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ORDERS_KEYS.customerOrders() });
      queryClient.invalidateQueries({ queryKey: ORDERS_KEYS.order(orderId) });
    },
  });
}
