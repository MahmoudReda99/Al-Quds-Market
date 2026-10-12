/**
 * Placeholder Database type — replaced in Phase 2 with
 * the generated types from `supabase gen types typescript`.
 */
export type Database = {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
  };
};

/* ─── Domain Types ──────────────────────────── */

export type Language = 'ar' | 'en';

export interface Category {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  parent_id: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProductImage {
  url: string;
  alt_ar: string;
  alt_en: string;
}

export interface Product {
  id: string;
  sku: string;
  name_ar: string;
  name_en: string;
  description_ar: string | null;
  description_en: string | null;
  category_id: string;
  price: number;
  compare_at_price: number | null;
  unit_label_ar: string;
  unit_label_en: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface DeliveryArea {
  id: string;
  name_ar: string;
  name_en: string;
  fee: number;
  free_delivery_threshold: number | null;
  is_active: boolean;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  product_name_ar: string;
  product_name_en: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface Order {
  id: string;
  profile_id: string;
  status: OrderStatus;
  delivery_area_id: string;
  address_line: string;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  preferred_language: Language;
  role: 'customer' | 'admin';
  created_at: string;
}

/* ─── Cart Types ────────────────────────────── */

export interface CartItem {
  product: Product;
  quantity: number;
}
