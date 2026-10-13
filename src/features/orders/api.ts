import { supabase } from '@/lib/supabase';
import type { DeliveryArea, OrderStatus } from '@/types';
import type { OrderDetail, OrderItemDetail, CreateOrderInput } from './types';

export async function createOrder(input: CreateOrderInput): Promise<OrderDetail> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('يجب تسجيل الدخول لإتمام الطلب | Authentication is required to place an order');
  }

  if (!input.items || input.items.length === 0) {
    throw new Error('سلة المشتريات فارغة | Cart is empty');
  }

  // 1. Fetch & validate delivery area
  const { data: area, error: areaError } = await supabase
    .from('delivery_areas')
    .select('*')
    .eq('id', input.delivery_area_id)
    .eq('is_active', true)
    .single();

  if (areaError || !area) {
    throw new Error('منطقة التوصيل المحددة غير صالحة | Invalid delivery area');
  }

  const deliveryArea: DeliveryArea = {
    id: String(area.id),
    name_ar: String(area.name_ar),
    name_en: String(area.name_en),
    fee: Number(area.fee),
    free_delivery_threshold:
      area.free_delivery_threshold !== null && area.free_delivery_threshold !== undefined
        ? Number(area.free_delivery_threshold)
        : null,
    is_active: Boolean(area.is_active),
  };

  // 2. Fetch live products from database to guarantee authentic prices & stock
  const productIds = input.items.map((i) => i.product_id);
  const { data: dbProducts, error: prodError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)
    .eq('is_active', true);

  if (prodError || !dbProducts) {
    throw new Error('فشل التحقق من المنتجات | Failed to verify products');
  }

  const productMap = new Map(dbProducts.map((p) => [p.id, p]));

  // Verify all products exist and have sufficient stock
  let calculatedSubtotal = 0;
  for (const item of input.items) {
    const prod = productMap.get(item.product_id);
    if (!prod) {
      throw new Error(`المنتج غير متوفر حالياً | Product is no longer available`);
    }
    if (prod.stock_quantity < item.quantity) {
      throw new Error(
        `الكمية المطلوبة من "${prod.name_ar}" غير متوفرة. المتبقي: ${prod.stock_quantity} فقط`
      );
    }
    calculatedSubtotal += prod.price * item.quantity;
  }

  // 3. Server-side delivery fee calculation
  const freeThreshold = deliveryArea.free_delivery_threshold;
  const isFreeDelivery = freeThreshold !== null && calculatedSubtotal >= freeThreshold;
  const deliveryFee = isFreeDelivery ? 0 : deliveryArea.fee;
  const orderTotal = calculatedSubtotal + deliveryFee;

  // 4. Concurrency-safe inventory decrement
  const decrementedProductIds: { productId: string; quantity: number }[] = [];

  try {
    for (const item of input.items) {
      const { data: decremented, error: decError } = await supabase.rpc(
        'decrement_product_stock',
        {
          p_product_id: item.product_id,
          p_quantity: item.quantity,
        }
      );

      if (decError || decremented === false) {
        throw new Error(
          `عذراً، نفد المخزون أثناء تأكيد طلبك. يرجى تعديل الكمية وإعادة المحاولة.`
        );
      }
      decrementedProductIds.push({ productId: item.product_id, quantity: item.quantity });
    }

    // 5. Insert Order record
    const { data: createdOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        profile_id: user.id,
        delivery_area_id: deliveryArea.id,
        address_line: input.address_line.trim(),
        recipient_name: input.recipient_name.trim(),
        recipient_phone: input.recipient_phone.trim(),
        notes: input.notes?.trim() || null,
        subtotal: calculatedSubtotal,
        delivery_fee: deliveryFee,
        discount_amount: 0,
        total: orderTotal,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError || !createdOrder) {
      throw new Error(`فشل إنشاء الطلب: ${orderError?.message}`);
    }

    // 6. Insert Order Items (Immutable historical price snapshots)
    const orderItemsToInsert = input.items.map((item) => {
      const prod = productMap.get(item.product_id)!;
      let firstImageUrl: string | null = null;
      if (Array.isArray(prod.images) && prod.images.length > 0) {
        const img = prod.images[0];
        firstImageUrl = typeof img === 'string' ? img : (img as { url?: string })?.url || null;
      }

      return {
        order_id: createdOrder.id,
        product_id: prod.id,
        product_name_ar: prod.name_ar,
        product_name_en: prod.name_en,
        unit_price: prod.price,
        quantity: item.quantity,
        unit_label_ar: prod.unit_label_ar,
        unit_label_en: prod.unit_label_en,
        image_url: firstImageUrl,
        line_total: prod.price * item.quantity,
      };
    });

    const { data: insertedItems, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert)
      .select();

    if (itemsError || !insertedItems) {
      console.error('[orders] Failed to insert order items:', itemsError);
    }

    return {
      id: createdOrder.id,
      order_number: createdOrder.order_number,
      profile_id: createdOrder.profile_id,
      status: createdOrder.status as OrderStatus,
      delivery_area_id: createdOrder.delivery_area_id,
      delivery_area: deliveryArea,
      address_line: createdOrder.address_line,
      recipient_name: createdOrder.recipient_name,
      recipient_phone: createdOrder.recipient_phone,
      notes: createdOrder.notes,
      subtotal: Number(createdOrder.subtotal),
      delivery_fee: Number(createdOrder.delivery_fee),
      discount_amount: Number(createdOrder.discount_amount),
      total: Number(createdOrder.total),
      items: (insertedItems || []).map((i) => ({
        id: i.id,
        order_id: i.order_id,
        product_id: i.product_id,
        product_name_ar: i.product_name_ar,
        product_name_en: i.product_name_en,
        unit_price: Number(i.unit_price),
        quantity: i.quantity,
        unit_label_ar: i.unit_label_ar,
        unit_label_en: i.unit_label_en,
        image_url: i.image_url,
        line_total: Number(i.line_total),
        created_at: i.created_at,
      })),
      created_at: createdOrder.created_at,
      updated_at: createdOrder.updated_at,
    };
  } catch (err) {
    // If anything fails after stock was decremented, restore stock!
    for (const dec of decrementedProductIds) {
      await supabase.rpc('restore_product_stock', {
        p_product_id: dec.productId,
        p_quantity: dec.quantity,
      });
    }
    throw err;
  }
}

