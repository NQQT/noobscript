import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '.';

describe('Array Wrapper', () => {
  test('Extending array Wrapper', () => {
    const inputs: any[] = [];
    const $array = arrayWrapper({
      extended: ({ args }) => {
        const [value] = args;
        inputs.push(value);
      },
    });

    $array([]).extended('hello');
    expect(inputs).toStrictEqual(['hello']);
  });
});
