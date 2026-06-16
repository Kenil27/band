/**
 * Capitalizes the first letter of a string.
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
  if (typeof str !== "string" || str.length === 0) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates a string to a specified length and appends an ellipsis.
 * @param {string} str 
 * @param {number} length 
 * @returns {string}
 */
export const truncate = (str, length) => {
  if (typeof str !== "string") return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
};
