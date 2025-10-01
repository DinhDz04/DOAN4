import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge and conditionally apply Tailwind CSS classes
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Simple alternative without clsx dependency
export function cnSimple(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 
