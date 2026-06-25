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
  round,
} from '../mathUtils.js';

test('add correctly handles positive, negative, and mixed numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-1, -5), -6);
  assert.equal(add(-1, 5), 4);
});

test('calculateAverage returns averages and handles empty or invalid inputs', () => {
  assert.equal(calculateAverage([1, 2, 3, 4, 5]), 3);
  assert.equal(calculateAverage([]), 0);
  assert.equal(calculateAverage(null), 0);
  assert.equal(calculateAverage(undefined), 0);
});

test('isPrime identifies prime and non-prime values including invalid inputs', () => {
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
});

test('factorial computes valid values and throws for invalid inputs', () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);

  assert.throws(() => factorial(-1), /Input must be a non-negative integer/);
  assert.throws(() => factorial(3.5), /Input must be a non-negative integer/);
  assert.throws(() => factorial('5'), /Input must be a non-negative integer/);
});

test('fibonacci computes sequence values and throws for invalid inputs', () => {
  assert.equal(fibonacci(0), 0);
  assert.equal(fibonacci(1), 1);
  assert.equal(fibonacci(5), 5);
  assert.equal(fibonacci(10), 55);

  assert.throws(() => fibonacci(-1), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci(4.2), /Input must be a non-negative integer/);
  assert.throws(() => fibonacci('5'), /Input must be a non-negative integer/);
});

test('gcd returns the greatest common divisor for positive, negative, and zero values', () => {
  assert.equal(gcd(48, 18), 6);
  assert.equal(gcd(-48, 18), 6);
  assert.equal(gcd(0, 5), 5);
  assert.equal(gcd(0, 0), 0);
});

test('gcd throws when inputs are not integers', () => {
  assert.throws(() => gcd(4.5, 2), /Inputs must be integers/);
  assert.throws(() => gcd('4', 2), /Inputs must be integers/);
});

test('lcm returns the least common multiple and handles zero and negative values', () => {
  assert.equal(lcm(4, 6), 12);
  assert.equal(lcm(-4, 6), 12);
  assert.equal(lcm(0, 6), 0);
  assert.equal(lcm(6, 0), 0);
});

test('lcm throws when inputs are not integers', () => {
  assert.throws(() => lcm(4.2, 6), /Inputs must be integers/);
  assert.throws(() => lcm(4, '6'), /Inputs must be integers/);
});

test('clamp returns min, max, or original value depending on bounds', () => {
  assert.equal(clamp(5, 1, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
});

test('clamp throws for non-number inputs and invalid ranges', () => {
  assert.throws(() => clamp('5', 0, 10), /All inputs must be numbers/);
  assert.throws(() => clamp(5, '0', 10), /All inputs must be numbers/);
  assert.throws(() => clamp(5, 10, 0), /Min value cannot be greater than max value/);
});

test('round rounds to default and specified decimal places', () => {
  assert.equal(round(4.6), 5);
  assert.equal(round(3.14159, 2), 3.14);
  assert.equal(round(1.005, 2), 1);
});

test('round throws for invalid value or decimals inputs', () => {
  assert.throws(
    () => round('3.14', 2),
    /Invalid inputs: value must be a number and decimals must be a non-negative integer/
  );
  assert.throws(
    () => round(3.14, -1),
    /Invalid inputs: value must be a number and decimals must be a non-negative integer/
  );
  assert.throws(
    () => round(3.14, 1.5),
    /Invalid inputs: value must be a number and decimals must be a non-negative integer/
  );
});