export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          preferred_language: 'ar' | 'en';
          role: 'customer' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          preferred_language?: 'ar' | 'en';
          role?: 'customer' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          preferred_language?: 'ar' | 'en';
          role?: 'customer' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name_ar: string;
          name_en: string;
          parent_id: string | null;
          image_url: string | null;
          icon: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ar: string;
          name_en: string;
          parent_id?: string | null;
          image_url?: string | null;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_ar?: string;
          name_en?: string;
          parent_id?: string | null;
          image_url?: string | null;
          icon?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
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
          images: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          name_ar: string;
          name_en: string;
          description_ar?: string | null;
          description_en?: string | null;
          category_id: string;
          price: number;
          compare_at_price?: number | null;
          unit_label_ar?: string;
          unit_label_en?: string;
          stock_quantity?: number;
          is_active?: boolean;
          is_featured?: boolean;
          images?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          sku?: string;
          name_ar?: string;
          name_en?: string;
          description_ar?: string | null;
          description_en?: string | null;
          category_id?: string;
          price?: number;
          compare_at_price?: number | null;
          unit_label_ar?: string;
          unit_label_en?: string;
          stock_quantity?: number;
          is_active?: boolean;
          is_featured?: boolean;
          images?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      delivery_areas: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          fee: number;
          free_delivery_threshold: number | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          fee?: number;
          free_delivery_threshold?: number | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          fee?: number;
          free_delivery_threshold?: number | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: number;
          profile_id: string;
          status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          delivery_area_id: string;
          address_line: string;
          recipient_phone: string;
          recipient_name: string;
          notes: string | null;
          subtotal: number;
          delivery_fee: number;
          discount_amount: number;
          total: number;
          promotion_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: number;
          profile_id: string;
          status?: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          delivery_area_id: string;
          address_line: string;
          recipient_phone: string;
          recipient_name: string;
          notes?: string | null;
          subtotal: number;
          delivery_fee: number;
          discount_amount?: number;
          total: number;
          promotion_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: number;
          profile_id?: string;
          status?: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
          delivery_area_id?: string;
          address_line?: string;
          recipient_phone?: string;
          recipient_name?: string;
          notes?: string | null;
          subtotal?: number;
          delivery_fee?: number;
          discount_amount?: number;
          total?: number;
          promotion_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name_ar: string;
          product_name_en: string;
          unit_price: number;
          quantity: number;
          unit_label_ar: string;
          unit_label_en: string;
          image_url: string | null;
          line_total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name_ar: string;
          product_name_en: string;
          unit_price: number;
          quantity: number;
          unit_label_ar: string;
          unit_label_en: string;
          image_url?: string | null;
          line_total: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name_ar?: string;
          product_name_en?: string;
          unit_price?: number;
          quantity?: number;
          unit_label_ar?: string;
          unit_label_en?: string;
          image_url?: string | null;
          line_total?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          id: string;
          profile_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          product_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      promotions: {
        Row: {
          id: string;
          code: string;
          type: 'percentage' | 'fixed' | 'free_delivery';
          value: number;
          min_order_amount: number | null;
          max_uses: number | null;
          used_count: number;
          valid_from: string;
          valid_until: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          type: 'percentage' | 'fixed' | 'free_delivery';
          value: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          valid_from?: string;
          valid_until?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          type?: 'percentage' | 'fixed' | 'free_delivery';
          value?: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          valid_from?: string;
          valid_until?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, { Row: Record<string, Json>; Relationships: [] }>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      decrement_product_stock: {
        Args: { p_product_id: string; p_quantity: number };
        Returns: boolean;
      };
      restore_product_stock: {
        Args: { p_product_id: string; p_quantity: number };
        Returns: void;
      };
    };
    Enums: {
      user_role: 'customer' | 'admin';
      order_status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
      promo_type: 'percentage' | 'fixed' | 'free_delivery';
    };
  };
};
