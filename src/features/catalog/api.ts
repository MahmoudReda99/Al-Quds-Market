import { supabase } from '@/lib/supabase';
import type { Category, Product, ProductImage } from '@/types';
import type {
  ProductFilters,
  ProductsResponse,
  CategoryWithChildren,
  CreateProductInput,
  UpdateProductInput,
  CreateCategoryInput,
  UpdateCategoryInput,
} from './types';

// Helper to map DB row to Product domain type
function mapProductRow(row: Record<string, unknown>): Product {
  let images: ProductImage[] = [];
  if (Array.isArray(row.images)) {
    images = row.images.map((img: unknown) => {
      if (typeof img === 'string') {
        return { url: img, alt_ar: String(row.name_ar || ''), alt_en: String(row.name_en || '') };
      }
      const obj = img as Record<string, string>;
      return {
        url: obj?.url || '',
        alt_ar: obj?.alt_ar || String(row.name_ar || ''),
        alt_en: obj?.alt_en || String(row.name_en || ''),
      };
    });
  }

  return {
    id: String(row.id),
    sku: String(row.sku),
    name_ar: String(row.name_ar),
    name_en: String(row.name_en),
    description_ar: row.description_ar ? String(row.description_ar) : null,
    description_en: row.description_en ? String(row.description_en) : null,
    category_id: String(row.category_id),
    price: Number(row.price),
    compare_at_price: row.compare_at_price !== null && row.compare_at_price !== undefined ? Number(row.compare_at_price) : null,
    unit_label_ar: String(row.unit_label_ar || 'قطعة'),
    unit_label_en: String(row.unit_label_en || 'piece'),
    stock_quantity: Number(row.stock_quantity || 0),
    is_active: Boolean(row.is_active),
    is_featured: Boolean(row.is_featured),
    images,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

// ---------------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------------
export async function fetchCategories(): Promise<CategoryWithChildren[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[catalog] fetchCategories error:', error);
    throw error;
  }

  const allCategories = (data || []) as unknown as Category[];
  const parentCategories: CategoryWithChildren[] = allCategories.filter((c) => !c.parent_id);

  // Attach children subcategories to parents
  return parentCategories.map((parent) => ({
    ...parent,
    children: allCategories.filter((c) => c.parent_id === parent.id),
  }));
}

export async function fetchCategoryBySlug(slug: string): Promise<CategoryWithChildren | null> {
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !category) {
    return null;
  }

  // Fetch children if top-level
  const { data: children } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', category.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return {
    ...(category as unknown as Category),
    children: (children || []) as unknown as Category[],
  };
}

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------
export async function fetchProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  if (!filters.includeInactive) {
    query = query.eq('is_active', true);
  }

  // Category filter: if slug provided, lookup category ID first
  if (filters.categorySlug) {
    const category = await fetchCategoryBySlug(filters.categorySlug);
    if (category) {
      const categoryIds = [category.id, ...(category.children?.map((c) => c.id) || [])];
      query = query.in('category_id', categoryIds);
    }
  } else if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }

  // Subcategory filter
  if (filters.subcategoryId) {
    query = query.eq('category_id', filters.subcategoryId);
  }

  // Featured flag
  if (filters.isFeatured !== undefined) {
    query = query.eq('is_featured', filters.isFeatured);
  }

  // Stock status
  if (filters.inStockOnly) {
    query = query.gt('stock_quantity', 0);
  }

  // Price range
  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice);
  }

  // Text search (Arabic and English)
  if (filters.searchQuery?.trim()) {
    const q = `%${filters.searchQuery.trim()}%`;
    query = query.or(
      `name_ar.ilike.${q},name_en.ilike.${q},description_ar.ilike.${q},description_en.ilike.${q},sku.ilike.${q}`
    );
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'name-asc':
      query = query.order('name_ar', { ascending: true });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'featured':
    default:
      query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
      break;
  }

  // Pagination
  const limit = filters.limit || 24;
  const offset = filters.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('[catalog] fetchProducts error:', error);
    throw error;
  }

  const products = (data || []).map(mapProductRow);

  return {
    products,
    total: count || 0,
  };
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProductRow(data);
}

export async function fetchRelatedProducts(
  categoryId: string,
  currentProductId: string,
  limit = 4
): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentProductId)
    .limit(limit);

  return (data || []).map(mapProductRow);
}

// ---------------------------------------------------------------------------
// ADMIN MUTATIONS
// ---------------------------------------------------------------------------
export async function createProduct(input: CreateProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      sku: input.sku.trim(),
      name_ar: input.name_ar.trim(),
      name_en: input.name_en.trim(),
      description_ar: input.description_ar?.trim() || null,
      description_en: input.description_en?.trim() || null,
      category_id: input.category_id,
      price: input.price,
      compare_at_price: input.compare_at_price || null,
      unit_label_ar: input.unit_label_ar.trim(),
      unit_label_en: input.unit_label_en.trim(),
      stock_quantity: input.stock_quantity,
      is_active: input.is_active !== undefined ? input.is_active : true,
      is_featured: input.is_featured !== undefined ? input.is_featured : false,
      images: input.images || [],
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }

  return mapProductRow(data);
}

