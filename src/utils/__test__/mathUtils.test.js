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
} from '../mathUtils.js';

test('add correctly handles positive, negative, and mixed numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, -5), -6);
  assert.equal(add(-1, 5), 4);
});

test('calculateAverage returns averages for arrays and 0 for invalid inputs', () => {
  assert.equal(calculateAverage([1, 2, 3, 4, 5]), 3);
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage(null), 0);
  assert.equal(calculateAverage(undefined), 0);
  assert.equal(calculateAverage([2, 4]), 3);
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

test('factorial and fibonacci compute valid values and reject invalid input', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
  assert.throws(() => factorial(-1), /Input must be a non-negative integer/);
  assert.throws(() => factorial(3.5), /Input must be a non-negative integer/);
  assert.throws(() => factorial('5'), /Input must be a non-negative integer/);

  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(5), 5);
  assert.equal(fibonacci(10), 55);
  assert.equal(fibonacci(2), 1);
  assert.throws(() => fibonacci(-1), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci(4.2), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci('5'), /Input must be a non-negative integer/);
});

test('gcd and lcm handle integers, zero, negatives, and invalid inputs', () => {
  assert.equal(gcd(48, 18), 6);
  assert.equal(gcd(-48, 18), 6);
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(0, 0), 0);
  assert.throws(() => gcd(3.5, 2), /Inputs must be integers/);
  assert.throws(() => gcd('4', 2), /Inputs must be integers/);

  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(-4, 6), 12);
  assert.equal(lcm(0, 6), 0);
  assert.throws(() => lcm(2.5, 6), /Inputs must be integers/);
  assert.throws(() => lcm(4, '6'), /Inputs must be integers/);
});

test('clamp returns bounded values and throws for invalid arguments', () => {
  assert.equal(clamp(5, 1, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
  assert.throws(() => clamp('5', 0, 10), /All inputs must be numbers/);
  assert.throws(() => clamp(5, '0', 10), /All inputs must be numbers/);
  assert.throws(() => clamp(5, 10, 0), /Min value cannot be greater than max value/);
});