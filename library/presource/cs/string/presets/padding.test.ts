import { describe, expect, test } from '@jest/globals';
import { stringStyled } from '..';
import { stringRemapSides } from '../remaps/sides';
import { stringPresetPadding } from './padding';

describe('presetPadding for stringObject styling', () => {
  // Constructing Resolvers
  const resolvers = stringRemapSides('p', {
    p: stringPresetPadding,
  });

  test('Basic padding usage', () => {
    // P only
    expect(stringStyled('p', resolvers)).toStrictEqual({
      padding: '1rem',
    });

    expect(stringStyled('p-2px', resolvers)).toStrictEqual({
      padding: '2px',
    });

    expect(stringStyled('p-5', resolvers)).toStrictEqual({
      padding: '2.5rem',
    });
  });

  test('Basic padding usage with remapping', () => {
    expect(stringStyled('pr-1', resolvers)).toStrictEqual({
      paddingRight: '0.5rem',
    });

    expect(stringStyled('pr-1 pl-2', resolvers)).toStrictEqual({
      paddingRight: '0.5rem',
      paddingLeft: '1rem',
    });

    expect(stringStyled('px', resolvers)).toStrictEqual({
      paddingLeft: '1rem',
      paddingRight: '1rem',
    });
  });
});
