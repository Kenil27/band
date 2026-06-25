import test from 'node:test';
import assert from 'node:assert/strict';
import { unique, flatten, groupBy, chunk } from '../../src/utils/arrayUtils.js';

test('unique removes duplicates while preserving first-seen order', () => {
  assert.deepStrictEqual(unique([3, 1, 3, 2, 1, 2]), [3, 1, 2]);
  assert.deepStrictEqual(unique([]), []);
});

test('flatten flattens one level and throws for non-array input', () => {
  assert.deepStrictEqual(flatten([[1, 2], [3], 4, [5, [6]]]), [1, 2, 3, 4, 5, [6]]);
  assert.throws(() => flatten('not-an-array'), /Input must be an array/);
});

test('groupBy groups objects by key and validates key input', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
  ];

  assert.deepStrictEqual(groupBy(items, 'type'), {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
    ],
    vegetable: [
      { type: 'vegetable', name: 'carrot' },
    ],
  });

  assert.throws(() => groupBy(items, ''), /Key must be a non-empty string/);
});

test('chunk splits arrays into sized groups and rejects invalid size', () => {
  assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepStrictEqual(chunk([], 3), []);
  assert.throws(() => chunk([1, 2, 3], 0), /Size must be a positive integer/);
});