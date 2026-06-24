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

/**
 * Calculates the n-th Fibonacci number.
 * @param {number} n - Non-negative integer index.
 * @returns {number} The Fibonacci number at index n.
 */
export const fibonacci = (n) => {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    throw new Error("Input must be a non-negative integer");
  }
  if (n === 0) return 0;
  if (n === 1) return 1;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
};

/**
 * Calculates the Greatest Common Divisor (GCD) of two integers.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} The greatest common divisor.
 */
export const gcd = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number" || !Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("Inputs must be integers");
  }
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
};

/**
 * Calculates the Least Common Multiple (LCM) of two integers.
 * @param {number} a 
 * @param {number} b 
 * @returns {number} The least common multiple.
 */
export const lcm = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number" || !Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("Inputs must be integers");
  }
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} The clamped value.
 */
export const clamp = (val, min, max) => {
  if (typeof val !== "number" || typeof min !== "number" || typeof max !== "number") {
    throw new Error("All inputs must be numbers");
  }
  if (min > max) {
    throw new Error("Min value cannot be greater than max value");
  }
  return Math.min(Math.max(val, min), max);
};
