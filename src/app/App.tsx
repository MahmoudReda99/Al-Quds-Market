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
import AdminDashboard from '@/features/admin/AdminDashboard';

// Phase 4 Cart Page
import CartPage from '@/features/cart/CartPage';

// Phase 5 Checkout & Orders Pages
import CheckoutPage from '@/features/checkout/CheckoutPage';
import OrdersPage from '@/features/orders/OrdersPage';
import OrderDetailPage from '@/features/orders/OrderDetailPage';

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

          {/* Cart & Orders — Phase 4 & Phase 5 */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/orders"
            element={
              <ProtectedRouteGuard>
                <OrdersPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRouteGuard>
                <OrderDetailPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRouteGuard>
                <AdminDashboard />
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

