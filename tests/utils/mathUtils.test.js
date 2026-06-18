import test from 'node:test';
import assert from 'node:assert/strict';
import {
  add,
  calculateAverage,
  isPrime,
  factorial,
  fibonacci,
} from '../../src/utils/mathUtils.js';

test('add sums numbers and calculateAverage returns the mean for a numeric array', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 10), 6);
  assert.equal(calculateAverage([2, 4, 6, 8]), 5);
});

test('calculateAverage returns 0 for invalid or empty input', () => {
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage('not-an-array'), 0);
  assert.equal(calculateAverage(null), 0);
});

test('isPrime correctly identifies prime and non-prime values', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(17), true);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(2.5), false);
});

test('factorial and fibonacci compute valid values and reject invalid input', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(5), 120);
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(7), 13);

  assert.throws(() => factorial(-1), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci(1.2), /Input must be a non-negative integer/);
});