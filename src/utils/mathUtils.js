/**
 * Simple utility functions for demonstration of unit testing.
 */

/**
 * Adds two numbers.
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export const add = (a, b) => {
  return a + b;
};

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} numbers 
 * @returns {number}
 */
export const calculateAverage = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
};
