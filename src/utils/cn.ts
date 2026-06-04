import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string using `clsx` for conditional class
 * name handling and `twMerge` for Tailwind CSS class merging. This function is useful for
 * conditionally adding class names and merging Tailwind CSS classes to ensure no conflicts.
 *
 * @param inputs - An array of class names or expressions that resolve to class names.
 * @returns A single string with merged class names.
 */
export default function cn(...inputs: string[]): string {
  return twMerge(clsx(inputs));
}
