import test from 'node:test';
import assert from 'node:assert/strict';
import {
  unique,
  flatten,
  groupBy,
  chunk,
  intersection,
  difference,
} from '../../src/utils/arrayUtils.js';

test('unique returns deduplicated values and throws for non-array input', () => {
  assert.deepEqual(unique([1, 2, 2, 3, 1, 4]), [1, 2, 3, 4]);
  assert.deepEqual(unique(['a', 'a', 'b']), ['a', 'b']);
  assert.throws(() => unique('not-an-array'), /Input must be an array/);
});

test('flatten flattens one level and validates input', () => {
  assert.deepEqual(flatten([[1, 2], [3], 4, [5, 6]]), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(flatten([]), []);
  assert.throws(() => flatten(null), /Input must be an array/);
});

test('groupBy groups objects by key, supports missing keys, and validates arguments', () => {
  const items = [
    { type: 'fruit', name: 'apple' },
    { type: 'vegetable', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
    { name: 'unknown' },
  ];

  assert.deepEqual(groupBy(items, 'type'), {
    fruit: [
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
    ],
    vegetable: [{ type: 'vegetable', name: 'carrot' }],
    undefined: [{ name: 'unknown' }],
  });

  assert.throws(() => groupBy('not-an-array', 'type'), /Input must be an array/);
  assert.throws(() => groupBy([], ''), /Key must be a non-empty string/);
  assert.throws(() => groupBy([], 123), /Key must be a non-empty string/);
});

test('chunk splits arrays into sized groups and validates size/input', () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([1, 2, 3], 5), [[1, 2, 3]]);
  assert.deepEqual(chunk([], 3), []);
  assert.throws(() => chunk('not-an-array', 2), /Input must be an array/);
  assert.throws(() => chunk([1, 2], 0), /Size must be a positive integer/);
  assert.throws(() => chunk([1, 2], 1.5), /Size must be a positive integer/);
});

test('intersection returns shared elements preserving duplicates from first array and validates inputs', () => {
  assert.deepEqual(intersection([1, 2, 2, 3, 4], [2, 4, 5]), [2, 2, 4]);
  assert.deepEqual(intersection([], [1, 2]), []);
  assert.throws(() => intersection([], 'bad'), /Both inputs must be arrays/);
  assert.throws(() => intersection('bad', []), /Both inputs must be arrays/);
});

test('difference returns elements only in first array and validates inputs', () => {
  assert.deepEqual(difference([1, 2, 2, 3, 4], [2, 5]), [1, 3, 4]);
  assert.deepEqual(difference([], [1, 2]), []);
  assert.throws(() => difference([], null), /Both inputs must be arrays/);
  assert.throws(() => difference(null, []), /Both inputs must be arrays/);
});