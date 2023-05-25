import { describe, expect, test } from '@jest/globals';
import { objectStyled } from '..';
import { objectMapAttribute } from './attribute';
import { objectMapMediaMinMax } from './media';

describe('Media Resolver for Min and Max Width', () => {
  // Resolving Some Variables
  const df = objectMapMediaMinMax();
  const xl = objectMapMediaMinMax(1300);
  const lg = objectMapMediaMinMax(900, 1299);
  const md = objectMapMediaMinMax(700, 899);
  const sm = objectMapMediaMinMax(450, 699);
  const xs = objectMapMediaMinMax(0, 449);

  test('Basic Direct Styler', () => {
    const data = { xl: { color: 'blue' } };
    const result = objectStyled(data, {
      xl,
    });

    expect(result).toStrictEqual({
      '@media (min-width:1300px)': {
        color: 'blue',
      },
    });
  });

  test('Basic Indirect Styler', () => {
    const data = { color: { xl: 'blue' } };
    const result = objectStyled(data, {
      xl,
    });

    // Does not pass through the filter since there is no resolver for colour
    expect(result).toStrictEqual({ color: { xl: 'blue' } });
  });

  test('Advance Direct Styler', () => {
    // Using Array via Data Controls
    const resolvers = { xl };

    const example1 = { xl: [{ color: 'blue' }, { font: 'red' }] };
    // Expecting Data to be Collapsed if using array
    expect(objectStyled(example1, resolvers)).toStrictEqual({
      '@media (min-width:1300px)': {
        color: 'blue',
        font: 'red',
      },
    });

    const example2 = { xl: { border: 1 } };
    expect(objectStyled(example2, resolvers)).toStrictEqual({
      '@media (min-width:1300px)': {
        border: 1,
      },
    });
  });

  test('Advance Direct Styler Example', () => {
    const resolvers = {
      df,
      '*': objectMapAttribute(({ k, v }: any) => {
        return { [k]: v };
      }),
    };

    const example1 = { df: { font: 'bold' } };
    expect(objectStyled(example1, resolvers)).toStrictEqual({
      '@media': {
        font: 'bold',
      },
    });

    const example2 = { font: { df: 'bold' } };
    expect(objectStyled(example2, resolvers)).toStrictEqual({
      '@media': {
        font: 'bold',
      },
    });
  });
});
