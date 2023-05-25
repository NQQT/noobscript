import { describe, expect, test } from '@jest/globals';
import { objectStyled } from '.';
import { MapperCallback } from './assets/interface';
import { objectUpdate } from '../../js/object/update';
import { typeSwitch } from '../../js/type/switch';
import { objectMap } from '../../js/object/map';
import { objectMapAttribute } from './maps/attribute';
import { stringSwitch } from '../../js/string/switch';

describe('Converting Raw Data to CSO with objectTranscribe', () => {
  // Creating Some Basic Filter Function
  const textFilter: MapperCallback = ({ value, key, output }, resolvers) => {
    typeSwitch(value, {
      object: () => {
        // Special Case. Nested Object
        const newValue: any = objectMap(value, ({ v }) => ({ [key]: v }));
        // Getting Nested
        const nested = objectStyled(newValue, resolvers);
        // Adding to Output
        objectUpdate(output, nested);
      },
      default: () => {
        // Adding to the output
        objectUpdate(output, { textAlign: value });
      },
    });
  };

  const SmallScreen: MapperCallback = ({ value, output }, resolvers) => {
    const id = 'small';
    // Getting Correct Ouput
    const nested: any = output[id] || {};

    // For Further Resolving
    objectUpdate(nested, objectStyled(value as any, resolvers));
    output[id] = nested;
  };

  // Some Overwriter Function
  const LargeScreen: MapperCallback = ({ value, output }, resolvers) => {
    const id = 'large';
    // Getting Correct Ouput
    const nested: any = output[id] || {};
    // For Further Resolving
    objectUpdate(nested, objectStyled(value as any, resolvers));
    output[id] = nested;
  };

  // This is For Basic Transcribing
  test('Basic Direct Transcribing with no other items', () => {
    const data = { text: 'right' };
    // Building the Result
    const result = objectStyled(data, {
      // The Compiler Logic
      text: textFilter,
    });
    // The Result should be of Sort
    expect(result).toStrictEqual({ textAlign: 'right' });
  });

  // This is for basic transcribing
  test('Basic Direct Transcribing with other items', () => {
    const data = { color: 'blue', font: 'bold', text: 'right' };
    const result = objectStyled(data, {
      text: textFilter,
    });
    // Expecting the result
    expect(result).toStrictEqual({ color: 'blue', textAlign: 'right', font: 'bold' });
  });

  test('Basic Direct Transcribing with nested items', () => {
    const data = { body: { color: 'blue' }, text: 'right' };
    const result = objectStyled(data, {
      text: textFilter,
    });
    expect(result).toStrictEqual({ body: { color: 'blue' }, textAlign: 'right' });
  });

  test('Basic Nested Transcribing', () => {
    const data = { body: { text: 'right', color: 'blue' }, font: 'bold' };
    const result = objectStyled(data, {
      text: textFilter,
    });
    // Expecting result. There is no wildcard resolver for body tag, it will automatically skip
    expect(result).toStrictEqual({ body: { text: 'right', color: 'blue' }, font: 'bold' });
  });

  test('Basic Direct Nested Transcribing', () => {
    const data = { xl: { text: 'left' }, sm: { text: 'right' } };
    const result = objectStyled(data, {
      xl: LargeScreen,
      sm: SmallScreen,
      text: textFilter,
    });

    // Expecting the Result
    expect(result).toStrictEqual({ large: { textAlign: 'left' }, small: { textAlign: 'right' } });
  });

  // Nested Transcribing
  test('Basic Indrect Nested Transcribing', () => {
    // Text for Large screen is left. Text for small screen is right
    const data = { text: { xl: 'left', sm: 'right' } };

    // Building the Result
    const result = objectStyled(data, {
      text: textFilter,
      xl: LargeScreen,
      sm: SmallScreen,
    });

    // Expecting The same resolve as direct.
    expect(result).toStrictEqual({ large: { textAlign: 'left' }, small: { textAlign: 'right' } });
  });

  test('Advance Indirect Nested Transcribing', () => {
    const data = { text: { xl: ['left', 'bold', 'blue'], sm: ['right', 'italic', 'red'] } };
    const result = objectStyled(data, {
      text: objectMapAttribute(({ value }) => {
        // Return based on value
        return stringSwitch(value as string, {
          right: () => ({
            align: 'right',
          }),
          left: () => ({
            align: 'left',
          }),
          bold: () => ({
            weight: 'bold',
          }),
          italic: () => ({
            weight: 'italic',
          }),
          default: () => ({
            color: value,
          }),
        });
      }),
      xl: LargeScreen,
      sm: SmallScreen,
    });

    expect(result).toStrictEqual({
      large: { align: 'left', color: 'blue', weight: 'bold' },
      small: { align: 'right', color: 'red', weight: 'italic' },
    });
  });

  test('Deeply Nested Logic. Advance Calculating', () => {
    // Constructing some Resolver
    const resolvers = {
      text: objectMapAttribute(({ value, key }) => {
        return { [key]: value };
      }),
      xl: LargeScreen,
      sm: SmallScreen,
      '*': objectMapAttribute(({ key, value }) => {
        return { [key]: value };
      }),
    };
    const example1 = { div: { xl: { display: 'none' }, sm: { display: 'none' } } };
    expect(objectStyled(example1, resolvers)).toStrictEqual({
      large: { div: { display: 'none' } },
      small: { div: { display: 'none' } },
    });
  });
});
