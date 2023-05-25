import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('is check function for array wrapper', () => {
  // Creating an array wrapper function
  const $array = arrayWrapper();

  test('is array empty check', () => {
    expect($array([]).is('empty')).toBeTruthy();
    expect($array(['value']).is('empty')).toBeFalsy();
  });

  test('is array valid check', () => {
    expect($array([]).is('valid')).toBeTruthy();
    expect($array([0, 1, 2, 3, 4, 'hello', false, true]).is('valid')).toBeTruthy();
    expect($array([1, 2, 3, 4, 'apple', null]).is('valid')).toBeFalsy();
  });

  test('is array filled check', () => {
    expect($array([]).is('filled')).toBeFalsy();
    expect($array([0, 1, 2, undefined]).is('filled')).toBeFalsy();
    expect($array(['apple']).is('filled')).toBeTruthy();
    expect($array(['apple', 0, null]).is('filled')).toBeTruthy();
  });
});
