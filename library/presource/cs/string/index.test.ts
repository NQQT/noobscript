import { describe, expect, test } from '@jest/globals';
import { stringStyled } from '.';

describe('stringObject', () => {
  test('Basic Test without any resolvers', () => {
    expect(stringStyled('div')).toStrictEqual({
      div: {},
    });

    // Nesting Test
    expect(stringStyled('main.div.label')).toStrictEqual({
      main: {
        div: {
          label: {},
        },
      },
    });

    // Divider Test
    expect(stringStyled('header/body/footer.div.label')).toStrictEqual({
      header: {
        div: {
          label: {},
        },
      },
      body: {
        div: {
          label: {},
        },
      },
      footer: {
        div: {
          label: {},
        },
      },
    });

    // Multi complex divider test
    expect(stringStyled('family.father/mother/son/daughter.likes/dislikes')).toStrictEqual({
      family: {
        father: { likes: {}, dislikes: {} },
        mother: { likes: {}, dislikes: {} },
        son: { likes: {}, dislikes: {} },
        daughter: { likes: {}, dislikes: {} },
      },
    });

    // Spacer test
    expect(stringStyled('father mother')).toStrictEqual({
      father: {},
      mother: {},
    });
  });
});
