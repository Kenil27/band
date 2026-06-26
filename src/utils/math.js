/**
 * Adds two numbers together.
 * @param {number} a
 * @param {number} b
 * @returns {number} The sum of a and b.
 */
export const add = (a, b) => {
  return Number(a) + Number(b);
};

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} The difference.
 */
export const subtract = (a, b) => {
  return Number(a) - Number(b);
};

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} The product.
 */
export const multiply = (a, b) => {
  return Number(a) * Number(b);
};

/**
 * Divides the first number by the second.
 * @param {number} a
 * @param {number} b
 * @returns {number} The quotient.
 * @throws {Error} If dividing by zero.
 */
export const divide = (a, b) => {
  const numB = Number(b);
  if (numB === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return Number(a) / numB;
};

/**
 * Sums an array of numbers.
 * @param {Array<number>} arr - Array of numbers to sum.
 * @returns {number} The sum of all elements.
 */
export const sum = (arr) => {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return arr.reduce((acc, current) => acc + (Number(current) || 0), 0);
};

/**
 * Computes the average/mean of an array of numbers.
 * @param {Array<number>} arr - Array of numbers.
 * @returns {number} The average of the elements, or 0 if array is empty/invalid.
 */
export const average = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  return sum(arr) / arr.length;
};
