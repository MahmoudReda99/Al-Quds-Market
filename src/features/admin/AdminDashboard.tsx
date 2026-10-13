import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Package,
  Clock,
  CheckCircle2,
  ChefHat,
  Truck,
  XCircle,
  Search,
  RefreshCw,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  Check,
  Building2,
} from 'lucide-react';
import {
  useAdminOrdersQuery,
  useUpdateOrderStatusAdminMutation,
} from '@/features/orders/hooks';
import {
  fetchAllDeliveryAreasAdmin,
  updateDeliveryAreaAdmin,
} from '@/features/checkout/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProductManagement from '@/features/catalog/admin/ProductManagement';
import type { OrderStatus, DeliveryArea } from '@/types';
import type { OrderDetail } from '@/features/orders/types';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { useAuthStore } from '@/features/auth/store';

type DashboardTab = 'orders' | 'products' | 'delivery';

export default function AdminDashboard() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const profile = useAuthStore((s) => s.profile);
  const user = useAuthStore((s) => s.user);

  const [activeTab, setActiveTab] = useState<DashboardTab>('orders');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  // Query all orders
  const {
    data: orders = [],
    isLoading: isOrdersLoading,
    isRefetching: isOrdersRefetching,
    refetch: refetchOrders,
  } = useAdminOrdersQuery();

  const updateStatusMutation = useUpdateOrderStatusAdminMutation();

  // Query delivery areas
  const queryClient = useQueryClient();
  const { data: deliveryAreas = [], isLoading: isAreasLoading } = useQuery({
    queryKey: ['admin-delivery-areas'],
    queryFn: fetchAllDeliveryAreasAdmin,
  });

  const updateAreaMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { fee?: number; free_delivery_threshold?: number | null; is_active?: boolean };
    }) => updateDeliveryAreaAdmin(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery-areas'] });
      queryClient.invalidateQueries({ queryKey: ['delivery-areas'] });
    },
  });

  // Calculate high-level KPIs
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingCount = orders.filter((o) => o.status === 'pending').length;
    const preparingCount = orders.filter((o) => o.status === 'preparing' || o.status === 'confirmed').length;
    const outForDeliveryCount = orders.filter((o) => o.status === 'out_for_delivery').length;
    const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalOrders,
      pendingCount,
      preparingCount,
      outForDeliveryCount,
      deliveredCount,
      totalRevenue,
    };
  }, [orders]);

  // Filter orders by status and search query
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchNumber = String(order.order_number).includes(q);
      const matchRecipient = order.recipient_name?.toLowerCase().includes(q);
      const matchPhone = order.recipient_phone?.includes(q);
      const matchAddress = order.address_line?.toLowerCase().includes(q);
      const matchDistrict =
        order.delivery_area?.name_ar?.toLowerCase().includes(q) ||
        order.delivery_area?.name_en?.toLowerCase().includes(q);

      return matchNumber || matchRecipient || matchPhone || matchAddress || matchDistrict;
    });
  }, [orders, selectedStatus, searchQuery]);

  const toggleOrderExpansion = (id: string) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col justify-between gap-4 border-b border-surface-border pb-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-brand-700 font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck size={16} />
            <span>{isAr ? 'لوحة تحكم المشغل والإدارة' : 'Operator & Admin Command Center'}</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-foreground">
            {isAr ? 'إدارة متجر القدس ماركت' : 'Al Quds Market Management'}
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {isAr
              ? `مرحباً ${profile?.full_name || user?.email} — متابعة الطلبات والتشغيل الحي وتحديث المخزون`
              : `Welcome ${profile?.full_name || user?.email} — Live order dispatch, operations, and catalog`}
          </p>
        </div>

        {/* Global Controls & Refetch */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchOrders()}
            disabled={isOrdersRefetching}
            className="flex items-center gap-2"
          >
            <RefreshCw size={14} className={isOrdersRefetching ? 'animate-spin text-brand-600' : ''} />
            <span>{isOrdersRefetching ? (isAr ? 'جاري التحديث...' : 'Refreshing...') : (isAr ? 'تحديث الطلبات' : 'Refresh Orders')}</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {/* Pending */}
        <div
          onClick={() => { setActiveTab('orders'); setSelectedStatus('pending'); }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            selectedStatus === 'pending' && activeTab === 'orders'
              ? 'border-amber-500 bg-amber-50/70 shadow-sm'
              : 'border-surface-border bg-white hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-xs font-semibold">{isAr ? 'بالانتظار' : 'Pending'}</span>
            <Clock size={16} />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-900">{stats.pendingCount}</div>
          <div className="text-[11px] text-amber-700/80 mt-0.5">{isAr ? 'بانتظار التأكيد' : 'Needs confirmation'}</div>
        </div>

        {/* Preparing */}
        <div
          onClick={() => { setActiveTab('orders'); setSelectedStatus('preparing'); }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            selectedStatus === 'preparing' && activeTab === 'orders'
              ? 'border-blue-500 bg-blue-50/70 shadow-sm'
              : 'border-surface-border bg-white hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-xs font-semibold">{isAr ? 'قيد التجهيز' : 'Preparing'}</span>
            <ChefHat size={16} />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-900">{stats.preparingCount}</div>
          <div className="text-[11px] text-blue-700/80 mt-0.5">{isAr ? 'جاري تجهيزها' : 'In fulfillment'}</div>
        </div>

        {/* Out for Delivery */}
        <div
          onClick={() => { setActiveTab('orders'); setSelectedStatus('out_for_delivery'); }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            selectedStatus === 'out_for_delivery' && activeTab === 'orders'
              ? 'border-purple-500 bg-purple-50/70 shadow-sm'
              : 'border-surface-border bg-white hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-xs font-semibold">{isAr ? 'مع المندوب' : 'Dispatch'}</span>
            <Truck size={16} />
          </div>
          <div className="mt-2 text-2xl font-black text-purple-900">{stats.outForDeliveryCount}</div>
          <div className="text-[11px] text-purple-700/80 mt-0.5">{isAr ? 'خرج للتوصيل' : 'Out for delivery'}</div>
        </div>

        {/* Delivered */}
        <div
          onClick={() => { setActiveTab('orders'); setSelectedStatus('delivered'); }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            selectedStatus === 'delivered' && activeTab === 'orders'
              ? 'border-brand-500 bg-brand-50/70 shadow-sm'
              : 'border-surface-border bg-white hover:border-brand-300'
          }`}
        >
          <div className="flex items-center justify-between text-brand-700">
            <span className="text-xs font-semibold">{isAr ? 'تم التسليم' : 'Delivered'}</span>
            <CheckCircle2 size={16} />
          </div>
          <div className="mt-2 text-2xl font-black text-brand-900">{stats.deliveredCount}</div>
          <div className="text-[11px] text-brand-700/80 mt-0.5">{isAr ? 'طلبات ناجحة' : 'Completed orders'}</div>
        </div>

        {/* Total Orders */}
        <div
          onClick={() => { setActiveTab('orders'); setSelectedStatus('all'); }}
          className={`cursor-pointer rounded-2xl border p-4 transition-all ${
            selectedStatus === 'all' && activeTab === 'orders'
              ? 'border-neutral-500 bg-neutral-50 shadow-sm'
              : 'border-surface-border bg-white hover:border-neutral-400'
          }`}
        >
          <div className="flex items-center justify-between text-neutral-600">
            <span className="text-xs font-semibold">{isAr ? 'كافة الطلبات' : 'All Orders'}</span>
            <Package size={16} />
          </div>
          <div className="mt-2 text-2xl font-black text-neutral-900">{stats.totalOrders}</div>
          <div className="text-[11px] text-neutral-500 mt-0.5">{isAr ? 'إجمالي السجل' : 'Lifetime history'}</div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-2xl border border-surface-border bg-white p-4">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-xs font-semibold">{isAr ? 'المبيعات' : 'Sales'}</span>
            <DollarSign size={16} />
          </div>
          <div className="mt-2 text-xl font-black text-emerald-900 truncate">
            {formatCurrency(stats.totalRevenue, 'ar')}
          </div>
          <div className="text-[11px] text-emerald-700/80 mt-0.5">{isAr ? 'غير الملغية' : 'Net active'}</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-surface-border">
        <nav className="flex space-x-2 rtl:space-x-reverse" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'orders'
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-foreground-muted hover:border-surface-border hover:text-foreground'
            }`}
          >
            <Package size={18} />
            <span>{isAr ? 'إدارة الطلبات والتشغيل (المشغل)' : 'Orders & Dispatch (Operator)'}</span>
            {stats.pendingCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {stats.pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'products'
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-foreground-muted hover:border-surface-border hover:text-foreground'
            }`}
          >
            <Layers size={18} />
            <span>{isAr ? 'إدارة المنتجات والمخزون' : 'Products & Catalog'}</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === 'delivery'
                ? 'border-brand-700 text-brand-800'
                : 'border-transparent text-foreground-muted hover:border-surface-border hover:text-foreground'
            }`}
          >
            <MapPin size={18} />
            <span>{isAr ? 'مناطق ورسوم التوصيل (6 أكتوبر)' : 'Delivery Zones & Fees'}</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: OPERATOR ORDERS & DISPATCH */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Filters & Search Toolbar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            {/* Status Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', labelAr: 'الكل', labelEn: 'All', count: stats.totalOrders },
                { id: 'pending', labelAr: 'جديد بالانتظار', labelEn: 'Pending', count: stats.pendingCount },
                { id: 'confirmed', labelAr: 'مؤكد', labelEn: 'Confirmed', count: orders.filter((o) => o.status === 'confirmed').length },
                { id: 'preparing', labelAr: 'قيد التجهيز', labelEn: 'Preparing', count: orders.filter((o) => o.status === 'preparing').length },
                { id: 'out_for_delivery', labelAr: 'مع المندوب', labelEn: 'Out for Delivery', count: stats.outForDeliveryCount },
                { id: 'delivered', labelAr: 'تم التسليم', labelEn: 'Delivered', count: stats.deliveredCount },
                { id: 'cancelled', labelAr: 'ملغي', labelEn: 'Cancelled', count: orders.filter((o) => o.status === 'cancelled').length },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedStatus(chip.id as OrderStatus | 'all')}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedStatus === chip.id
                      ? 'bg-brand-700 text-white shadow-sm'
                      : 'bg-surface-muted text-foreground-muted hover:bg-brand-50 hover:text-brand-700'
                  }`}
                >
                  <span>{isAr ? chip.labelAr : chip.labelEn}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      selectedStatus === chip.id ? 'bg-white/20 text-white' : 'bg-surface-border text-foreground-muted'
                    }`}
                  >
                    {chip.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={16} />
              <input
                type="text"
                placeholder={isAr ? 'بحث برقم الطلب، العميل، الهاتف...' : 'Search by #, name, phone...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-surface-border bg-surface-muted py-2 pe-3 ps-9 text-xs focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Orders List */}
          {isOrdersLoading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-surface-border bg-white">
              <div className="flex flex-col items-center gap-2 text-foreground-muted">
                <RefreshCw className="h-6 w-6 animate-spin text-brand-700" />
                <span className="text-sm">{isAr ? 'جاري تحميل الطلبات...' : 'Loading orders...'}</span>
              </div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border bg-white p-8 text-center">
              <Package className="h-12 w-12 text-foreground-subtle mb-3" />
              <h3 className="text-base font-bold text-foreground">
                {isAr ? 'لا توجد طلبات مطابقة' : 'No orders found'}
              </h3>
              <p className="mt-1 text-xs text-foreground-muted max-w-sm">
                {isAr
                  ? 'لم يتم العثور على طلبات بالحالة المختارة أو البحث المحدد.'
                  : 'No orders matched the current status filter or search query.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const isExpanded = !!expandedOrders[order.id];
                return (
                  <OrderOperatorCard
                    key={order.id}
                    order={order}
                    isAr={isAr}
                    isExpanded={isExpanded}
                    onToggleExpand={() => toggleOrderExpansion(order.id)}
                    onStatusChange={(status) => handleStatusChange(order.id, status)}
                    isUpdating={updateStatusMutation.isPending}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCTS & INVENTORY */}
      {activeTab === 'products' && (
        <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <ProductManagement />
        </div>
      )}

      {/* TAB 3: DELIVERY AREAS & FEES */}
      {activeTab === 'delivery' && (
        <div className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-6">
          <div className="flex flex-col justify-between gap-2 border-b border-surface-border pb-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Building2 className="text-brand-700" size={20} />
                <span>{isAr ? 'مناطق ورسوم التوصيل — مدينة 6 أكتوبر والشيخ زايد' : 'Delivery Zones & Fees — 6th of October & Sheikh Zayed'}</span>
              </h2>
              <p className="text-xs text-foreground-muted mt-0.5">
                {isAr
                  ? 'تحديد رسوم التوصيل وحد التوصيل المجاني لكل حي ومنطقة سكنية'
                  : 'Manage delivery fees and free-delivery thresholds for each residential district'}
              </p>
            </div>
          </div>

          {isAreasLoading ? (
            <div className="py-12 text-center text-sm text-foreground-muted">
              {isAr ? 'جاري تحميل مناطق التوصيل...' : 'Loading delivery areas...'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-xs font-bold text-foreground-muted">
                    <th className="py-3 px-3 text-start">{isAr ? 'المنطقة / الحي' : 'District'}</th>
                    <th className="py-3 px-3 text-start">{isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</th>
                    <th className="py-3 px-3 text-start">{isAr ? 'حد التوصيل المجاني' : 'Free Threshold'}</th>
                    <th className="py-3 px-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="py-3 px-3 text-end">{isAr ? 'إجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  {deliveryAreas.map((area) => (
                    <DeliveryAreaRow
                      key={area.id}
                      area={area}
                      isAr={isAr}
                      onUpdate={(updates) => updateAreaMutation.mutate({ id: area.id, updates })}
                      isUpdating={updateAreaMutation.isPending}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponent: Order Operator Card with fast status actions
// ─────────────────────────────────────────────────────────────────────────────
interface OrderOperatorCardProps {
  order: OrderDetail;
  isAr: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStatusChange: (status: OrderStatus) => void;
  isUpdating: boolean;
}

function OrderOperatorCard({
  order,
  isAr,
  isExpanded,
  onToggleExpand,
  onStatusChange,
  isUpdating,
}: OrderOperatorCardProps) {
  // Format WhatsApp Link
  const cleanPhone = (order.recipient_phone || '').replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('0') ? `20${cleanPhone.slice(1)}` : cleanPhone;
  const waMessage = encodeURIComponent(
    isAr
      ? `مرحباً ${order.recipient_name}، نتواصل معك بخصوص طلبك رقم #${order.order_number} من القدس ماركت.`
      : `Hello ${order.recipient_name}, regarding your order #${order.order_number} from Al Quds Market.`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div
      className={`rounded-2xl border transition-all ${
        order.status === 'pending'
          ? 'border-amber-300 bg-amber-50/30'
          : order.status === 'preparing'
          ? 'border-blue-300 bg-blue-50/20'
          : order.status === 'out_for_delivery'
          ? 'border-purple-300 bg-purple-50/20'
          : 'border-surface-border bg-white'
      } p-4 sm:p-5 shadow-card`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-black text-brand-900">
            #{order.order_number}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-base">{order.recipient_name}</span>
              <OrderStatusBadge status={order.status} isAr={isAr} />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted mt-0.5">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                <span>{new Date(order.created_at).toLocaleString(isAr ? 'ar-EG' : 'en-US')}</span>
              </span>
              <span className="flex items-center gap-1 font-medium text-brand-700">
                <MapPin size={12} />
                <span>{isAr ? order.delivery_area?.name_ar : order.delivery_area?.name_en}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Total & Expand Trigger */}
        <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-border">
          <div className="text-start sm:text-end">
            <div className="text-xs text-foreground-muted">{isAr ? 'إجمالي الطلب' : 'Total'}</div>
            <div className="text-base font-extrabold text-foreground">
              {formatCurrency(order.total, isAr ? 'ar' : 'en')}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpand}
            className="flex items-center gap-1 text-xs text-brand-700 hover:text-brand-900"
          >
            <span>{isExpanded ? (isAr ? 'إخفاء التفاصيل' : 'Hide') : (isAr ? 'عرض التفاصيل' : 'Details')}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>
      </div>

      {/* Customer Quick Contact & Delivery Address Bar */}
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-surface-subtle p-2.5 text-xs">
        <div className="flex items-center gap-1 font-medium text-foreground">
          <MapPin size={14} className="text-brand-700 shrink-0" />
          <span className="truncate max-w-xs">{order.address_line}</span>
        </div>

        <div className="ms-auto flex items-center gap-2">
          {/* Phone call link */}
          <a
            href={`tel:${order.recipient_phone}`}
            className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-brand-700 border border-surface-border hover:bg-brand-50"
            title={isAr ? 'اتصال بالعميل' : 'Call customer'}
          >
            <Phone size={12} />
            <span dir="ltr">{order.recipient_phone}</span>
          </a>

          {/* WhatsApp Direct Link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm"
            title={isAr ? 'محادثة واتساب' : 'WhatsApp customer'}
          >
            <MessageCircle size={12} />
            <span>واتساب</span>
          </a>
        </div>
      </div>

      {/* Driver / Customer Notes */}
      {order.notes && (
        <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-xs text-amber-800 border border-amber-200">
          <FileText size={14} className="shrink-0 mt-0.5 text-amber-700" />
          <span>
            <strong>{isAr ? 'ملاحظات العميل:' : 'Notes:'}</strong> {order.notes}
          </span>
        </div>
      )}

      {/* Expanded Order Items Breakdown */}
      {isExpanded && (
        <div className="mt-4 border-t border-surface-border pt-4 animate-fade-in space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
            {isAr ? `محتويات الطلب (${order.items.length} أصناف)` : `Order Items (${order.items.length})`}
          </h4>

          <div className="divide-y divide-surface-border rounded-xl border border-surface-border bg-white overflow-hidden">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 text-xs">
                <div className="flex items-center gap-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.product_name_ar}
                      className="h-10 w-10 rounded-lg object-contain bg-surface-subtle p-1 border border-surface-border"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-subtle text-foreground-subtle">
                      <Package size={16} />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-foreground">
                      {isAr ? item.product_name_ar : item.product_name_en}
                    </div>
                    <div className="text-foreground-muted text-[11px]">
                      {item.quantity} × {formatCurrency(item.unit_price, isAr ? 'ar' : 'en')} /{' '}
                      {isAr ? item.unit_label_ar : item.unit_label_en}
                    </div>
                  </div>
                </div>

                <div className="font-bold text-foreground">
                  {formatCurrency(item.line_total, isAr ? 'ar' : 'en')}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="flex flex-col gap-1 rounded-xl bg-surface-subtle p-3 text-xs text-foreground-muted">
            <div className="flex justify-between">
              <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
              <span className="font-semibold text-foreground">{formatCurrency(order.subtotal, isAr ? 'ar' : 'en')}</span>
            </div>
            <div className="flex justify-between">
              <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
              <span className="font-semibold text-foreground">
                {order.delivery_fee === 0 ? (isAr ? 'مجاني' : 'FREE') : formatCurrency(order.delivery_fee, isAr ? 'ar' : 'en')}
              </span>
            </div>
            <div className="flex justify-between border-t border-surface-border pt-1 font-bold text-sm text-foreground">
              <span>{isAr ? 'الإجمالي النهائي:' : 'Order Total:'}</span>
              <span className="text-brand-700">{formatCurrency(order.total, isAr ? 'ar' : 'en')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Operator Status Advancement Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-surface-border pt-3">
        <div className="flex items-center gap-1.5 text-xs text-foreground-muted">
          <span className="font-semibold">{isAr ? 'تغيير الحالة السريع:' : 'Quick Action:'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {order.status === 'pending' && (
            <>
              <Button
                size="sm"
                variant="default"
                disabled={isUpdating}
                onClick={() => onStatusChange('confirmed')}
                className="bg-blue-600 hover:bg-blue-700 text-xs text-white"
              >
                <Check size={14} className="me-1" />
                <span>{isAr ? 'تأكيد الطلب' : 'Confirm Order'}</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={isUpdating}
                onClick={() => onStatusChange('cancelled')}
                className="border-red-300 text-red-600 hover:bg-red-50 text-xs"
              >
                <XCircle size={14} className="me-1" />
                <span>{isAr ? 'إلغاء' : 'Cancel'}</span>
              </Button>
            </>
          )}

          {order.status === 'confirmed' && (
            <Button
              size="sm"
              variant="default"
              disabled={isUpdating}
              onClick={() => onStatusChange('preparing')}
              className="bg-amber-600 hover:bg-amber-700 text-xs text-white"
            >
              <ChefHat size={14} className="me-1" />
              <span>{isAr ? 'بدء التجهيز' : 'Start Preparing'}</span>
            </Button>
          )}

          {order.status === 'preparing' && (
            <Button
              size="sm"
              variant="default"
              disabled={isUpdating}
              onClick={() => onStatusChange('out_for_delivery')}
              className="bg-purple-600 hover:bg-purple-700 text-xs text-white"
            >
              <Truck size={14} className="me-1" />
              <span>{isAr ? 'تسليم للمندوب (خرج للتوصيل)' : 'Dispatch with Driver'}</span>
            </Button>
          )}

          {order.status === 'out_for_delivery' && (
            <Button
              size="sm"
              variant="default"
              disabled={isUpdating}
              onClick={() => onStatusChange('delivered')}
              className="bg-emerald-600 hover:bg-emerald-700 text-xs text-white"
            >
              <CheckCircle2 size={14} className="me-1" />
              <span>{isAr ? 'تم التسليم بنجاح' : 'Mark Delivered'}</span>
            </Button>
          )}

          {/* Manual Status Override Dropdown */}
          <select
            value={order.status}
            disabled={isUpdating}
            onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
            className="rounded-xl border border-surface-border bg-white px-2.5 py-1.5 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none"
          >
            <option value="pending">{isAr ? 'قيد الانتظار' : 'Pending'}</option>
            <option value="confirmed">{isAr ? 'مؤكد' : 'Confirmed'}</option>
            <option value="preparing">{isAr ? 'قيد التجهيز' : 'Preparing'}</option>
            <option value="out_for_delivery">{isAr ? 'خرج للتوصيل' : 'Out for Delivery'}</option>
            <option value="delivered">{isAr ? 'تم التوصيل' : 'Delivered'}</option>
            <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponent: Delivery Area Row
// ─────────────────────────────────────────────────────────────────────────────
interface DeliveryAreaRowProps {
  area: DeliveryArea;
  isAr: boolean;
  onUpdate: (updates: { fee?: number; free_delivery_threshold?: number | null; is_active?: boolean }) => void;
  isUpdating: boolean;
}

function DeliveryAreaRow({ area, isAr, onUpdate, isUpdating }: DeliveryAreaRowProps) {
  const [fee, setFee] = useState(String(area.fee));
  const [threshold, setThreshold] = useState(
    area.free_delivery_threshold !== null ? String(area.free_delivery_threshold) : ''
  );
  const [isActive, setIsActive] = useState(area.is_active);
  const [hasChanges, setHasChanges] = useState(false);

  const handleFeeChange = (val: string) => {
    setFee(val);
    setHasChanges(true);
  };

  const handleThresholdChange = (val: string) => {
    setThreshold(val);
    setHasChanges(true);
  };

  const handleToggleActive = () => {
    const next = !isActive;
    setIsActive(next);
    onUpdate({ is_active: next });
  };

  const handleSave = () => {
    const numFee = parseFloat(fee);
    const numThreshold = threshold.trim() ? parseFloat(threshold) : null;
    if (isNaN(numFee) || numFee < 0) return;

    onUpdate({
      fee: numFee,
      free_delivery_threshold: numThreshold,
    });
    setHasChanges(false);
  };

  return (
    <tr className="hover:bg-surface-subtle/50 transition-colors">
      <td className="py-3 px-3">
        <div className="font-bold text-foreground">{isAr ? area.name_ar : area.name_en}</div>
        <div className="text-[11px] text-foreground-muted">{isAr ? area.name_en : area.name_ar}</div>
      </td>

      <td className="py-3 px-3">
        <div className="flex items-center gap-1 max-w-[110px]">
          <input
            type="number"
            min="0"
            step="1"
            value={fee}
            onChange={(e) => handleFeeChange(e.target.value)}
            className="w-20 rounded-lg border border-surface-border bg-white px-2 py-1 text-xs font-semibold focus:border-brand-600 focus:outline-none"
          />
          <span className="text-xs text-foreground-muted">{isAr ? 'ج.م' : 'EGP'}</span>
        </div>
      </td>

      <td className="py-3 px-3">
        <div className="flex items-center gap-1 max-w-[130px]">
          <input
            type="number"
            min="0"
            step="1"
            placeholder={isAr ? 'بدون حد' : 'No limit'}
            value={threshold}
            onChange={(e) => handleThresholdChange(e.target.value)}
            className="w-24 rounded-lg border border-surface-border bg-white px-2 py-1 text-xs font-semibold focus:border-brand-600 focus:outline-none"
          />
          <span className="text-xs text-foreground-muted">{isAr ? 'ج.م' : 'EGP'}</span>
        </div>
      </td>

      <td className="py-3 px-3 text-center">
        <button
          onClick={handleToggleActive}
          disabled={isUpdating}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
            isActive
              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'معطل' : 'Disabled')}
        </button>
      </td>

      <td className="py-3 px-3 text-end">
        {hasChanges && (
          <Button
            size="sm"
            variant="default"
            disabled={isUpdating}
            onClick={handleSave}
            className="text-xs py-1 px-2.5 bg-brand-700 hover:bg-brand-800 text-white"
          >
            {isAr ? 'حفظ' : 'Save'}
          </Button>
        )}
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponent: Status Badge with color coding
// ─────────────────────────────────────────────────────────────────────────────
function OrderStatusBadge({ status, isAr }: { status: OrderStatus; isAr: boolean }) {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
          <Clock size={12} />
          <span>{isAr ? 'قيد الانتظار' : 'Pending'}</span>
        </span>
      );
    case 'confirmed':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
          <Check size={12} />
          <span>{isAr ? 'مؤكد' : 'Confirmed'}</span>
        </span>
      );
    case 'preparing':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
          <ChefHat size={12} />
          <span>{isAr ? 'قيد التجهيز' : 'Preparing'}</span>
        </span>
      );
    case 'out_for_delivery':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800">
          <Truck size={12} />
          <span>{isAr ? 'خرج للتوصيل' : 'Out for Delivery'}</span>
        </span>
      );
    case 'delivered':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
          <CheckCircle2 size={12} />
          <span>{isAr ? 'تم التسليم' : 'Delivered'}</span>
        </span>
      );
    case 'cancelled':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
          <XCircle size={12} />
          <span>{isAr ? 'ملغي' : 'Cancelled'}</span>
        </span>
      );
    default:
      return null;
  }
}
