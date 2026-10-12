import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import i18n from '@/lib/i18n';
import { useAuthStore } from './store';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignUpForm({
  onSuccess,
  onSwitchToLogin,
}: SignUpFormProps) {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg(
        i18n.language === 'ar'
          ? 'كلمات المرور غير متطابقة'
          : 'Passwords do not match'
      );
      return;
    }

    if (password.length < 6) {
      setErrorMsg(
        i18n.language === 'ar'
          ? 'يجب أن لا تقل كلمة المرور عن 6 أحرف'
          : 'Password must be at least 6 characters'
      );
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            preferred_language: i18n.language,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      if (data.user) {
        // If session was established immediately (no confirm required)
        if (data.session) {
          await refreshProfile();
          onSuccess?.();
        } else {
          // Email confirmation is required by Supabase settings
          setIsSuccess(true);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error occurred';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-2xl">
          ✓
        </div>
        <h3 className="text-lg font-bold text-foreground">
          {i18n.language === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account Created Successfully!'}
        </h3>
        <p className="text-sm text-foreground-muted">
          {i18n.language === 'ar'
            ? 'يرجى مراجعة بريدك الإلكتروني لتأكيد حسابك وتسجيل الدخول.'
            : 'Please check your email to verify your account and sign in.'}
        </p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="btn-primary w-full mt-4"
        >
          {t('auth.loginTitle')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {errorMsg && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 animate-fade-in">
          {errorMsg}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {t('auth.fullName')}
        </label>
        <div className="relative">
          <User className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={i18n.language === 'ar' ? 'محمد خليل' : 'Mohammad Khalil'}
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-4 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {t('auth.phone')}
        </label>
        <div className="relative">
          <Phone className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="059-XXXXXXX"
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-4 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

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
        <label className="mb-1 block text-sm font-medium text-foreground">
          {t('auth.password')}
        </label>
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

      {/* Confirm Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">
          {t('auth.confirmPassword')}
        </label>
        <div className="relative">
          <Lock className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-4 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3 mt-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>{t('common.loading')}</span>
          </>
        ) : (
          t('auth.signupTitle')
        )}
      </button>

      {/* Switch to Login */}
      {onSwitchToLogin && (
        <div className="text-center text-sm text-foreground-muted pt-1">
          <span>{t('auth.hasAccount')} </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-brand-700 hover:underline"
          >
            {t('auth.loginTitle')}
          </button>
        </div>
      )}
    </form>
  );
}
