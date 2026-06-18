import test from 'node:test';
import assert from 'node:assert/strict';
import { add, calculateAverage } from '../../src/utils/mathUtils.js';

test('add returns the sum of two numbers', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 1), -3);
});

test('calculateAverage returns the average for a list of numbers', () => {
  assert.equal(calculateAverage([2, 4, 6, 8]), 5);
});

test('calculateAverage returns 0 for an empty array', () => {
  assert.equal(calculateAverage([]), 0);
});

test('calculateAverage returns 0 for non-array input', () => {
  assert.equal(calculateAverage(null), 0);
  assert.equal(calculateAverage('not-an-array'), 0);
});