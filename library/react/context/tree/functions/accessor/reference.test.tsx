import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { describe, test, expect } from '@jest/globals';
import { createReactContextTree } from '../..';

describe('Testing Tree reference hook within context', () => {
  // This is how you create a Tree Context
  const { reference: useContextRef, provider: ContextProvider } = createReactContextTree(React);

  test('Checking Basic usage of reference hook', () => {
    // The Record is stored here
    const record = {};
    // Creating a wrapper to test the react hook
    const wrapper = ({ children }: any) => <ContextProvider value={record}>{children}</ContextProvider>;
    // The number of rendered been recorded
    let renderedCount = 0;

    // Getting the result back from the render hook
    const { result } = renderHook(
      () => {
        // Increase Rendered Count by 1
        renderedCount++;
        return useContextRef();
      },
      { wrapper },
    );

    // Expect the Current Context Ref to be Equal to 0
    expect(renderedCount).toBe(1);
    expect(result.current()).toStrictEqual({});

    // Updating The Render
    act(() => {
      // Updating Current
      result.current({ a: 1 });
    });
    // No rendered get triggered because it uses reference
    expect(renderedCount).toBe(1);
    // Updating the Data
    expect(result.current()).toStrictEqual({ a: 1 });
  });

  test('Using reference hook with selective fields', () => {
    // The Record is stored here
    const record = {};
    // Creating a wrapper to test the react hook
    const wrapper = ({ children }: any) => <ContextProvider value={record}>{children}</ContextProvider>;

    // Using Selective Field reduce server load and re-rendering
    let selectiveACounter = 0;
    let selectiveBCounter = 0;

    // The Main Function. Fruits
    const fruits = renderHook(() => useContextRef(), { wrapper }).result;

    const apple = renderHook(
      () => {
        selectiveACounter++;
        return useContextRef('a');
      },
      { wrapper },
    ).result;

    const banana = renderHook(
      () => {
        selectiveBCounter++;
        return useContextRef('b');
      },
      { wrapper },
    ).result;

    // Expect the Current Context Ref to be Equal to 0
    expect(selectiveACounter).toBe(1);
    expect(selectiveBCounter).toBe(1);
    expect(apple.current()).toBeUndefined();
    expect(banana.current()).toBeUndefined();

    // Updating The Render
    act(() => {
      // Updating the current field "a" with value
      apple.current('apple');
    });

    // No rendered get triggered because it uses reference
    expect(selectiveACounter).toBe(1);
    expect(selectiveBCounter).toBe(1);
    // A should updated, but B should not
    expect(apple.current()).toBe('apple');
    expect(banana.current()).toBeUndefined();

    // Updating The Render
    act(() => {
      // Updating the current field "a" with value
      banana.current('banana');
    });

    // No rendered get triggered because it uses reference
    expect(selectiveACounter).toBe(1);
    expect(selectiveBCounter).toBe(1);
    // A should updated, but B should not
    expect(apple.current()).toBe('apple');
    expect(banana.current()).toBe('banana');

    // Let update both using master
    act(() => {
      // Updating current
      fruits.current({ a: 'banana', b: 'apple' });
    });

    // No rendered get triggered because it uses reference
    expect(selectiveACounter).toBe(1);
    expect(selectiveBCounter).toBe(1);
    // A should updated, but B should not
    expect(apple.current()).toBe('banana');
    expect(banana.current()).toBe('apple');
    // Can use Master to Access
    expect(fruits.current()).toStrictEqual({ a: 'banana', b: 'apple' });
  });
});
