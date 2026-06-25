import test from 'node:test';
import assert from 'node:assert/strict';
import { unique, flatten, groupBy } from '../../src/utils/arrayUtils.js';

test('unique returns deduplicated values while preserving first-seen order', () => {
  assert.deepEqual(unique([3, 1, 3, 2, 1, 2]), [3, 1, 2]);
});

test('flatten flattens an array by one level only', () => {
  const input = [1, [2, 3], [4, [5]], 6];
  assert.deepEqual(flatten(input), [1, 2, 3, 4, [5], 6]);
});

test('groupBy groups objects by the provided key', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
  ];

  assert.deepEqual(groupBy(items, 'type'), {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
    ],
    vegetable: [
      { type: 'vegetable', name: 'carrot' },
    ],
  });
});

test('exported utilities validate their inputs', () => {
  assert.throws(() => unique('not-an-array'), /Input must be an array/);
  assert.throws(() => flatten(null), /Input must be an array/);
  assert.throws(() => groupBy([], ''), /Key must be a non-empty string/);
});