import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-black text-brand-100">404</div>
      <h1 className="mt-4 text-2xl font-bold text-foreground">
        الصفحة غير موجودة | Page Not Found
      </h1>
      <p className="mt-2 text-sm text-foreground-muted">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        <br />
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <Home size={18} />
        {t('common.home')}
      </Link>
    </div>
  );
}
