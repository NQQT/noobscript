import { describe, test, expect } from '@jest/globals';
import { stringIncludes } from './includes';

describe('String Includes Functionality', () => {
  // Why it is differnt now.
  test('find within result', () => {
    const result: any[] = [];
    const cases = {
      inline: () => {
        result.push('inline');
      },
      outline: () => {
        result.push('outline');
      },
    };

    stringIncludes('inline outline', cases);
    // Checking if it is passing through the values
    expect(result).toStrictEqual(['inline', 'outline']);
  });

  // Nested Cross check
  test('Nested callback functions', () => {
    const value = 'inline dense';
    // The Result
    const result = stringIncludes(value, {
      inline: () => 'inline',
      flex: () => 'flex',
      column: 'column',
      dense: ({ flex, column }) => [flex(), column()],
    });

    expect(result).toStrictEqual({ inline: 'inline', dense: ['flex', 'column'] });
  });
});
