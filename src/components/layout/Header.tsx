import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Search,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCartStore } from '@/features/cart/store';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/lib/i18n';
import i18n from '@/lib/i18n';

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);

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
          <LogoMark />
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
          <Link
            to="/account"
            className="btn-ghost p-2"
            aria-label={t('common.account')}
          >
            <User size={20} />
          </Link>

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

/* ─── Logo Mark SVG ─────────────────────────── */
function LogoMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Stylized leaf / market icon */}
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M8 12l2.5 2.5L16 9" />
      </svg>
    </div>
  );
}

/* ─── Search Bar ────────────────────────────── */
function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const { t } = useTranslation();

  return (
    <form
      role="search"
      className="relative flex w-full items-center"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const q = data.get('q');
        if (q) window.location.href = `/search?q=${encodeURIComponent(String(q))}`;
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
