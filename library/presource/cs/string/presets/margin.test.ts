import { describe, expect, test } from '@jest/globals';
import { stringStyled } from '..';
import { stringRemapSides } from '../remaps/sides';
import { stringPresetMargin } from './margin';

describe('presetMargin for stringObject Styling', () => {
  // Constructing the Resolvers
  const resolvers = stringRemapSides('m', {
    m: stringPresetMargin,
  });

  test('Basic resolve the margin value', () => {
    // If no value is added
    expect(stringStyled('m', resolvers)).toStrictEqual({
      margin: '1rem',
    });

    expect(stringStyled('m-10px', resolvers)).toStrictEqual({
      margin: '10px',
    });

    expect(stringStyled('m-1', resolvers)).toStrictEqual({
      margin: '0.5rem',
    });
  });

  test('Basic resolve with remapping values', () => {
    expect(stringStyled('mr', resolvers)).toStrictEqual({
      marginRight: '1rem',
    });

    expect(stringStyled('ml-5px', resolvers)).toStrictEqual({
      marginLeft: '5px',
    });

    expect(stringStyled('mt-2', resolvers)).toStrictEqual({
      marginTop: '1rem',
    });

    expect(stringStyled('my-5', resolvers)).toStrictEqual({
      marginTop: '2.5rem',
      marginBottom: '2.5rem',
    });
  });
});
