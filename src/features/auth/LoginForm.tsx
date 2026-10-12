import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './store';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: LoginFormProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.user) {
        await refreshProfile();
        onSuccess?.();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 animate-fade-in">
          {errorMsg}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {t('auth.email')}
        </label>
        <div className="relative">
          <Mail className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-4 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {t('auth.password')}
          </label>
          {onSwitchToForgotPassword && (
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-xs text-brand-700 hover:underline"
            >
              {t('auth.forgotPassword')}
            </button>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-10 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>{t('common.loading')}</span>
          </>
        ) : (
          t('auth.loginTitle')
        )}
      </button>

      {/* Switch to Signup */}
      {onSwitchToSignup && (
        <div className="text-center text-sm text-foreground-muted">
          <span>{t('auth.noAccount')} </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-brand-700 hover:underline"
          >
            {t('auth.createAccount')}
          </button>
        </div>
      )}
    </form>
  );
}
