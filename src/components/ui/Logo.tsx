import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Size in pixels for the icon container */
  size?: 'sm' | 'md' | 'lg';
  /** Show the wordmark text alongside the icon */
  showText?: boolean;
  /** Override text color */
  textClassName?: string;
}

const sizes = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
};

const textSizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
};

/**
 * Al Quds Market brand logo.
 * Renders the icon mark with optional wordmark.
 */
export default function Logo({
  className,
  size = 'md',
  showText = true,
  textClassName,
}: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Icon mark */}
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-brand-700 p-1.5',
          sizes[size]
        )}
        aria-hidden="true"
      >
        <img
          src="/logo.jpg"
          alt=""
          className="h-full w-full rounded-lg object-contain"
        />
      </div>

      {/* Wordmark */}
      {showText && (
        <span
          className={cn(
            'font-bold leading-none text-brand-700',
            textSizes[size],
            textClassName
          )}
        >
          القدس ماركت
        </span>
      )}
    </div>
  );
}
