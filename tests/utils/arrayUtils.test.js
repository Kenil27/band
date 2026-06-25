import test from 'node:test';
import assert from 'node:assert/strict';
import { unique, flatten } from '../../src/utils/arrayUtils.js';

test('unique returns deduplicated values while preserving first-seen order', () => {
  const input = [3, 1, 3, 2, 1, 4, 2];
  const result = unique(input);

  assert.deepStrictEqual(result, [3, 1, 2, 4]);
  assert.deepStrictEqual(input, [3, 1, 3, 2, 1, 4, 2]);
});

test('unique throws for non-array input', () => {
  assert.throws(() => unique('not-an-array'), {
    message: 'Input must be an array',
  });
});

test('flatten flattens nested arrays by one level only', () => {
  const input = [[1, 2], [3], 4, [5, [6]]];
  const result = flatten(input);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5, [6]]);
});

test('flatten throws for non-array input', () => {
  assert.throws(() => flatten(null), {
    message: 'Input must be an array',
  });
});