export interface CheckoutFormData {
  recipient_name: string;
  recipient_phone: string;
  delivery_area_id: string;
  address_line: string;
  notes: string;
}

export interface DeliveryCalculation {
  subtotal: number;
  deliveryFee: number;
  isFreeDelivery: boolean;
  freeDeliveryThreshold: number | null;
  amountNeededForFreeDelivery: number;
  total: number;
}
