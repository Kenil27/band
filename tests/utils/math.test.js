import test from 'node:test';
import assert from 'node:assert/strict';
import { add, subtract, multiply, divide, sum, average } from '../../src/utils/math.js';

test('add: adds two numbers together', () => {
  assert.strictEqual(add(1, 2), 3);
  assert.strictEqual(add(-1, 1), 0);
  assert.strictEqual(add(0, 0), 0);
  assert.strictEqual(add('1', '2'), 3); // Test string inputs
});

test('subtract: subtracts the second number from the first', () => {
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(subtract(3, 5), -2);
  assert.strictEqual(subtract(0, 0), 0);
  assert.strictEqual(subtract('5', '3'), 2); // Test string inputs
});

test('multiply: multiplies two numbers', () => {
  assert.strictEqual(multiply(3, 4), 12);
  assert.strictEqual(multiply(-1, 5), -5);
  assert.strictEqual(multiply(0, 10), 0);
  assert.strictEqual(multiply('3', '4'), 12); // Test string inputs
});

test('divide: divides the first number by the second', () => {
  assert.strictEqual(divide(10, 2), 5);
  assert.strictEqual(divide(-10, 2), -5);
  assert.throws(() => divide(1, 0), { message: 'Division by zero is not allowed.' });
  assert.strictEqual(divide('10', '2'), 5); // Test string inputs
});

test('sum: sums an array of numbers', () => {
  assert.strictEqual(sum([1, 2, 3]), 6);
  assert.strictEqual(sum([]), 0);
  assert.strictEqual(sum('not an array'), 0);
  assert.strictEqual(sum([1, '2', null]), 3); // Test mixed types
});

test('average: computes the average of an array of numbers', () => {
  assert.strictEqual(average([1, 2, 3]), 2);
  assert.strictEqual(average([]), 0);
  assert.strictEqual(average('not an array'), 0);
  assert.strictEqual(average([1, 2, '3']), 2); // Test mixed types
});