export async function fetchCustomerOrders(): Promise<OrderDetail[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  // Fetch orders with related delivery area and order items
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });

  if (ordersError || !ordersData) {
    console.error('[orders] fetchCustomerOrders error:', ordersError);
    return [];
  }

  if (ordersData.length === 0) return [];

  const orderIds = ordersData.map((o) => o.id);
  const areaIds = Array.from(new Set(ordersData.map((o) => o.delivery_area_id)));

  // Fetch items & areas in parallel
  const [itemsRes, areasRes] = await Promise.all([
    supabase.from('order_items').select('*').in('order_id', orderIds),
    supabase.from('delivery_areas').select('*').in('id', areaIds),
  ]);

  const itemsByOrder = new Map<string, OrderItemDetail[]>();
  for (const item of itemsRes.data || []) {
    const list = itemsByOrder.get(item.order_id) || [];
    list.push({
      id: item.id,
      order_id: item.order_id,
      product_id: item.product_id,
      product_name_ar: item.product_name_ar,
      product_name_en: item.product_name_en,
      unit_price: Number(item.unit_price),
      quantity: item.quantity,
      unit_label_ar: item.unit_label_ar,
      unit_label_en: item.unit_label_en,
      image_url: item.image_url,
      line_total: Number(item.line_total),
      created_at: item.created_at,
    });
    itemsByOrder.set(item.order_id, list);
  }

  const areaMap = new Map<string, DeliveryArea>();
  for (const a of areasRes.data || []) {
    areaMap.set(a.id, {
      id: String(a.id),
      name_ar: String(a.name_ar),
      name_en: String(a.name_en),
      fee: Number(a.fee),
      free_delivery_threshold:
        a.free_delivery_threshold !== null && a.free_delivery_threshold !== undefined
          ? Number(a.free_delivery_threshold)
          : null,
      is_active: Boolean(a.is_active),
    });
  }

  return ordersData.map((order) => ({
    id: order.id,
    order_number: order.order_number,
    profile_id: order.profile_id,
    status: order.status as OrderStatus,
    delivery_area_id: order.delivery_area_id,
    delivery_area: areaMap.get(order.delivery_area_id),
    address_line: order.address_line,
    recipient_name: order.recipient_name,
    recipient_phone: order.recipient_phone,
    notes: order.notes,
    subtotal: Number(order.subtotal),
    delivery_fee: Number(order.delivery_fee),
    discount_amount: Number(order.discount_amount),
    total: Number(order.total),
    items: itemsByOrder.get(order.id) || [],
    created_at: order.created_at,
    updated_at: order.updated_at,
  }));
}

