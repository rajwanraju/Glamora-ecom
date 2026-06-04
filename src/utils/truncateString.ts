/**
 * Truncates a given string to a specified maximum length, appending an ellipsis if it exceeds that length.
 *
 * @param {string} str The string to truncate.
 * @param {number} maxLength The maximum length of the string.
 * @return {string} A truncated version of the string.
 */
export function truncateStringEnd(str: string, maxLength: number): string {
  if (str?.length > maxLength) {
    return `${str.slice(0, maxLength)}...`;
  }
  return str;
}

/**
 * Truncates a given string to a specified maximum length, inserting an ellipsis in the middle to
 * indicate that the string has been shortened.
 *
 * @param {string} str The string to truncate.
 * @param {number} max The maximum length of the string.
 * @param {string} sep The string to insert in place of the omitted characters.
 * @return {string} A truncated version of the string.
 */
export function truncateStringMiddle(str: string, max: number, sep: string): string {
  max = max || 10;

  const len = str?.length;
  if (len > max) {
    sep = sep || '...';
    const sepLen = sep?.length;

    if (sepLen > max) {
      return str?.substr(len - max);
    }

    const n = -0.5 * (max - len - sepLen);
    const center = len / 2;
    const front = str?.substr(0, center - n);
    const back = str?.substr(len - center + n);
    return front + sep + back;
  }
  return str;
}
