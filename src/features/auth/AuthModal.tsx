import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useAuthStore } from './store';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Logo from '@/components/ui/Logo';

export default function AuthModal() {
  const { t } = useTranslation();
  const isOpen = useAuthStore((s) => s.isAuthModalOpen);
  const view = useAuthStore((s) => s.authModalView);
  const close = useAuthStore((s) => s.closeAuthModal);
  const openView = useAuthStore((s) => s.openAuthModal);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl animate-slide-up border border-surface-border max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute end-4 top-4 rounded-xl p-2 text-foreground-subtle hover:bg-surface-subtle hover:text-foreground"
          aria-label={t('common.cancel')}
        >
          <X size={20} />
        </button>

        {/* Brand header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Logo size="lg" showText={false} />
          <h2 className="mt-3 text-2xl font-bold text-foreground">
            {view === 'login' ? t('auth.loginTitle') : t('auth.signupTitle')}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">
            {t('common.tagline')}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-surface-muted p-1 mb-6 border border-surface-border">
          <button
            type="button"
            onClick={() => openView('login')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
              view === 'login'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            {t('auth.loginTitle')}
          </button>
          <button
            type="button"
            onClick={() => openView('signup')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
              view === 'signup'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            {t('auth.signupTitle')}
          </button>
        </div>

        {/* View render */}
        {view === 'login' ? (
          <LoginForm
            onSuccess={close}
            onSwitchToSignup={() => openView('signup')}
          />
        ) : (
          <SignUpForm
            onSuccess={close}
            onSwitchToLogin={() => openView('login')}
          />
        )}
      </div>
    </div>
  );
}
