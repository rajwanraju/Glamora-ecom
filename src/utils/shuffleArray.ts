/**
 * Shuffles an array in place, using the Fisher-Yates algorithm.
 *
 * @param {any[]} array The array to shuffle.
 * @returns {any[]} The shuffled array.
 */
export default function shuffleArray(array: any[]): any[] {
  const shuffled = [...array];

  for (let i = shuffled?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
