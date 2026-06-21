import { add, calculateAverage, isPrime, factorial, fibonacci } from "../mathUtils";

describe("mathUtils", () => {
  describe("add", () => {
    test("should correctly add two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("should correctly add negative numbers", () => {
      expect(add(-1, -5)).toBe(-6);
    });

    test("should correctly add positive and negative numbers", () => {
      expect(add(-1, 5)).toBe(4);
    });
  });

  describe("calculateAverage", () => {
    test("should return the correct average of an array of numbers", () => {
      expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
    });

    test("should return 0 for an empty array", () => {
      expect(calculateAverage([])).toBe(0);
    });

    test("should return 0 for non-array inputs", () => {
      expect(calculateAverage(null)).toBe(0);
      expect(calculateAverage(undefined)).toBe(0);
    });
  });

  describe("isPrime", () => {
    test("should return true for prime numbers", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });

    test("should return false for non-prime numbers", () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    test("should return false for negative numbers", () => {
      expect(isPrime(-5)).toBe(false);
    });

    test("should return false for non-integer or invalid types", () => {
      expect(isPrime(3.5)).toBe(false);
      expect(isPrime("5")).toBe(false);
      expect(isPrime(null)).toBe(false);
    });
  });

  describe("factorial", () => {
    test("should calculate the factorial of 0 and 1 correctly", () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
    });

    test("should calculate the factorial of positive integers correctly", () => {
      expect(factorial(5)).toBe(120);
    });

    test("should throw an error for negative integers", () => {
      expect(() => factorial(-1)).toThrow("Input must be a non-negative integer");
    });

    test("should throw an error for non-integers or invalid types", () => {
      expect(() => factorial(3.5)).toThrow("Input must be a non-negative integer");
      expect(() => factorial("5")).toThrow();
    });
  });

  describe("fibonacci", () => {
    test("should calculate the fibonacci number at index 0 and 1 correctly", () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
    });

    test("should calculate the fibonacci numbers correctly", () => {
      expect(fibonacci(5)).toBe(5);
      expect(fibonacci(10)).toBe(55);
    });

    test("should throw an error for negative indexes", () => {
      expect(() => fibonacci(-1)).toThrow("Input must be a non-negative integer");
    });

    test("should throw an error for non-integers or invalid types", () => {
      expect(() => fibonacci(4.2)).toThrow("Input must be a non-negative integer");
      expect(() => fibonacci("5")).toThrow();
    });
  });
});