export async function fetchOrderById(orderId: string): Promise<OrderDetail | null> {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error || !order) {
    return null;
  }

  const [itemsRes, areaRes] = await Promise.all([
    supabase.from('order_items').select('*').eq('order_id', order.id),
    supabase.from('delivery_areas').select('*').eq('id', order.delivery_area_id).single(),
  ]);

  let deliveryArea: DeliveryArea | undefined;
  if (areaRes.data) {
    deliveryArea = {
      id: String(areaRes.data.id),
      name_ar: String(areaRes.data.name_ar),
      name_en: String(areaRes.data.name_en),
      fee: Number(areaRes.data.fee),
      free_delivery_threshold:
        areaRes.data.free_delivery_threshold !== null && areaRes.data.free_delivery_threshold !== undefined
          ? Number(areaRes.data.free_delivery_threshold)
          : null,
      is_active: Boolean(areaRes.data.is_active),
    };
  }

  const items: OrderItemDetail[] = (itemsRes.data || []).map((i) => ({
    id: i.id,
    order_id: i.order_id,
    product_id: i.product_id,
    product_name_ar: i.product_name_ar,
    product_name_en: i.product_name_en,
    unit_price: Number(i.unit_price),
    quantity: i.quantity,
    unit_label_ar: i.unit_label_ar,
    unit_label_en: i.unit_label_en,
    image_url: i.image_url,
    line_total: Number(i.line_total),
    created_at: i.created_at,
  }));

  return {
    id: order.id,
    order_number: order.order_number,
    profile_id: order.profile_id,
    status: order.status as OrderStatus,
    delivery_area_id: order.delivery_area_id,
    delivery_area: deliveryArea,
    address_line: order.address_line,
    recipient_name: order.recipient_name,
    recipient_phone: order.recipient_phone,
    notes: order.notes,
    subtotal: Number(order.subtotal),
    delivery_fee: Number(order.delivery_fee),
    discount_amount: Number(order.discount_amount),
    total: Number(order.total),
    items,
    created_at: order.created_at,
    updated_at: order.updated_at,
  };
}

export async function cancelOrder(orderId: string): Promise<void> {
  const order = await fetchOrderById(orderId);
  if (!order) {
    throw new Error('الطلب غير موجود | Order not found');
  }

  if (order.status !== 'pending') {
    throw new Error('لا يمكن إلغاء الطلب بعد بدء تجهيزه أو تسليمه | Only pending orders can be cancelled');
  }

  // Restore inventory for each item
  for (const item of order.items) {
    if (item.product_id) {
      await supabase.rpc('restore_product_stock', {
        p_product_id: item.product_id,
        p_quantity: item.quantity,
      });
    }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) {
    throw new Error(`فشل إلغاء الطلب: ${error.message}`);
  }
}

export async function fetchAllOrdersAdmin(): Promise<OrderDetail[]> {
  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (ordersError || !ordersData) {
    console.error('[orders] fetchAllOrdersAdmin error:', ordersError);
    throw new Error('فشل تحميل قائمة الطلبات | Failed to load orders');
  }

  if (ordersData.length === 0) return [];

  const orderIds = ordersData.map((o) => o.id);
  const areaIds = Array.from(new Set(ordersData.map((o) => o.delivery_area_id)));

  const [itemsRes, areasRes] = await Promise.all([
    supabase.from('order_items').select('*').in('order_id', orderIds),
    supabase.from('delivery_areas').select('*').in('id', areaIds),
  ]);

  const itemsByOrder = new Map<string, OrderItemDetail[]>();
  for (const item of itemsRes.data || []) {
    const list = itemsByOrder.get(item.order_id) || [];
    list.push({
      id: item.id,
      order_id: item.order_id,
      product_id: item.product_id,
      product_name_ar: item.product_name_ar,
      product_name_en: item.product_name_en,
      unit_price: Number(item.unit_price),
      quantity: item.quantity,
      unit_label_ar: item.unit_label_ar,
      unit_label_en: item.unit_label_en,
      image_url: item.image_url,
      line_total: Number(item.line_total),
      created_at: item.created_at,
    });
    itemsByOrder.set(item.order_id, list);
  }

  const areaMap = new Map<string, DeliveryArea>();
  for (const a of areasRes.data || []) {
    areaMap.set(a.id, {
      id: String(a.id),
      name_ar: String(a.name_ar),
      name_en: String(a.name_en),
      fee: Number(a.fee),
      free_delivery_threshold:
        a.free_delivery_threshold !== null && a.free_delivery_threshold !== undefined
          ? Number(a.free_delivery_threshold)
          : null,
      is_active: Boolean(a.is_active),
    });
  }

  return ordersData.map((o) => ({
    id: o.id,
    order_number: o.order_number,
    profile_id: o.profile_id,
    status: o.status as OrderStatus,
    delivery_area_id: o.delivery_area_id,
    delivery_area: areaMap.get(o.delivery_area_id),
    address_line: o.address_line,
    recipient_name: o.recipient_name,
    recipient_phone: o.recipient_phone,
    notes: o.notes,
    subtotal: Number(o.subtotal),
    delivery_fee: Number(o.delivery_fee),
    discount_amount: Number(o.discount_amount),
    total: Number(o.total),
    items: itemsByOrder.get(o.id) || [],
    created_at: o.created_at,
    updated_at: o.updated_at,
  }));
}

export async function updateOrderStatusAdmin(orderId: string, status: OrderStatus): Promise<void> {
  // If transitioning to cancelled, restore stock
  if (status === 'cancelled') {
    const order = await fetchOrderById(orderId);
    if (order && order.status !== 'cancelled') {
      for (const item of order.items) {
        if (item.product_id) {
          await supabase.rpc('restore_product_stock', {
            p_product_id: item.product_id,
            p_quantity: item.quantity,
          });
        }
      }
    }
  }

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) {
    throw new Error(`فشل تحديث حالة الطلب: ${error.message}`);
  }
}

