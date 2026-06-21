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
} from '../mathUtils.js';

test('add correctly handles positive, negative, and mixed numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, -5), -6);
  assert.equal(add(-1, 5), 4);
});

test('calculateAverage returns the average for arrays and 0 for invalid inputs', () => {
  assert.equal(calculateAverage([1, 2, 3, 4, 5]), 3);
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage(null), 0);
  assert.equal(calculateAverage(undefined), 0);
});

test('isPrime identifies prime and non-prime values across edge cases', () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(5), true);
  assert.equal(isPrime(7), true);
  assert.equal(isPrime(11), true);

  assert.equal(isPrime(0), false);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(-5), false);
  assert.equal(isPrime(3.5), false);
  assert.equal(isPrime('5'), false);
  assert.equal(isPrime(null), false);
  assert.equal(isPrime(25), false);
});

test('factorial returns expected values and throws for invalid input', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);

  assert.throws(
    () => factorial(-1),
    /Input must be a non-negative integer/
  );
  assert.throws(
    () => factorial(3.5),
    /Input must be a non-negative integer/
  );
  assert.throws(
    () => factorial('5'),
    /Input must be a non-negative integer/
  );
});

test('fibonacci returns expected sequence values and throws for invalid input', () => {
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(5), 5);
  assert.equal(fibonacci(10), 55);

  assert.throws(
    () => fibonacci(-1),
    /Input must be a non-negative integer/
  );
  assert.throws(
    () => fibonacci(4.2),
    /Input must be a non-negative integer/
  );
  assert.throws(
    () => fibonacci('5'),
    /Input must be a non-negative integer/
  );
});

test('gcd computes greatest common divisor for positive, negative, and zero values', () => {
  assert.equal(gcd(54, 24), 6);
  assert.equal(gcd(-54, 24), 6);
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(0, 0), 0);
});

test('gcd throws when inputs are not integers', () => {
  assert.throws(() => gcd(3.5, 2), /Inputs must be integers/);
  assert.throws(() => gcd('6', 3), /Inputs must be integers/);
});

test('lcm computes least common multiple and handles zero and negative values', () => {
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(-4, 6), 12);
  assert.equal(lcm(0, 6), 0);
});

test('lcm throws when inputs are not integers', () => {
  assert.throws(() => lcm(2.5, 5), /Inputs must be integers/);
  assert.throws(() => lcm(2, '5'), /Inputs must be integers/);
});