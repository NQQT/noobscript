import react from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, test } from '@jest/globals';
import { createReactToggleHook } from '.';

describe('Testing useToggle Hook', () => {
  // Creating the useToggle hook
  const useToggle = createReactToggleHook(react);

  test('Basic usage of useToggle', () => {
    // The Number of time the component rendered
    let renderedCount = 0;

    // Rendering a Hooked component
    const { result } = renderHook(() => {
      renderedCount++;
      return useToggle();
    });

    // For First Render
    expect(renderedCount).toBe(1);
    // The initial value (not set)
    expect(result.current()).toBeFalsy();

    // Setting value to true
    act(() => {
      result.current(true);
    });

    // It has been re-rendered due to changes in toggle value
    expect(renderedCount).toBe(2);
    expect(result.current()).toBeTruthy();

    // Toggle value has not been changed
    act(() => {
      result.current(true);
    });

    // The result remains true
    expect(result.current()).toBeTruthy();
    // The renderer count should be 2, as data has not been changed!
    expect(renderedCount).toBe(2);

    // And this is more efficient than using useState only
  });
});
