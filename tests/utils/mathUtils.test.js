import test from 'node:test';
import assert from 'node:assert/strict';
import { add } from '../../src/utils/mathUtils.js';

test('add returns the sum of two positive numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('add handles negative numbers correctly', () => {
  assert.equal(add(-4, 1), -3);
});

test('add returns zero when both inputs are zero', () => {
  assert.equal(add(0, 0), 0);
});