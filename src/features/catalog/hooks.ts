import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchCategoryBySlug,
  fetchProducts,
  fetchProductById,
  fetchRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './api';
import type { ProductFilters, CreateProductInput, UpdateProductInput } from './types';

export const CATALOG_KEYS = {
  all: ['catalog'] as const,
  categories: () => [...CATALOG_KEYS.all, 'categories'] as const,
  category: (slug: string) => [...CATALOG_KEYS.all, 'category', slug] as const,
  products: (filters?: ProductFilters) => [...CATALOG_KEYS.all, 'products', filters] as const,
  product: (id: string) => [...CATALOG_KEYS.all, 'product', id] as const,
  related: (catId: string, prodId: string) => [...CATALOG_KEYS.all, 'related', catId, prodId] as const,
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: CATALOG_KEYS.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCategoryQuery(slug: string | undefined) {
  return useQuery({
    queryKey: CATALOG_KEYS.category(slug || ''),
    queryFn: () => fetchCategoryBySlug(slug!),
    enabled: Boolean(slug),
  });
}

export function useProductsQuery(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: CATALOG_KEYS.products(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useProductQuery(id: string | undefined) {
  return useQuery({
    queryKey: CATALOG_KEYS.product(id || ''),
    queryFn: () => fetchProductById(id!),
    enabled: Boolean(id),
  });
}

export function useRelatedProductsQuery(categoryId: string | undefined, currentProductId: string | undefined) {
  return useQuery({
    queryKey: CATALOG_KEYS.related(categoryId || '', currentProductId || ''),
    queryFn: () => fetchRelatedProducts(categoryId!, currentProductId!),
    enabled: Boolean(categoryId && currentProductId),
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATALOG_KEYS.all });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProductInput) => updateProduct(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CATALOG_KEYS.all });
      queryClient.invalidateQueries({ queryKey: CATALOG_KEYS.product(data.id) });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATALOG_KEYS.all });
    },
  });
}
