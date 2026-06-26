import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
globalThis.window = window;
globalThis.document = window.document;
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
globalThis.HTMLElement = window.HTMLElement;
globalThis.Node = window.Node;

import test from 'node:test';
import assert from 'node:assert/strict';
import StudentCard from '../../src/components/StudentCard.jsx';

test('StudentCard should correctly extract drive image URL from a valid drive link', () => {
  const student = {
    image: 'https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing',
    firstName: 'John',
    middleName: 'Doe',
    lastName: 'Smith',
    birthYear: 2000,
    team: 'Team A',
    subTeam: 'Sub Team A1',
    instrument: 'Guitar',
  };
  
  const card = StudentCard({ student });
  assert.ok(card.props.children[0].props.src === 'https://drive.google.com/thumbnail?id=1A2B3C4D5E6F');
});

test('StudentCard should return an empty string for drive image URL if drive link is empty', () => {
  const student = {
    image: '',
    firstName: 'Jane',
    middleName: 'Doe',
    lastName: 'Smith',
    birthYear: 2001,
    team: 'Team B',
    subTeam: 'Sub Team B1',
    instrument: 'Piano',
  };
  
  const card = StudentCard({ student });
  assert.ok(card.props.children[0].props.src === '');
});

test('StudentCard should calculate age correctly based on birth year', () => {
  const student = {
    image: 'https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing',
    firstName: 'Alice',
    middleName: 'B.',
    lastName: 'Johnson',
    birthYear: 1995,
    team: 'Team C',
    subTeam: 'Sub Team C1',
    instrument: 'Violin',
  };
  
  const card = StudentCard({ student });
  assert.ok(card.props.children[2].props.children.includes(`Age: ${new Date().getFullYear() - 1995}`));
});

test('StudentCard should display full name correctly', () => {
  const student = {
    image: 'https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing',
    firstName: 'Alice',
    middleName: 'B.',
    lastName: 'Johnson',
    birthYear: 1995,
    team: 'Team C',
    subTeam: 'Sub Team C1',
    instrument: 'Violin',
  };

  const card = StudentCard({ student });
  assert.ok(card.props.children[1].props.children === 'Alice B. Johnson');
});