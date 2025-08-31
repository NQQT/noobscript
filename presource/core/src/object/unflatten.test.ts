import { describe, test, expect } from '@jest/globals';
import { objectUnflatten } from './unflatten';

describe('objectUnflatten', () => {
  test('Unflattening objects that already unflattened', () => {
    // Nothing should change. There is nothing to unflatten
    expect(objectUnflatten({ test: [] })).toStrictEqual({ test: [] });
    expect(objectUnflatten({ test: true })).toStrictEqual({ test: true });
    expect(objectUnflatten({ test: 'hi' })).toStrictEqual({ test: 'hi' });
    // Testing with Object
    expect(objectUnflatten({ test: {} })).toStrictEqual({ test: {} });
    expect(objectUnflatten({ test: { example: '1' } })).toStrictEqual({ test: { example: '1' } });
  });

  test('Unflattening simple objects without conflicts', () => {
    // Single Line object. No conflicct
    expect(objectUnflatten({ 'school.year12.subjects': ['english', 'math'] })).toStrictEqual({
      school: {
        year12: {
          subjects: ['english', 'math'],
        },
      },
    });

    // Single line object with conflicts (family)
    expect(objectUnflatten({ 'family.mother': { name: 'Jane' }, 'family.father': { name: 'John' } })).toStrictEqual({
      family: {
        mother: {
          name: 'Jane',
        },
        father: {
          name: 'John',
        },
      },
    });
  });

  test('More complicated object without conflicts', () => {
    // Merging into existing object
    expect(
      objectUnflatten({
        'family.mother': { name: 'Jane' },
        'family.father': { name: 'John' },
        'family.mother.color': 'blue',
      }),
    ).toStrictEqual({
      family: {
        mother: {
          name: 'Jane',
          color: 'blue',
        },
        father: {
          name: 'John',
        },
      },
    });
  });

  test('Complicated object with different type of conflicts', () => {
    const example1 = objectUnflatten({
      'family.mother': { name: 'Jane' },
      'family.father': { name: 'John' },
      'family.mother.name': 'Sera',
    });

    // Joining with current object
    expect(example1).toStrictEqual({
      family: {
        mother: {
          name: ['Jane', 'Sera'],
        },
        father: {
          name: 'John',
        },
      },
    });

    const example2 = objectUnflatten({
      'family.mother': true,
      'family.mother.name': 'Jane',
    });

    expect(example2).toStrictEqual({
      family: {
        mother: {
          '': true,
          name: 'Jane',
        },
      },
    });
  });
});
