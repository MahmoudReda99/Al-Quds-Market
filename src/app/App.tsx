import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StorefrontLayout from '@/components/layout/StorefrontLayout';
import HomePage from '@/components/storefront/HomePage';
import NotFoundPage from '@/components/storefront/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes — implemented in Phases 3-5 */}
          <Route path="/categories" element={<PlaceholderPage title="الأقسام | Categories" />} />
          <Route path="/category/:slug" element={<PlaceholderPage title="قسم | Category" />} />
          <Route path="/product/:id" element={<PlaceholderPage title="منتج | Product" />} />
          <Route path="/search" element={<PlaceholderPage title="بحث | Search" />} />
          <Route path="/favorites" element={<PlaceholderPage title="المفضلة | Favorites" />} />
          <Route path="/cart" element={<PlaceholderPage title="السلة | Cart" />} />
          <Route path="/checkout" element={<PlaceholderPage title="الدفع | Checkout" />} />
          <Route path="/orders" element={<PlaceholderPage title="طلباتي | My Orders" />} />
          <Route path="/orders/:id" element={<PlaceholderPage title="تفاصيل الطلب | Order Detail" />} />
          <Route path="/account" element={<PlaceholderPage title="حسابي | My Account" />} />
          <Route path="/login" element={<PlaceholderPage title="تسجيل الدخول | Log In" />} />
          <Route path="/signup" element={<PlaceholderPage title="إنشاء حساب | Sign Up" />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Temporary placeholder for routes not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-2xl bg-brand-50 px-8 py-6">
        <p className="text-sm font-medium text-brand-600">قريباً | Coming Soon</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-foreground-muted">
          هذه الصفحة ستكون متاحة في المراحل القادمة من التطوير.
        </p>
      </div>
    </div>
  );
}
