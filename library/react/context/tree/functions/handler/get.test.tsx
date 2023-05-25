import React from 'react';
import { render, act } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { createReactContextTree } from '../..';

describe('get handler function', () => {
  // Constructing the handler
  const {
    reactive: useContextState,
    provider: ContextProvider,
    handler: contextHandler,
  } = createReactContextTree(React);

  test('Basic usage of a get accessor function', () => {
    const context = {
      heaven: {
        race: 'angel',
        size: 1000,
      },
      earth: {
        race: 'human',
        size: 5000,
      },
      hell: {
        race: 'demon',
        size: 9999,
      },
    };
    const counter = {
      heaven: 0,
      earth: 0,
      hell: 0,
    };

    const Heaven = React.memo(() => {
      // For Reactive Trigger
      useContextState();
      counter.heaven++;
      return null;
    });

    const Earth = React.memo(() => {
      useContextState();
      counter.earth++;
      return null;
    });

    const Hell = React.memo(() => {
      useContextState();
      counter.hell++;
      return null;
    });

    // rendering all the context
    render(
      <ContextProvider name="heaven" value={context.heaven}>
        <Heaven />
        <ContextProvider name="earth" value={context.earth}>
          <Earth />
          <ContextProvider name="hell" value={context.hell}>
            <Hell />
          </ContextProvider>
        </ContextProvider>
      </ContextProvider>,
    );

    // Each should be rendered one time
    expect(counter).toStrictEqual({
      heaven: 1,
      earth: 1,
      hell: 1,
    });

    // Accessing context directly
    act(() => {
      contextHandler(({ get }) => {
        // Access Heaven context directly
        const heaven = get('heaven');
        expect(heaven()).toStrictEqual({
          race: 'angel',
          size: 1000,
        });
      });
    });

    // These should remains unchanged
    expect(counter).toStrictEqual({
      heaven: 1,
      earth: 1,
      hell: 1,
    });
    expect(context).toStrictEqual({
      heaven: {
        race: 'angel',
        size: 1000,
      },
      earth: {
        race: 'human',
        size: 5000,
      },
      hell: {
        race: 'demon',
        size: 9999,
      },
    });

    // Updating from the top level
    act(() => {
      contextHandler(({ get }) => {
        // Access Heaven context directly
        const heaven = get('heaven');
        const hell = get('hell');
        // Adjusting the race value
        heaven({ race: 'gods' });
        hell({ race: 'devils' });
      });
    });

    expect(counter).toStrictEqual({
      heaven: 2,
      earth: 1,
      hell: 2,
    });

    expect(context).toStrictEqual({
      heaven: {
        race: 'gods',
        size: 1000,
      },
      earth: {
        race: 'human',
        size: 5000,
      },
      hell: {
        race: 'devils',
        size: 9999,
      },
    });

    // Updating Singular Mode

    act(() => {
      contextHandler(({ get }) => {
        // Access Heaven context directly
        const heavenRace = get('heaven', 'race');
        const hellSize = get('hell', 'size');
        expect(heavenRace()).toBe('gods');
        heavenRace('angels');
        expect(hellSize()).toBe(9999);
        hellSize(500);
      });
    });

    expect(counter).toStrictEqual({
      heaven: 3,
      earth: 1,
      hell: 3,
    });

    expect(context).toStrictEqual({
      heaven: {
        race: 'angels',
        size: 1000,
      },
      earth: {
        race: 'human',
        size: 5000,
      },
      hell: {
        race: 'devils',
        size: 500,
      },
    });
  });
});
