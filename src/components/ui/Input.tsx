import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-11 w-full rounded-xl border border-surface-border bg-surface-muted px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-subtle focus-visible:outline-none focus-visible:border-brand-600 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error && 'border-red-400 focus-visible:border-red-600 focus-visible:ring-red-500/20',
            className
          )}
          ref={ref}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600 animate-fade-in">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-foreground-subtle">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
