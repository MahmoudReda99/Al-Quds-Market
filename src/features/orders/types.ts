import type { OrderStatus, DeliveryArea } from '@/types';

export interface OrderItemDetail {
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
}

export interface OrderDetail {
  id: string;
  order_number: number;
  profile_id: string;
  status: OrderStatus;
  delivery_area_id: string;
  delivery_area?: DeliveryArea;
  address_line: string;
  recipient_phone: string;
  recipient_name: string;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  total: number;
  items: OrderItemDetail[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderItemInput {
  product_id: string;
  quantity: number;
}

export interface CreateOrderInput {
  recipient_name: string;
  recipient_phone: string;
  delivery_area_id: string;
  address_line: string;
  notes?: string;
  items: CreateOrderItemInput[];
}
