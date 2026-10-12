import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StorefrontLayout from '@/components/layout/StorefrontLayout';
import HomePage from '@/components/storefront/HomePage';
import NotFoundPage from '@/components/storefront/NotFoundPage';
import ProfilePage from '@/features/auth/ProfilePage';
import AuthModal from '@/features/auth/AuthModal';
import AdminRouteGuard from '@/features/auth/AdminRouteGuard';
import ProtectedRouteGuard from '@/features/auth/ProtectedRouteGuard';
import { useAuthStore } from '@/features/auth/store';

// Phase 3 Catalog & Favorites Pages
import CategoriesPage from '@/features/catalog/CategoriesPage';
import CategoryDetailPage from '@/features/catalog/CategoryDetailPage';
import ProductDetailPage from '@/features/catalog/ProductDetailPage';
import SearchPage from '@/features/catalog/SearchPage';
import FavoritesPage from '@/features/favorites/FavoritesPage';
import ProductManagement from '@/features/catalog/admin/ProductManagement';

export default function App() {
  const initializeAuth = useAuthStore((s) => s.initialize);
  const user = useAuthStore((s) => s.user);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      {/* Global Modals */}
      <AuthModal />

      <Routes>
        {/* Storefront */}
        <Route element={<StorefrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<ProfilePage />} />
          
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/account" replace />
              ) : (
                <AuthActionTrigger action="login" openAuthModal={openAuthModal} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/account" replace />
              ) : (
                <AuthActionTrigger action="signup" openAuthModal={openAuthModal} />
              )
            }
          />

          {/* Phase 3 Catalog & Discovery routes */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:slug" element={<CategoryDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* Cart & Orders — Phase 4 */}
          <Route path="/cart" element={<PlaceholderPage title="السلة | Cart" />} />
          <Route path="/checkout" element={<PlaceholderPage title="الدفع | Checkout" />} />
          <Route
            path="/orders"
            element={
              <ProtectedRouteGuard>
                <PlaceholderPage title="طلباتي | My Orders" />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRouteGuard>
                <PlaceholderPage title="تفاصيل الطلب | Order Detail" />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRouteGuard>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                  <ProductManagement />
                </div>
              </AdminRouteGuard>
            }
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function AuthActionTrigger({
  action,
  openAuthModal,
}: {
  action: 'login' | 'signup';
  openAuthModal: (view: 'login' | 'signup') => void;
}) {
  useEffect(() => {
    openAuthModal(action);
  }, [action, openAuthModal]);

  return <Navigate to="/" replace />;
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
