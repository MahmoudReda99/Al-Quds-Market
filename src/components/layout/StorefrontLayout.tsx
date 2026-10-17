import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import ProductQuickViewModal from '@/features/catalog/ProductQuickViewModal';
import FloatingBasketBar from '@/components/storefront/FloatingBasketBar';
import { useAuthStore } from '@/features/auth/store';

/**
 * Wraps all customer-facing pages with the shared Header, Footer, CartDrawer,
 * ProductQuickViewModal, and FloatingBasketBar.
 * React Router's <Outlet> renders the matched child route.
 */
export default function StorefrontLayout() {
  const profile = useAuthStore((s) => s.profile);
  const isCustomer = !profile || profile.role !== 'admin';

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {isCustomer && <CartDrawer />}
      <ProductQuickViewModal />
      {isCustomer && <FloatingBasketBar />}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

