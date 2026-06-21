import test from 'node:test';
import assert from 'node:assert/strict';
import {
  add,
  calculateAverage,
  isPrime,
  factorial,
  fibonacci,
  gcd,
} from '../../src/utils/mathUtils.js';

test('add and calculateAverage return expected numeric results', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(calculateAverage([2, 4, 6, 8]), 5);
});

test('calculateAverage returns 0 for invalid or empty input', () => {
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage('not-an-array'), 0);
});

test('isPrime correctly handles invalid, composite, and prime numbers', () => {
  assert.equal(isPrime(2.5), false);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(13), true);
});

test('factorial, fibonacci, and gcd handle core cases and validation', () => {
  assert.equal(factorial(5), 120);
  assert.throws(() => factorial(-1), /Input must be a non-negative integer/);

  assert.equal(fibonacci(7), 13);
  assert.throws(() => fibonacci(1.2), /Input must be a non-negative integer/);

  assert.equal(gcd(-48, 18), 6);
  assert.throws(() => gcd(10, 2.5), /Inputs must be integers/);
});