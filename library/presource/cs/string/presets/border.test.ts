import { describe, expect, test } from '@jest/globals';
import { stringStyled } from '..';
import { stringMapWrapper } from '../maps/wrapper';
import { stringPresetBorder } from './border';

describe('Border preset mapper', () => {
  // Setting up the necessary resolvers
  const resolvers = {
    f: stringMapWrapper('focus'),
    h: stringMapWrapper('hover'),
    b: stringPresetBorder,
  };

  test('Basic string conversion to object', () => {
    // For Constructing the Resolvers
    const result = stringStyled('b-solid', resolvers);

    // Expeccting the Border Bottom
    expect(result).toStrictEqual({
      // Return the Border Data
      border: '1px solid',
    });
  });

  test('With Superset wrappers', () => {
    const example1 = stringStyled('h.b-solid', resolvers);
    expect(example1).toStrictEqual({
      hover: {
        border: '1px solid',
      },
    });

    // Testing with advance dividers
    const example2 = stringStyled('h/f.b-solid', resolvers);
    expect(example2).toStrictEqual({
      hover: {
        border: '1px solid',
      },
      focus: {
        border: '1px solid',
      },
    });

    // Testing with spacers
    const example3 = stringStyled('h.b-solid f.b-solid', resolvers);
    expect(example3).toStrictEqual({
      hover: {
        border: '1px solid',
      },
      focus: {
        border: '1px solid',
      },
    });
  });
});
