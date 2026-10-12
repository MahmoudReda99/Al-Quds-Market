import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Wraps all customer-facing pages with the shared Header and Footer.
 * React Router's <Outlet> renders the matched child route.
 */
export default function StorefrontLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
