/**
 * Format a number as a US dollar amount.
 *
 * @param amount the number to format
 * @returns the formatted string
 */
export function formatCurrencyUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a string input to a standard US phone number format.
 *
 * @param value - The input string containing the phone number.
 *                It may include non-numeric characters.
 * @returns A string representing the formatted phone number.
 *          Formats as (XXX) XXX-XXXX if more than 6 digits,
 *          (XXX) XXX if 4-6 digits, or just the digits if 3 or fewer.
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

/**
 * Formats a number to a US number format.
 *
 * @param num - The number to format.
 * @returns The formatted number.
 *
 * @example
 * formatNumberUS(1000000) // "1,000,000"
 * formatNumberUS(1000000000) // "1,000,000,000"
 * formatNumberUS(1000000000000) // "1,000,000,000,000"
 */
export function formatNumberUS(num: number | string): string {
  const number = typeof num === 'number' ? num : parseFloat(num);
  return number.toLocaleString('en-US');
}

/**
 * Formats a number to a short number format.
 *
 * @param num - The number to format.
 * @returns The formatted number.
 *
 * @example
 * formatNumberShort(1000000) // "1M"
 * formatNumberShort(1000000000) // "1B"
 * formatNumberShort(1000000000000) // "1T"
 */
export function formatNumberShort(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}
