import test from 'node:test';
import assert from 'node:assert/strict';
import { capitalize, truncate } from '../../src/utils/stringUtils.js';

test('capitalize should return an empty string for non-string input', () => {
  assert.strictEqual(capitalize(123), '');
  assert.strictEqual(capitalize(null), '');
  assert.strictEqual(capitalize(undefined), '');
});

test('capitalize should capitalize the first letter of a string', () => {
  assert.strictEqual(capitalize('hello'), 'Hello');
  assert.strictEqual(capitalize('world'), 'World');
});

test('truncate should return the original string if it is shorter than the specified length', () => {
  assert.strictEqual(truncate('short', 10), 'short');
});

test('truncate should truncate the string and append ellipsis if it exceeds the specified length', () => {
  assert.strictEqual(truncate('This is a long string', 10), 'This is a ...');
});