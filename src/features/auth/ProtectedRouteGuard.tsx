import { useEffect } from 'react';
import { useAuthStore } from './store';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteGuardProps {
  children: React.ReactNode;
}

/**
 * Route guard that requires the user to be authenticated.
 * Opens the login modal if unauthenticated.
 */
export default function ProtectedRouteGuard({ children }: ProtectedRouteGuardProps) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const openAuthModal = useAuthStore((s) => s.openAuthModal);

  useEffect(() => {
    if (!isLoading && !user) {
      openAuthModal('login');
    }
  }, [isLoading, user, openAuthModal]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-bold text-foreground">
          يرجى تسجيل الدخول للمتابعة
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Please log in to access this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
