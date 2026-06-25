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