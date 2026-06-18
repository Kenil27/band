import test from 'node:test';
import assert from 'node:assert/strict';
import {
  add,
  calculateAverage,
  isPrime,
  factorial,
  fibonacci,
  gcd,
  lcm,
  clamp,
} from '../../src/utils/mathUtils.js';

test('add and calculateAverage return expected numeric results', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(calculateAverage([2, 4, 6, 8]), 5);
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage('not-an-array'), 0);
});

test('isPrime correctly identifies prime and non-prime values', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(2.5), false);
});

test('factorial and fibonacci compute sequence values and reject invalid input', () => {
  assert.equal(factorial(5), 120);
  assert.equal(fibonacci(7), 13);
  assert.throws(() => factorial(-1), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci(1.2), /Input must be a non-negative integer/);
});

test('gcd, lcm, and clamp handle edge cases and validation', () => {
  assert.equal(gcd(-54, 24), 6);
  assert.equal(lcm(0, 5), 0);
  assert.equal(lcm(6, 8), 24);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(-2, 0, 10), 0);
  assert.throws(() => clamp(5, 10, 0), /Min value cannot be greater than max value/);
});