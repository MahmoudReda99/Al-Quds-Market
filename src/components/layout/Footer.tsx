import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: t('common.home') },
    { to: '/categories', label: t('common.categories') },
    { to: '/offers', label: t('common.offers') },
    { to: '/account', label: t('common.account') },
  ];

  const serviceLinks = [
    { to: '/faq', label: t('footer.faq') },
    { to: '/contact', label: t('footer.contactUs') },
    { to: '/return-policy', label: t('footer.returnPolicy') },
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/terms', label: t('footer.terms') },
  ];

  return (
    <footer className="border-t border-surface-border bg-surface-muted">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 rounded-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                  <path d="M8 12l2.5 2.5L16 9" />
                </svg>
              </div>
              <span className="text-base font-bold text-brand-700">{t('common.appName')}</span>
            </Link>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              {t('footer.aboutDesc')}
            </p>
            {/* Social links */}
            <div className="mt-4 flex items-center gap-3">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter / X' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-border bg-white text-foreground-muted transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground-muted transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('footer.customerService')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground-muted transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+970000000000"
                  className="flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-brand-700"
                >
                  <Phone size={15} className="shrink-0 text-brand-500" />
                  <span dir="ltr">+970 XXX XXX XXX</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@alqudsmarket.ps"
                  className="flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-brand-700"
                >
                  <Mail size={15} className="shrink-0 text-brand-500" />
                  <span>info@alqudsmarket.ps</span>
                </a>
              </li>
            </ul>

            {/* COD badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-50 px-3 py-2">
              <span className="text-lg">💵</span>
              <span className="text-xs font-semibold text-brand-700">
                {t('common.cashOnDelivery')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-foreground-subtle">
            &copy; {currentYear} {t('common.appName')} — {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground-muted"
            >
              {t('footer.privacyPolicy')}
            </Link>
            <Link
              to="/terms"
              className="text-xs text-foreground-subtle transition-colors hover:text-foreground-muted"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
