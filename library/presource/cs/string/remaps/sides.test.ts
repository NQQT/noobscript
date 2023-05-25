import { describe, expect, test } from '@jest/globals';
import { stringStyled } from '..';
import { stringPresetBorder } from '../presets/border';
import { stringRemapSides } from './sides';

describe('remapSides', () => {
  // Remapping Resolvers with Side
  const resolvers = stringRemapSides('b', {
    // Using the Preset Borders
    b: stringPresetBorder,
  });

  test('Basic Resolving Example', () => {
    // Nothing should have changed with default borders
    const example1 = stringStyled('b-solid', resolvers);
    expect(example1).toStrictEqual({
      border: '1px solid',
    });

    // Accessing Sides Mappers
    const example2 = stringStyled('bb-solid', resolvers);
    expect(example2).toStrictEqual({
      borderBottom: '1px solid',
    });

    // Accessing multiple side mappers with spacing
    const example3 = stringStyled('br-solid bb-solid', resolvers);
    expect(example3).toStrictEqual({
      borderBottom: '1px solid',
      borderRight: '1px solid',
    });

    expect(stringStyled('bx', resolvers)).toStrictEqual({
      borderLeft: '1px solid',
      borderRight: '1px solid',
    });

    const example4 = stringStyled('h.bb-solid', resolvers);
    expect(example4).toStrictEqual({
      h: {
        borderBottom: '1px solid',
      },
    });

    const example5 = stringStyled('h.bb-solid f.br-solid', resolvers);
    expect(example5).toStrictEqual({
      h: {
        borderBottom: '1px solid',
      },
      f: {
        borderRight: '1px solid',
      },
    });
  });
});
