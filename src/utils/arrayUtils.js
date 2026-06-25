/**
 * Array utility functions.
 */

/**
 * Returns unique elements from an array.
 * @param {Array} arr
 * @returns {Array}
 */
export const unique = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return [...new Set(arr)];
};

/**
 * Flattens a nested array by one level.
 * @param {Array} arr
 * @returns {Array}
 */
export const flatten = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return arr.reduce((acc, val) => acc.concat(val), []);
};