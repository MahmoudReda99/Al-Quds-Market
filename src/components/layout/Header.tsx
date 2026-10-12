import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Search,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
  Package,
} from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { useAuthStore } from '@/features/auth/store';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/lib/i18n';
import i18n from '@/lib/i18n';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);

  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  const currentLang = (i18n.language as SupportedLanguage) ?? 'ar';

  function toggleLanguage() {
    const next: SupportedLanguage = currentLang === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
  }

  const navLinks = [
    { to: '/', label: t('common.home') },
    { to: '/categories', label: t('common.categories') },
    { to: '/offers', label: t('common.offers') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-white/95 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 rounded-lg"
          aria-label={t('common.appName')}
        >
          <Logo size="md" showText={false} />
          <span className="text-lg font-bold text-brand-700 leading-none hidden sm:block">
            {t('common.appName')}
          </span>
        </Link>

        {/* Search bar — desktop */}
        <div className="relative mx-4 hidden flex-1 md:flex max-w-lg">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          {/* Search toggle — mobile */}
          <button
            className="btn-ghost p-2 md:hidden"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label={t('common.searchShort')}
          >
            <Search size={20} />
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="btn-ghost hidden items-center gap-1.5 px-3 py-2 text-sm sm:flex"
            aria-label="Toggle language"
          >
            <Globe size={16} />
            <span className="font-medium">{t('common.language')}</span>
          </button>

          {/* Account */}
          {user ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigate('/orders')}
                className="btn-ghost hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-foreground-muted hover:text-brand-700"
                aria-label={t('common.orders')}
              >
                <Package size={16} />
                <span>{t('common.orders')}</span>
              </button>

              <button
                onClick={() => navigate('/account')}
                className="btn-ghost relative flex items-center gap-1.5 p-2"
                aria-label={t('common.account')}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="btn-ghost flex items-center gap-1.5 p-2 text-sm"
              aria-label={t('common.login')}
            >
              <User size={20} />
              <span className="hidden sm:inline font-medium text-xs">{t('common.login')}</span>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={toggleCart}
            className="btn-ghost relative p-2"
            aria-label={`${t('common.cart')} (${itemCount})`}
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -end-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-[10px] font-bold text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="btn-ghost p-2 md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-t border-surface-border px-4 py-2 md:hidden">
          <SearchBar autoFocus />
        </div>
      )}

      {/* Desktop nav */}
      <nav className="hidden border-t border-surface-border md:block" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 sm:px-6 lg:px-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-brand-700',
                  isActive ? 'text-brand-700' : 'text-foreground-muted'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Category mega menu trigger */}
          <button className="flex items-center gap-1 text-sm font-medium text-foreground-muted transition-colors hover:text-brand-700">
            {t('nav.allCategories')}
            <ChevronDown size={14} />
          </button>

          {/* Language toggle in nav */}
          <button
            onClick={toggleLanguage}
            className="ms-auto flex items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-brand-700 md:hidden"
          >
            <Globe size={15} />
            {t('common.language')}
          </button>

          <button
            onClick={toggleLanguage}
            className="ms-auto hidden items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-brand-700 md:flex"
          >
            <Globe size={15} />
            {t('common.language')}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          className="border-t border-surface-border bg-white md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="divide-y divide-surface-border px-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block py-3 text-sm font-medium transition-colors',
                    isActive ? 'text-brand-700' : 'text-foreground'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <NavLink
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-semibold text-foreground hover:text-brand-700"
                >
                  <Package size={16} />
                  <span>{t('common.orders')}</span>
                </NavLink>

                <NavLink
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-sm font-semibold text-brand-700"
                >
                  <User size={16} />
                  <span>{profile?.full_name || user.email || t('common.account')}</span>
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="flex w-full items-center gap-2 py-3 text-sm font-semibold text-brand-700 text-start"
              >
                <User size={16} />
                <span>{t('auth.loginTitle')} / {t('auth.signupTitle')}</span>
              </button>
            )}
            <button
              onClick={() => {
                toggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 py-3 text-sm font-medium text-foreground-muted"
            >
              <Globe size={16} />
              {t('common.language')}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}


/* ─── Search Bar ────────────────────────────── */
function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <form
      role="search"
      className="relative flex w-full items-center"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const q = data.get('q');
        if (q && String(q).trim()) {
          navigate(`/search?q=${encodeURIComponent(String(q).trim())}`);
        }
      }}
    >
      <Search
        size={16}
        className="pointer-events-none absolute start-3 text-foreground-subtle"
        aria-hidden="true"
      />
      <input
        type="search"
        name="q"
        autoFocus={autoFocus}
        placeholder={t('common.search')}
        className="w-full rounded-xl border border-surface-border bg-surface-muted py-2 pe-4 ps-9 text-sm text-foreground placeholder:text-foreground-subtle transition-all focus:border-brand-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-700/20"
        aria-label={t('common.search')}
      />
    </form>
  );
}
