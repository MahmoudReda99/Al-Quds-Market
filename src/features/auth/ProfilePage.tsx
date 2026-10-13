import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  User,
  Mail,
  Phone,
  Globe,
  LogOut,
  ShoppingBag,
  Heart,
  Shield,
  Save,
  CheckCircle,
} from 'lucide-react';
import { useAuthStore } from './store';
import { supabase } from '@/lib/supabase';
import i18n from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

export default function ProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, signOut, refreshProfile } = useAuthStore();
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 mb-4">
          <User size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {t('common.account')}
        </h2>
        <p className="mt-2 text-sm text-foreground-muted">
          {i18n.language === 'ar'
            ? 'يرجى تسجيل الدخول للوصول إلى تفاصيل حسابك وطلباتك السابقة.'
            : 'Please log in to view your profile details and past orders.'}
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="btn-primary mt-6 w-full"
        >
          {t('auth.loginTitle')}
        </button>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          phone: phone.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (!error) {
        await refreshProfile();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-surface-border pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">
            {t('common.account')}
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            {profile?.email || user.email}
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="btn-outline flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
          {t('common.logout')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Navigation cards / quick links */}
        <div className="space-y-3">
          <Link
            to="/orders"
            className="flex items-center gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-card card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {t('common.orders')}
              </h3>
              <p className="text-xs text-foreground-muted">
                {i18n.language === 'ar' ? 'عرض ومتابعة طلباتك' : 'View order history'}
              </p>
            </div>
          </Link>

          <Link
            to="/favorites"
            className="flex items-center gap-3 rounded-2xl border border-surface-border bg-white p-4 shadow-card card-hover"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Heart size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                {t('common.favorites')}
              </h3>
              <p className="text-xs text-foreground-muted">
                {i18n.language === 'ar' ? 'المنتجات المحفوظة' : 'Saved products'}
              </p>
            </div>
          </Link>

          {profile?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 shadow-card card-hover"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-900">
                  {i18n.language === 'ar' ? 'لوحة تحكم المشغل والإدارة' : 'Operator & Admin Dashboard'}
                </h3>
                <p className="text-xs text-brand-700">
                  {i18n.language === 'ar' ? 'إدارة الطلبات، التوصيل، والمنتجات' : 'Orders dispatch, delivery & catalog'}
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Profile Edit Form */}
        <div className="md:col-span-2">
          <form
            onSubmit={handleUpdateProfile}
            className="rounded-2xl border border-surface-border bg-white p-6 shadow-card space-y-4"
          >
            <h2 className="text-lg font-bold text-foreground mb-4">
              {i18n.language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
            </h2>

            {saveSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-brand-50 border border-brand-200 p-3 text-sm font-medium text-brand-700">
                <CheckCircle size={18} />
                <span>{i18n.language === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changes saved successfully'}</span>
              </div>
            )}

            {/* Email (Readonly) */}
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
                <input
                  type="email"
                  disabled
                  value={profile?.email || user.email || ''}
                  className="w-full rounded-xl border border-surface-border bg-surface-subtle py-2.5 pe-4 ps-10 text-sm text-foreground-muted cursor-not-allowed"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <User className="absolute start-3 top-1/2 -translate-y-1/2 text-foreground-subtle" size={18} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface-muted py-2.5 pe-4 ps-10 text-sm focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {/* Language Preference */}
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {i18n.language === 'ar' ? 'اللغة المفضلة' : 'Preferred Language'}
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => i18n.changeLanguage('ar')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                    i18n.language === 'ar'
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-surface-border bg-white text-foreground-muted hover:border-brand-200'
                  }`}
                >
                  <Globe size={16} />
                  <span>العربية</span>
                </button>
                <button
                  type="button"
                  onClick={() => i18n.changeLanguage('en')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                    (i18n.language as SupportedLanguage) === 'en'
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-surface-border bg-white text-foreground-muted hover:border-brand-200'
                  }`}
                >
                  <Globe size={16} />
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary w-full sm:w-auto"
              >
                <Save size={16} />
                <span>{isSaving ? t('common.loading') : t('common.save')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
