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

/**
 * Groups an array of objects by a given key.
 * @param {Object[]} arr
 * @param {string} key
 * @returns {Object}
 */
export const groupBy = (arr, key) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  if (typeof key !== "string" || !key) {
    throw new Error("Key must be a non-empty string");
  }
  return arr.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Chunks an array into smaller arrays of the given size.
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
export const chunk = (arr, size) => {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  if (typeof size !== "number" || !Number.isInteger(size) || size <= 0) {
    throw new Error("Size must be a positive integer");
  }
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
