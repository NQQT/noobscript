import { describe, expect, test } from '@jest/globals';
import { objectStyled } from '..';
import { objectMapAttribute } from './attribute';
import { stringSwitch } from '../../../js/string/switch';
import { typeSwitch } from '../../../js/type/switch';

describe('Attribute Resolver Function', () => {
  const allPurposeResolver = objectMapAttribute(({ value }) => {
    return { working: value };
  });

  // Constructing a Test Resolver
  const textResolver = objectMapAttribute(({ value }) => {
    return {
      textAlign: value,
    };
  });

  test('Basic Resolver', () => {
    const props = { text: 'right' };
    const result = objectStyled(props, { text: textResolver });
    // Expecting Resolver Function
    expect(result).toStrictEqual({ textAlign: 'right' });
  });

  test('Basic All Purpose Resolver', () => {
    const resolvers = {
      // The standard text resolver
      text: textResolver,
      // Best to put all purpose resolver at the bottom
      '*': allPurposeResolver,
    };

    // Getting the Result
    const text = objectStyled({ text: 'right' }, resolvers);
    // This should be okay
    expect(text).toStrictEqual({ textAlign: 'right' });

    const general = objectStyled({ color: 'blue' }, resolvers);
    expect(general).toStrictEqual({ working: 'blue' });
  });

  test('Advance Resolver', () => {
    const props = { text: ['bold', 'blue'] };
    // Filter through the result
    const result = objectStyled(props, {
      // Building a New Text Resolver
      text: objectMapAttribute(({ value }) => {
        return typeSwitch(value, {
          string: ({ v }) =>
            stringSwitch(v, {
              bold: () => ({
                fontWeight: 'bold',
              }),
              default: () => ({
                color: v,
              }),
            }),
        });
      }),
    });

    // Expecting the Result to be
    expect(result).toStrictEqual({
      fontWeight: 'bold',
      color: 'blue',
    });
  });
});
