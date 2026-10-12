import { Navigate } from 'react-router-dom';
import { useAuthStore } from './store';
import { Loader2 } from 'lucide-react';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

/**
 * Route guard that only permits authenticated users with role = 'admin'.
 * Redirects unauthorized users to the homepage.
 */
export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </div>
    );
  }

  // If not logged in, or role is not admin, deny access
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700 text-3xl">
          🛡️
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          غير مصرح | Unauthorized
        </h2>
        <p className="mt-2 text-sm text-foreground-muted">
          هذه الصفحة مخصصة لمدراء النظام فقط.
          <br />
          This area is restricted to system administrators only.
        </p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
}
