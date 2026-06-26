import {
  safeMatch,
  fuzzyMatch,
  isValidEmail,
  isValidUrl,
  extractDriveId,
  normalizeString,
} from "../match";

describe("match utils", () => {
  describe("safeMatch", () => {
    it("should return the correct capture group when match is successful", () => {
      expect(safeMatch("id=12345", /id=([0-9]+)/, 1)).toBe("12345");
      expect(safeMatch("hello world", /(hello) (world)/, 2)).toBe("world");
    });

    it("should return the full match when no group index is provided", () => {
      expect(safeMatch("id=12345", /id=[0-9]+/)).toBe("id=12345");
    });

    it("should return null if no match is found", () => {
      expect(safeMatch("no-match", /id=([0-9]+)/, 1)).toBeNull();
    });

    it("should return null if string input is invalid", () => {
      expect(safeMatch(null, /id=([0-9]+)/)).toBeNull();
      expect(safeMatch(undefined, /id=([0-9]+)/)).toBeNull();
      expect(safeMatch(12345, /id=([0-9]+)/)).toBeNull();
    });
  });

  describe("fuzzyMatch", () => {
    it("should match strings fuzzily (characters in order)", () => {
      expect(fuzzyMatch("John Doe", "jd")).toBe(true);
      expect(fuzzyMatch("John Doe", "joe")).toBe(true);
      expect(fuzzyMatch("John Doe", "John")).toBe(true);
      expect(fuzzyMatch("Samarpan", "smpn")).toBe(true);
    });

    it("should return false if characters are not in order", () => {
      expect(fuzzyMatch("John Doe", "dj")).toBe(false);
      expect(fuzzyMatch("Samarpan", "snmp")).toBe(false);
    });

    it("should return true for an empty pattern", () => {
      expect(fuzzyMatch("John Doe", "")).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect(fuzzyMatch("John Doe", "JDOE")).toBe(true);
    });

    it("should return false for invalid inputs", () => {
      expect(fuzzyMatch(null, "pattern")).toBe(false);
      expect(fuzzyMatch("target", null)).toBe(false);
    });
  });

  describe("isValidEmail", () => {
    it("should return true for valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@sub.domain.org")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(isValidEmail("plainaddress")).toBe(false);
      expect(isValidEmail("@missing-username.com")).toBe(false);
      expect(isValidEmail("username@.com")).toBe(false);
      expect(isValidEmail("username@domain")).toBe(false);
      expect(isValidEmail("username@domain..com")).toBe(false);
    });

    it("should return false for invalid inputs", () => {
      expect(isValidEmail(null)).toBe(false);
      expect(isValidEmail(123)).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should return true for valid HTTP/HTTPS URLs", () => {
      expect(isValidUrl("http://google.com")).toBe(true);
      expect(isValidUrl("https://example.com/path?query=val")).toBe(true);
    });

    it("should return false for invalid or unsupported protocol URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("ftp://files.example.com")).toBe(false);
      expect(isValidUrl("mailto:test@example.com")).toBe(false);
    });

    it("should return false for invalid inputs", () => {
      expect(isValidUrl(null)).toBe(false);
      expect(isValidUrl({})).toBe(false);
    });
  });

  describe("extractDriveId", () => {
    it("should extract ID from query string", () => {
      expect(
        extractDriveId("https://drive.google.com/open?id=1A2b3C4d5E_6F7g8H9i0J_kLmNo")
      ).toBe("1A2b3C4d5E_6F7g8H9i0J_kLmNo");
      expect(
        extractDriveId("https://drive.google.com/file/d/1A2b3C4d5E_6F7g8H9i0J_kLmNo/view?usp=sharing")
      ).toBe("1A2b3C4d5E_6F7g8H9i0J_kLmNo");
    });

    it("should handle raw id parameters", () => {
      expect(extractDriveId("id=some_file_id")).toBe("some_file_id");
    });

    it("should extract ID from path without query parameter", () => {
      expect(
        extractDriveId("https://drive.google.com/file/d/some_other_id_123")
      ).toBe("some_other_id_123");
    });

    it("should return empty string if no valid pattern is matched", () => {
      expect(extractDriveId("https://google.com")).toBe("");
      expect(extractDriveId("invalid-link")).toBe("");
    });

    it("should return empty string for non-string or empty input", () => {
      expect(extractDriveId("")).toBe("");
      expect(extractDriveId(null)).toBe("");
    });
  });

  describe("normalizeString", () => {
    it("should trim and lowercase standard inputs", () => {
      expect(normalizeString("  Hello World  ")).toBe("hello world");
    });

    it("should remove special characters if option is enabled", () => {
      expect(normalizeString("  Hello, World! 123 --", { removeSpecialChars: true })).toBe("helloworld123");
    });

    it("should return empty string for invalid inputs", () => {
      expect(normalizeString(null)).toBe("");
      expect(normalizeString(1234)).toBe("");
    });
  });
});
