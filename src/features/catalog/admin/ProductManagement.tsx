import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useProductsQuery,
  useCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../hooks';
import type { Product } from '@/types';
import type { CreateProductInput } from '../types';
import { uploadProductImage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Loader2,
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function ProductManagement() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { data: productsData, isLoading: isProductsLoading } = useProductsQuery({
    limit: 1000,
    includeInactive: true,
  });
  const { data: categories = [] } = useCategoriesQuery();

  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();

  const products = useMemo(() => productsData?.products || [], [productsData?.products]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search by name (Arabic or English) or Code (SKU)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchNameAr = p.name_ar?.toLowerCase().includes(q);
        const matchNameEn = p.name_en?.toLowerCase().includes(q);
        const matchSku = p.sku?.toLowerCase().includes(q);
        if (!matchNameAr && !matchNameEn && !matchSku) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && p.category_id !== selectedCategory) {
        return false;
      }

      // 3. Stock filter
      if (stockFilter === 'out_of_stock' && p.stock_quantity > 0) return false;
      if (stockFilter === 'low_stock' && (p.stock_quantity <= 0 || p.stock_quantity > 5)) return false;
      if (stockFilter === 'in_stock' && p.stock_quantity <= 0) return false;

      // 4. Status filter
      if (statusFilter === 'active' && !p.is_active) return false;
      if (statusFilter === 'inactive' && p.is_active) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter, statusFilter]);

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleStockFilterChange = (val: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock') => {
    setStockFilter(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: 'all' | 'active' | 'inactive') => {
    setStatusFilter(val);
    setCurrentPage(1);
  };


  // Form State
  const [sku, setSku] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [unitAr, setUnitAr] = useState('كغ');
  const [unitEn, setUnitEn] = useState('kg');
  const [stock, setStock] = useState('50');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [images, setImages] = useState<{ url: string; alt_ar: string; alt_en: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingProduct(null);
    setSku(`SKU-${Date.now().toString().slice(-4)}`);
    setNameAr('');
    setNameEn('');
    setDescAr('');
    setDescEn('');
    setCategoryId(categories[0]?.id || '');
    setPrice('');
    setComparePrice('');
    setUnitAr('كغ');
    setUnitEn('kg');
    setStock('50');
    setIsFeatured(false);
    setIsActive(true);
    setImages([]);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setSku(p.sku);
    setNameAr(p.name_ar);
    setNameEn(p.name_en);
    setDescAr(p.description_ar || '');
    setDescEn(p.description_en || '');
    setCategoryId(p.category_id);
    setPrice(String(p.price));
    setComparePrice(p.compare_at_price ? String(p.compare_at_price) : '');
    setUnitAr(p.unit_label_ar);
    setUnitEn(p.unit_label_en);
    setStock(String(p.stock_quantity));
    setIsFeatured(p.is_featured);
    setIsActive(p.is_active);
    setImages(p.images || []);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setFormError(null);

    try {
      const file = files[0];
      const { url } = await uploadProductImage(file);
      setImages((prev) => [
        ...prev,
        { url, alt_ar: nameAr || 'صورة المنتج', alt_en: nameEn || 'Product image' },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setFormError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!nameAr.trim() || !nameEn.trim()) {
      setFormError('يرجى إدخال اسم المنتج باللغتين العربية والإنجليزية');
      return;
    }
    if (!price || Number(price) <= 0) {
      setFormError('يرجى إدخال سعر صحيح للمنتج');
      return;
    }
    if (!categoryId) {
      setFormError('يرجى اختيار القسم');
      return;
    }

    const payload: CreateProductInput = {
      sku: sku.trim(),
      name_ar: nameAr.trim(),
      name_en: nameEn.trim(),
      description_ar: descAr.trim() || null,
      description_en: descEn.trim() || null,
      category_id: categoryId,
      price: Number(price),
      compare_at_price: comparePrice ? Number(comparePrice) : null,
      unit_label_ar: unitAr.trim(),
      unit_label_en: unitEn.trim(),
      stock_quantity: Number(stock) || 0,
      is_featured: isFeatured,
      is_active: isActive,
      images,
    };

    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({ ...payload, id: editingProduct.id });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed';
      setFormError(msg);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف "${name}"؟`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Delete failed');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {t('admin.products')}
          </h2>
          <p className="text-sm text-foreground-muted">
            {isAr
              ? `إدارة كتالوج المنتجات، الأسعار، المخزون، والصور (${totalItems} منتج)`
              : `Catalog, pricing, stock, and photo management (${totalItems} products)`}
          </p>
        </div>

        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus size={16} />
          <span>{t('admin.addProduct')}</span>
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Search by Name or Code SKU */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={16} />
          <input
            type="text"
            placeholder={isAr ? 'بحث بالاسم (عربي / إنجليزي) أو كود SKU...' : 'Search by name or SKU code...'}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2 pe-3 ps-9 text-xs focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none"
          >
            <option value="all">{isAr ? 'كافة الأقسام' : 'All Categories'}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {isAr ? c.name_ar : c.name_en}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => handleStockFilterChange(e.target.value as 'all' | 'in_stock' | 'low_stock' | 'out_of_stock')}
            className="rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none"
          >
            <option value="all">{isAr ? 'كافة المخزون' : 'All Stock'}</option>
            <option value="in_stock">{isAr ? 'متوفر' : 'In Stock'}</option>
            <option value="low_stock">{isAr ? 'مخزون منخفض (≤ 5)' : 'Low Stock (≤ 5)'}</option>
            <option value="out_of_stock">{isAr ? 'نفد المخزون' : 'Out of Stock'}</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value as 'all' | 'active' | 'inactive')}
            className="rounded-xl border border-surface-border bg-surface-muted px-3 py-2 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none"
          >
            <option value="all">{isAr ? 'كافة الحالات' : 'All Status'}</option>
            <option value="active">{isAr ? 'نشط فقط' : 'Active Only'}</option>
            <option value="inactive">{isAr ? 'معطل فقط' : 'Inactive Only'}</option>
          </select>

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== 'all' || stockFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setStockFilter('all');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="rounded-xl px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              {isAr ? 'إعادة ضبط' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      {isProductsLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-surface-border bg-white p-12 text-center">
          <Package className="mx-auto text-foreground-subtle mb-3" size={40} />
          <h3 className="font-bold text-foreground">
            {products.length === 0
              ? (isAr ? 'لا توجد منتجات مسجلة' : 'No products recorded')
              : (isAr ? 'لا توجد منتجات مطابقة للبحث' : 'No matching products found')}
          </h3>
          <p className="text-sm text-foreground-muted mt-1">
            {products.length === 0
              ? (isAr ? 'ابدأ بإضافة أول منتج إلى المتجر' : 'Start by adding your first product')
              : (isAr ? 'جرب البحث باسم آخر أو كود SKU مختلف' : 'Try searching with a different name or SKU')}
          </p>
          {products.length === 0 ? (
            <Button onClick={openCreateModal} className="mt-4">
              {t('admin.addProduct')}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setStockFilter('all');
                setStatusFilter('all');
                setCurrentPage(1);
              }}
              className="mt-4"
            >
              {isAr ? 'مسح التصفية' : 'Clear Filters'}
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-surface-border bg-white shadow-card">
            <table className="w-full text-start text-sm">
              <thead className="border-b border-surface-border bg-surface-muted text-xs font-bold text-foreground-muted uppercase">
                <tr>
                  <th className="px-4 py-3.5 text-start">المنتج | Product</th>
                  <th className="px-4 py-3.5 text-start">SKU</th>
                  <th className="px-4 py-3.5 text-start">السعر | Price</th>
                  <th className="px-4 py-3.5 text-start">المخزون | Stock</th>
                  <th className="px-4 py-3.5 text-start">الحالة | Status</th>
                  <th className="px-4 py-3.5 text-end">الإجراءات | Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {paginatedProducts.map((p) => {
                  const category = categories.find((c) => c.id === p.category_id);
                  return (
                    <tr key={p.id} className="hover:bg-surface-subtle/50 transition-colors">
                      {/* Product Cell */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-muted p-1 text-xl">
                            {p.images?.[0]?.url ? (
                              <img src={p.images[0].url} alt="" className="h-full w-full object-contain" />
                            ) : (
                              <span>🛒</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground line-clamp-1">{p.name_ar}</p>
                            <p className="text-xs text-foreground-muted line-clamp-1">{p.name_en}</p>
                            {category && (
                              <span className="text-[10px] text-brand-700 font-semibold">{category.name_ar}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-xs font-mono text-foreground-muted font-bold">{p.sku}</td>

                      {/* Price Cell */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-foreground">{p.price.toFixed(2)} {t('common.currency')}</span>
                        {p.compare_at_price && (
                          <span className="ms-1.5 text-xs text-foreground-subtle line-through">
                            {p.compare_at_price.toFixed(2)} {t('common.currency')}
                          </span>
                        )}
                      </td>

                      {/* Stock Cell */}
                      <td className="px-4 py-3">
                        {p.stock_quantity <= 0 ? (
                          <Badge variant="destructive">{t('common.outOfStock')}</Badge>
                        ) : p.stock_quantity <= 5 ? (
                          <Badge variant="warning">{p.stock_quantity} ({t('product.lowStock')})</Badge>
                        ) : (
                          <span className="font-medium text-foreground">{p.stock_quantity} {p.unit_label_ar}</span>
                        )}
                      </td>

                      {/* Status Cell */}
                      <td className="px-4 py-3">
                        {p.is_active ? (
                          <Badge variant="default">نشط | Active</Badge>
                        ) : (
                          <Badge variant="secondary">معطل | Inactive</Badge>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(p)}
                            className="rounded-lg p-2 text-foreground-subtle hover:bg-brand-50 hover:text-brand-700 transition-colors"
                            title="تعديل"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name_ar)}
                            className="rounded-lg p-2 text-foreground-subtle hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="حذف"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-surface-border bg-white px-4 py-3 text-xs">
            <div className="text-foreground-muted">
              {isAr
                ? `عرض ${startIndex + 1} إلى ${Math.min(startIndex + pageSize, totalItems)} من أصل ${totalItems} منتج`
                : `Showing ${startIndex + 1} to ${Math.min(startIndex + pageSize, totalItems)} of ${totalItems} products`}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-foreground-muted">{isAr ? 'لكل صفحة:' : 'Per page:'}</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-surface-border bg-surface-muted px-2 py-1 text-xs font-semibold text-foreground focus:border-brand-600 focus:outline-none"
              >
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <div className="flex items-center gap-1 ms-2">
                <button
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-surface-border p-1.5 text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle transition-colors"
                  title={isAr ? 'الصفحة السابقة' : 'Previous page'}
                >
                  {isAr ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, idx) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (safeCurrentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (safeCurrentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = safeCurrentPage - 2 + idx;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                        safeCurrentPage === pageNum
                          ? 'bg-brand-700 text-white shadow-xs'
                          : 'border border-surface-border text-foreground hover:bg-surface-subtle'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-surface-border p-1.5 text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-subtle transition-colors"
                  title={isAr ? 'الصفحة التالية' : 'Next page'}
                >
                  {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Create/Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-surface-border max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute end-4 top-4 rounded-xl p-2 text-foreground-subtle hover:bg-surface-subtle"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-foreground mb-4">
              {editingProduct ? 'تعديل المنتج | Edit Product' : 'إضافة منتج جديد | Add New Product'}
            </h3>

            {formError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="الاسم بالعربية *"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: تفاح أحمر طازج"
                  required
                />
                <Input
                  label="Name in English *"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Fresh Red Apples"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="رمز SKU *"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  required
                />
                <Input
                  label={`السعر (${t('common.currency')}) *`}
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="12.50"
                  required
                />
                <Input
                  label="السعر الأصلي (اختياري للخصم)"
                  type="number"
                  step="0.01"
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder="15.00"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    القسم | Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 px-3 text-sm focus:border-brand-600 focus:bg-white focus:outline-none"
                    required
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name_ar} | {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="الوحدة بالعربية *"
                  value={unitAr}
                  onChange={(e) => setUnitAr(e.target.value)}
                  placeholder="كغ، قطعة، لتر"
                  required
                />
                <Input
                  label="الوحدة بالإنجليزية *"
                  value={unitEn}
                  onChange={(e) => setUnitEn(e.target.value)}
                  placeholder="kg, piece, liter"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="كمية المخزون *"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-surface-border text-brand-700"
                  />
                  <label htmlFor="is_featured" className="text-sm font-medium text-foreground cursor-pointer">
                    منتج مميز | Featured
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-surface-border text-brand-700"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-foreground cursor-pointer">
                    نشط في المتجر | Active
                  </label>
                </div>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  صور المنتج (Supabase Storage) | Images
                </label>

                {/* Uploaded thumbs */}
                <div className="flex flex-wrap gap-3 mb-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative h-20 w-20 rounded-2xl border border-surface-border bg-surface-muted p-1 group">
                      <img src={img.url} alt="" className="h-full w-full object-contain rounded-xl" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-1.5 -end-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-sm"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  <label className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-surface-border bg-surface-muted cursor-pointer hover:border-brand-600 hover:bg-brand-50/50 transition-colors">
                    {isUploading ? (
                      <Loader2 className="animate-spin text-brand-700" size={20} />
                    ) : (
                      <>
                        <Upload size={18} className="text-foreground-subtle" />
                        <span className="text-[10px] text-foreground-muted mt-1">رفع صورة</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Form CTA */}
              <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="submit"
                  isLoading={createMutation.isPending || updateMutation.isPending}
                >
                  {editingProduct ? t('common.save') : t('admin.addProduct')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
