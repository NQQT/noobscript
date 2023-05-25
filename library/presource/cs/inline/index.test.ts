import { describe, test, expect } from '@jest/globals';
import { inlineStyled } from '.';

// Testing Inline Styling Function
describe('Testing Inline Stringification', () => {
  test('Should produce correct inline string', () => {
    // Building some examples
    expect(inlineStyled({ width: '100%', height: '100%' })).toBe('width:100%;height:100%;');
    expect(inlineStyled({ font: 12 })).toBe('font:12;');
  });

  test('Nested object should also work', () => {
    // Basic Example
    const input = {
      div: {
        width: '100%',
        height: '100%',
      },
      span: {
        color: 'blue',
      },
    };
    const output = 'div{width:100%;height:100%;}span{color:blue;}';
    expect(inlineStyled(input)).toBe(output);
  });

  test('Can do something like media queries and more', () => {
    // Media Queries...?
    const media = {
      '@media only screen and (max-width:600px)': {
        body: {
          backgroundColor: 'lightblue',
        },
      },
    };
    // The Inline output should be
    const output = '@media only screen and (max-width:600px){body{background-color:lightblue;}}';
    expect(inlineStyled(media)).toBe(output);
  });
});
