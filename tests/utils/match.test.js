import test from 'node:test';
import assert from 'node:assert/strict';
import { safeMatch, fuzzyMatch, isValidEmail, isValidUrl, extractDriveId, normalizeString } from '../../src/utils/match.js';

test('safeMatch should return matched group or null', () => {
    assert.strictEqual(safeMatch('hello world', /hello/, 0), 'hello');
    assert.strictEqual(safeMatch('hello world', /world/, 0), 'world');
    assert.strictEqual(safeMatch('hello world', /notfound/, 0), null);
    assert.strictEqual(safeMatch(123, /hello/, 0), null);
    assert.strictEqual(safeMatch('hello world', 'notaregex', 0), null);
});

test('fuzzyMatch should return true for fuzzy matches', () => {
    assert.strictEqual(fuzzyMatch('hello world', 'hlo'), true);
    assert.strictEqual(fuzzyMatch('hello world', 'hw'), true);
    assert.strictEqual(fuzzyMatch('hello world', 'lo'), true);
    assert.strictEqual(fuzzyMatch('hello world', 'world'), true);
    assert.strictEqual(fuzzyMatch('hello world', 'notfound'), false);
    assert.strictEqual(fuzzyMatch(123, 'hlo'), false);
    assert.strictEqual(fuzzyMatch('hello world', 123), false);
});

test('isValidEmail should validate email formats', () => {
    assert.strictEqual(isValidEmail('test@example.com'), true);
    assert.strictEqual(isValidEmail('invalid-email'), false);
    assert.strictEqual(isValidEmail('test@.com'), false);
    assert.strictEqual(isValidEmail('test@com'), false);
    assert.strictEqual(isValidEmail(123), false);
});

test('isValidUrl should validate HTTP/HTTPS URLs', () => {
    assert.strictEqual(isValidUrl('https://example.com'), true);
    assert.strictEqual(isValidUrl('http://example.com'), true);
    assert.strictEqual(isValidUrl('ftp://example.com'), false);
    assert.strictEqual(isValidUrl('invalid-url'), false);
    assert.strictEqual(isValidUrl(123), false);
});

test('extractDriveId should extract Google Drive file IDs', () => {
    assert.strictEqual(extractDriveId('https://drive.google.com/file/d/FILE_ID/view'), 'FILE_ID');
    assert.strictEqual(extractDriveId('https://drive.google.com/?id=FILE_ID'), 'FILE_ID');
    assert.strictEqual(extractDriveId('https://drive.google.com/uc?id=FILE_ID'), 'FILE_ID');
    assert.strictEqual(extractDriveId('https://drive.google.com/d/FILE_ID/view'), 'FILE_ID');
    assert.strictEqual(extractDriveId('invalid-link'), '');
    assert.strictEqual(extractDriveId(''), '');
    assert.strictEqual(extractDriveId(123), '');
});

test('normalizeString should normalize strings correctly', () => {
    assert.strictEqual(normalizeString(' Hello World! '), 'hello world!');
    assert.strictEqual(normalizeString(' Hello World! ', { removeSpecialChars: true }), 'helloworld');
    assert.strictEqual(normalizeString(123), '');
});