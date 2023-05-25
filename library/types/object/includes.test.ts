import { ObjectIncludes } from './includes';

describe('Object Includes Types', () => {
  test('Basic inclusive', () => {
    const example = { number: 10, string: 'banana', array: [1, 2, 3], boolean: false };
    type Example = typeof example;

    type Inclusives = ObjectIncludes<Example, number>;

    // Inclusive must contain number
    const inclusives: Inclusives = {
      number: 10,
    };

    expect(inclusives).toStrictEqual({ number: 10 });
  });
});
