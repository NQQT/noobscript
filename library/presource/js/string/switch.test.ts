import { describe, test, expect } from '@jest/globals';
import { stringSwitch, stringSwitchAsync } from './switch';

describe('String Switch Functionality', () => {
  test('Basic Switch Routing', () => {
    const basicRoute = {
      a: 'apple',
      b: 'banana',
      c: 'cat',
      d: 'dog',
      e: () => 'elephant',
      f: () => 'friend',
      g: {},
      h: true,
      i: false,
      j: [],
      default: '404',
    };

    expect(stringSwitch('a', basicRoute)).toBe('apple');
    expect(stringSwitch('b', basicRoute)).toBe('banana');
    expect(stringSwitch('c', basicRoute)).toBe('cat');
    expect(stringSwitch('d', basicRoute)).toBe('dog');
    expect(stringSwitch('e', basicRoute)).toBe('elephant');
    expect(stringSwitch('f', basicRoute)).toBe('friend');
    expect(stringSwitch('g', basicRoute)).toStrictEqual({});
    expect(stringSwitch('h', basicRoute)).toBeTruthy();
    expect(stringSwitch('i', basicRoute)).toBeFalsy();
    expect(stringSwitch('j', basicRoute)).toStrictEqual([]);
    expect(stringSwitch('default', basicRoute)).toStrictEqual('404');
  });

  test('Advance Switch Routing', () => {
    const advanceRoute = {
      a: () => 'apple',
      b: ({ a }: any) => a(),
      c: ({ b }: any) => b(),
      default: () => 'banana',
    };

    expect(stringSwitch('a', advanceRoute)).toBe('apple');
    expect(stringSwitch('b', advanceRoute)).toBe('apple');
    expect(stringSwitch('c', advanceRoute)).toBe('apple');
    expect(stringSwitch('d', advanceRoute)).toBe('banana');
  });
});

describe('Async String Switch Functionality', () => {
  test('Route switching', async () => {
    const routes = {
      a: async () => 'apple',
      b: async () => 'banana',
      c: 'cat',
      d: 'dog',
    };
    expect(await stringSwitchAsync('a', routes)).toBe('apple');
    expect(await stringSwitchAsync('b', routes)).toBe('banana');
    expect(await stringSwitchAsync('c', routes)).toBe('cat');
    expect(await stringSwitchAsync('d', routes)).toBe('dog');
  });
});
