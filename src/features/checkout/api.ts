import { supabase } from '@/lib/supabase';
import type { DeliveryArea } from '@/types';
import type { DeliveryCalculation } from './types';

export async function fetchDeliveryAreas(): Promise<DeliveryArea[]> {
  const { data, error } = await supabase
    .from('delivery_areas')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[checkout] fetchDeliveryAreas error:', error);
    throw error;
  }

  return (data || []).map((row) => ({
    id: String(row.id),
    name_ar: String(row.name_ar),
    name_en: String(row.name_en),
    fee: Number(row.fee),
    free_delivery_threshold:
      row.free_delivery_threshold !== null && row.free_delivery_threshold !== undefined
        ? Number(row.free_delivery_threshold)
        : null,
    is_active: Boolean(row.is_active),
  }));
}

export function calculateDelivery(
  subtotal: number,
  area: DeliveryArea | null | undefined
): DeliveryCalculation {
  if (!area) {
    const defaultThreshold = 100;
    const isFree = subtotal >= defaultThreshold;
    const needed = isFree ? 0 : Math.max(0, defaultThreshold - subtotal);
    const fee = isFree ? 0 : 15;
    return {
      subtotal,
      deliveryFee: fee,
      isFreeDelivery: isFree,
      freeDeliveryThreshold: defaultThreshold,
      amountNeededForFreeDelivery: needed,
      total: subtotal + fee,
    };
  }

  const threshold = area.free_delivery_threshold;
  const isFree = threshold !== null && threshold !== undefined && subtotal >= threshold;
  const fee = isFree ? 0 : area.fee;
  const needed = threshold !== null && !isFree ? Math.max(0, threshold - subtotal) : 0;

  return {
    subtotal,
    deliveryFee: fee,
    isFreeDelivery: isFree,
    freeDeliveryThreshold: threshold,
    amountNeededForFreeDelivery: needed,
    total: subtotal + fee,
  };
}

export async function fetchAllDeliveryAreasAdmin(): Promise<DeliveryArea[]> {
  const { data, error } = await supabase
    .from('delivery_areas')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[admin] fetchAllDeliveryAreasAdmin error:', error);
    throw error;
  }

  return (data || []).map((row) => ({
    id: String(row.id),
    name_ar: String(row.name_ar),
    name_en: String(row.name_en),
    fee: Number(row.fee),
    free_delivery_threshold:
      row.free_delivery_threshold !== null && row.free_delivery_threshold !== undefined
        ? Number(row.free_delivery_threshold)
        : null,
    is_active: Boolean(row.is_active),
  }));
}

export async function createDeliveryAreaAdmin(data: {
  name_ar: string;
  name_en: string;
  fee: number;
  free_delivery_threshold?: number | null;
  is_active?: boolean;
  sort_order?: number;
}): Promise<DeliveryArea> {
  const { data: newRow, error } = await supabase
    .from('delivery_areas')
    .insert({
      name_ar: data.name_ar,
      name_en: data.name_en,
      fee: data.fee,
      free_delivery_threshold: data.free_delivery_threshold ?? null,
      is_active: data.is_active ?? true,
      sort_order: data.sort_order ?? 99,
    })
    .select('*')
    .single();

  if (error || !newRow) {
    throw new Error(`فشل إضافة منطقة التوصيل: ${error?.message}`);
  }

  return {
    id: String(newRow.id),
    name_ar: String(newRow.name_ar),
    name_en: String(newRow.name_en),
    fee: Number(newRow.fee),
    free_delivery_threshold:
      newRow.free_delivery_threshold !== null && newRow.free_delivery_threshold !== undefined
        ? Number(newRow.free_delivery_threshold)
        : null,
    is_active: Boolean(newRow.is_active),
  };
}

export async function updateDeliveryAreaAdmin(
  id: string,
  updates: {
    name_ar?: string;
    name_en?: string;
    fee?: number;
    free_delivery_threshold?: number | null;
    is_active?: boolean;
    sort_order?: number;
  }
): Promise<void> {
  const { error } = await supabase
    .from('delivery_areas')
    .update(updates)
    .eq('id', id);

  if (error) {
    throw new Error(`فشل تحديث منطقة التوصيل: ${error.message}`);
  }
}

export async function deleteDeliveryAreaAdmin(id: string): Promise<void> {
  const { error } = await supabase
    .from('delivery_areas')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`فشل حذف منطقة التوصيل: ${error.message}`);
  }
}


