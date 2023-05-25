import { describe, expect, test } from '@jest/globals';
import { objectStyled } from '..';
import { objectMapAttribute } from './attribute';
import { objectMapWrapper } from './wrapper';

describe('Custom Wrapper - mapWrapper', () => {
  const df = objectMapWrapper();
  const xl = objectMapWrapper(() => {
    return 'large';
  });
  const any = objectMapAttribute(({ key, value }) => {
    return { [key]: value };
  });
  test('Basic wrapping function', () => {
    const resolvers = { df, xl, '*': any };
    const result = {
      color: 'blue',
      large: {
        color: 'red',
      },
    };
    // Direct Resolving
    const example1 = {
      df: {
        color: 'blue',
      },
      xl: {
        color: 'red',
      },
    };

    // Expecting the result to be the same as the first one
    expect(objectStyled(example1, resolvers)).toStrictEqual(result);

    // Indirect Resolving
    const example2 = {
      color: { df: 'blue', xl: 'red' },
    };
    // Expecting the result to be the same as first one
    expect(objectStyled(example2, resolvers)).toStrictEqual(result);
  });
});
