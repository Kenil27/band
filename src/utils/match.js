/**
 * Safely executes a regular expression match on a string.
 * @param {string} str - The string to search.
 * @param {RegExp} regex - The regular expression.
 * @param {number} groupIndex - The index of the capture group to return (default 0 for full match).
 * @returns {string|null} The matched substring/group, or null if no match.
 */
export const safeMatch = (str, regex, groupIndex = 0) => {
  if (typeof str !== "string" || !(regex instanceof RegExp)) {
    return null;
  }
  const match = str.match(regex);
  if (!match) {
    return null;
  }
  return match[groupIndex] !== undefined ? match[groupIndex] : null;
};

/**
 * Performs a simple fuzzy match checking if the characters of a pattern
 * appear sequentially (not necessarily contiguously) within the target string.
 * @param {string} str - The target string to search in.
 * @param {string} pattern - The pattern to look for.
 * @returns {boolean} True if pattern matches fuzzily, false otherwise.
 */
export const fuzzyMatch = (str, pattern) => {
  if (typeof str !== "string" || typeof pattern !== "string") {
    return false;
  }
  const cleanStr = str.toLowerCase();
  const cleanPattern = pattern.toLowerCase();
  
  if (cleanPattern === "") return true;
  
  let patternIdx = 0;
  for (let i = 0; i < cleanStr.length; i++) {
    if (cleanStr[i] === cleanPattern[patternIdx]) {
      patternIdx++;
    }
    if (patternIdx === cleanPattern.length) {
      return true;
    }
  }
  return false;
};

/**
 * Validates whether a string matches a standard email pattern.
 * @param {string} email - The email string.
 * @returns {boolean} True if valid email, false otherwise.
 */
export const isValidEmail = (email) => {
  if (typeof email !== "string") {
    return false;
  }
  // Standard email format validation regex rejecting consecutive dots in domain
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates whether a string is a correctly formatted HTTP/HTTPS URL.
 * @param {string} url - The URL string.
 * @returns {boolean} True if valid, false otherwise.
 */
export const isValidUrl = (url) => {
  if (typeof url !== "string") {
    return false;
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_) {
    return false;
  }
};

/**
 * Safely extracts a Google Drive file ID from a link.
 * Handles both query parameters (id=...) and path patterns (/d/.../view).
 * @param {string} driveLink - The sharing URL.
 * @returns {string} The extracted file ID, or an empty string if not found.
 */
export const extractDriveId = (driveLink) => {
  if (typeof driveLink !== "string" || driveLink.trim() === "") {
    return "";
  }
  // Case 1: URL has a query parameter like ?id=FILE_ID
  const idParamMatch = safeMatch(driveLink, /[?&]id=([a-zA-Z0-9_-]+)/, 1);
  if (idParamMatch) {
    return idParamMatch;
  }
  
  // Case 2: URL has direct ID assignment id=FILE_ID (without leading ?/&)
  const directIdMatch = safeMatch(driveLink, /id=([a-zA-Z0-9_-]+)/, 1);
  if (directIdMatch) {
    return directIdMatch;
  }

  // Case 3: URL has a path structure like /d/FILE_ID/view
  const dPathMatch = safeMatch(driveLink, /\/d\/([a-zA-Z0-9_-]+)/, 1);
  if (dPathMatch) {
    return dPathMatch;
  }

  return "";
};

/**
 * Normalizes a string by trimming whitespace and lowercasing it.
 * Optionally removes all non-alphanumeric characters.
 * @param {string} str - The input string.
 * @param {Object} options - Normalization options.
 * @param {boolean} options.removeSpecialChars - Remove special characters if true.
 * @returns {string} The normalized string.
 */
export const normalizeString = (str, options = {}) => {
  if (typeof str !== "string") {
    return "";
  }
  let result = str.trim().toLowerCase();
  if (options.removeSpecialChars) {
    result = result.replace(/[^a-z0-9]/g, "");
  }
  return result;
};
