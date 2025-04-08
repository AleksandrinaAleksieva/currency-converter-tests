/**
 * Generates a random balance between min and max.
 */
export function generateRandomBalance(min: number = 1, max: number = 10000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }