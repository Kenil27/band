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

/**
 * Checks if a number is prime.
 * @param {number} num 
 * @returns {boolean}
 */
export const isPrime = (num) => {
  if (typeof num !== "number" || !Number.isInteger(num)) return false;
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

