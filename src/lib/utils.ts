import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class names safely, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a currency string (defaults to Egyptian Pound EGP).
 */
export function formatCurrency(
  amount: number,
  locale: string = 'ar-EG',
  currency: string = 'EGP'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a price with the appropriate Egyptian Pound currency label (جنيه مصري / EGP).
 */
export function formatPrice(amount: number, lang: 'ar' | 'en' = 'ar'): string {
  const formatted = amount.toFixed(2);
  return lang === 'ar' ? `${formatted} جنيه مصري` : `${formatted} EGP`;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns the text content for the current locale.
 * Falls back to `en` if `ar` is not available.
 */
export function localizedText(
  ar: string | undefined | null,
  en: string | undefined | null,
  lang: 'ar' | 'en'
): string {
  if (lang === 'ar') return ar || en || '';
  return en || ar || '';
}

/**
 * Simple debounce utility.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
