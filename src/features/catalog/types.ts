import type { Category, Product } from '@/types';

export type ProductSortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'name-asc';

export interface ProductFilters {
  categoryId?: string;
  categorySlug?: string;
  subcategoryId?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  isFeatured?: boolean;
  includeInactive?: boolean;
  sortBy?: ProductSortOption;
  limit?: number;
  offset?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface CategoryWithChildren extends Category {
  children?: Category[];
  productCount?: number;
}

export interface CreateProductInput {
  sku: string;
  name_ar: string;
  name_en: string;
  description_ar?: string | null;
  description_en?: string | null;
  category_id: string;
  price: number;
  compare_at_price?: number | null;
  unit_label_ar: string;
  unit_label_en: string;
  stock_quantity: number;
  is_active?: boolean;
  is_featured?: boolean;
  images?: { url: string; alt_ar: string; alt_en: string }[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export interface CreateCategoryInput {
  slug: string;
  name_ar: string;
  name_en: string;
  parent_id?: string | null;
  image_url?: string | null;
  icon?: string | null;
  sort_order?: number;
  is_active?: boolean;
}
