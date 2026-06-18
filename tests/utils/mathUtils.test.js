import test from 'node:test';
import assert from 'node:assert/strict';
import { gcd, lcm } from '../../src/utils/mathUtils.js';

test('gcd computes the greatest common divisor for positive integers', () => {
  assert.equal(gcd(48, 18), 6);
});

test('gcd handles negative numbers and zero by using absolute values', () => {
  assert.equal(gcd(-24, 18), 6);
  assert.equal(gcd(0, 9), 9);
});

test('lcm returns 0 when either input is zero', () => {
  assert.equal(lcm(0, 5), 0);
  assert.equal(lcm(7, 0), 0);
});

test('gcd and lcm reject non-integer inputs', () => {
  assert.throws(() => gcd(10.5, 2), /Inputs must be integers/);
  assert.throws(() => lcm(4, '6'), /Inputs must be integers/);
});