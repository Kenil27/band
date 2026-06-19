/**
 * Math utility functions.
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

/**
 * Calculates the factorial of a non-negative integer.
 * @param {number} n 
 * @returns {number}
 */
export const factorial = (n) => {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    throw new Error("Input must be a non-negative integer");
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