export async function updateProduct(input: UpdateProductInput): Promise<Product> {
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.sku !== undefined) updates.sku = input.sku.trim();
  if (input.name_ar !== undefined) updates.name_ar = input.name_ar.trim();
  if (input.name_en !== undefined) updates.name_en = input.name_en.trim();
  if (input.description_ar !== undefined) updates.description_ar = input.description_ar?.trim() || null;
  if (input.description_en !== undefined) updates.description_en = input.description_en?.trim() || null;
  if (input.category_id !== undefined) updates.category_id = input.category_id;
  if (input.price !== undefined) updates.price = input.price;
  if (input.compare_at_price !== undefined) updates.compare_at_price = input.compare_at_price || null;
  if (input.unit_label_ar !== undefined) updates.unit_label_ar = input.unit_label_ar.trim();
  if (input.unit_label_en !== undefined) updates.unit_label_en = input.unit_label_en.trim();
  if (input.stock_quantity !== undefined) updates.stock_quantity = input.stock_quantity;
  if (input.is_active !== undefined) updates.is_active = input.is_active;
  if (input.is_featured !== undefined) updates.is_featured = input.is_featured;
  if (input.images !== undefined) updates.images = input.images;

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', input.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }

  return mapProductRow(data);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

export async function createCategory(input: CreateCategoryInput): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert({
      slug: input.slug.trim().toLowerCase(),
      name_ar: input.name_ar.trim(),
      name_en: input.name_en.trim(),
      parent_id: input.parent_id || null,
      image_url: input.image_url || null,
      icon: input.icon || null,
      sort_order: input.sort_order || 0,
      is_active: input.is_active !== undefined ? input.is_active : true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }

  return data as unknown as Category;
}

export async function updateCategory(input: UpdateCategoryInput): Promise<Category> {
  const updates: Record<string, unknown> = {};
  if (input.name_ar !== undefined) updates.name_ar = input.name_ar.trim();
  if (input.name_en !== undefined) updates.name_en = input.name_en.trim();
  if (input.slug !== undefined) updates.slug = input.slug.trim().toLowerCase();
  if (input.image_url !== undefined) updates.image_url = input.image_url || null;
  if (input.icon !== undefined) updates.icon = input.icon || null;
  if (input.sort_order !== undefined) updates.sort_order = input.sort_order;
  if (input.is_active !== undefined) updates.is_active = input.is_active;
  if (input.parent_id !== undefined) updates.parent_id = input.parent_id || null;

  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', input.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }

  return data as unknown as Category;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    // If foreign key constraint prevents deletion because products belong to this category,
    // gracefully deactivate it instead so it is removed from active catalog
    if (error.code === '23503' || error.message.toLowerCase().includes('violates foreign key')) {
      const { error: deactivateError } = await supabase
        .from('categories')
        .update({ is_active: false })
        .eq('id', id);

      if (deactivateError) {
        throw new Error(`Failed to deactivate category: ${deactivateError.message}`);
      }
      return;
    }
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}


export async function bulkUpsertProducts(
  products: CreateProductInput[],
  onProgress?: (processed: number, total: number) => void
): Promise<{ successCount: number; errors: string[] }> {
  const BATCH_SIZE = 50;
  let successCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const chunk = products.slice(i, i + BATCH_SIZE);
    const dbPayload = chunk.map((p) => ({
      sku: p.sku,
      name_ar: p.name_ar,
      name_en: p.name_en,
      description_ar: p.description_ar || null,
      description_en: p.description_en || null,
      category_id: p.category_id,
      price: p.price,
      compare_at_price: p.compare_at_price || null,
      unit_label_ar: p.unit_label_ar,
      unit_label_en: p.unit_label_en,
      stock_quantity: p.stock_quantity,
      is_active: p.is_active !== undefined ? p.is_active : true,
      is_featured: p.is_featured !== undefined ? p.is_featured : false,
      images: p.images || [],
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('products').upsert(dbPayload, {
      onConflict: 'sku',
    });

    if (error) {
      errors.push(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
    } else {
      successCount += chunk.length;
    }

    if (onProgress) {
      onProgress(Math.min(i + chunk.length, products.length), products.length);
    }
  }

  return { successCount, errors };
}

export async function ensureCategory(
  name_ar: string,
  name_en?: string,
  slugHint?: string
): Promise<string> {
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name_ar, name_en, slug');

  if (existing) {
    const found = existing.find(
      (c) =>
        c.name_ar.trim().toLowerCase() === name_ar.trim().toLowerCase() ||
        (name_en && c.name_en.trim().toLowerCase() === name_en.trim().toLowerCase()) ||
        (slugHint && c.slug.trim().toLowerCase() === slugHint.trim().toLowerCase())
    );
    if (found) return found.id;
  }

  const slug = (slugHint || name_en || name_ar)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0621-\u064A]+/g, '-')
    .replace(/^-+|-+$/g, '') || `cat-${Date.now()}`;

  const { data: created, error } = await supabase
    .from('categories')
    .insert({
      slug,
      name_ar: name_ar.trim(),
      name_en: (name_en || name_ar).trim(),
      is_active: true,
      sort_order: 99,
    })
    .select('id')
    .single();

  if (error || !created) {
    throw new Error(`Failed to create category: ${error?.message}`);
  }
  return created.id;
}
