import react from 'react';
import { act, renderHook } from '@testing-library/react';
import { createReactDelayHook } from './create';

describe('delayHook test', () => {
  // Creating a useDelayHook with the native react
  const useDelayHook = createReactDelayHook(react);

  test('Testing basic delaying concept', () => {
    // Using fake timer
    jest.useFakeTimers();
    let counter = 0;
    const { result } = renderHook(() => {
      counter++;
      return useDelayHook(() => 'delayed', 10);
    });

    // Counter has been rendered
    expect(counter).toBe(1);
    // No result should return yet as no time has passed
    expect(result.current()).toBeUndefined();
    act(() => {
      // Clear all the timer
      jest.runAllTimers();
    });
    expect(counter).toBe(2);
    expect(result.current()).toBe('delayed');
  });

  test('Overwriting a delay before it is triggered', () => {
    jest.useFakeTimers();
    let counter = 0;
    const { result } = renderHook(() => {
      counter++;
      return useDelayHook(() => 'delayed', 10);
    });
    // Counter has been rendered
    expect(counter).toBe(1);
    // No result should return yet as no time has passed
    expect(result.current()).toBeUndefined();
    act(() => {
      // Overwriting the delayed
      result.current(() => 'waiting');
      jest.runAllTimers();
    });

    expect(counter).toBe(2);
    expect(result.current()).toBe('waiting');
  });

  test('As a debounce hook', () => {
    jest.useFakeTimers();
    let counter = 0;
    const { result } = renderHook(() => {
      counter++;
      return useDelayHook(() => 0, 10);
    });
    // Counter has been rendered
    expect(counter).toBe(1);
    // No result should return yet as no time has passed
    expect(result.current()).toBeUndefined();

    act(() => {
      // Rapid Clicking
      result.current(1);
      result.current(2);
      result.current(3);
      result.current(4);
    });

    // Component should not rendered yet despite all the clicking
    expect(counter).toBe(1);
    expect(result.current()).toBeUndefined();
    act(() => {
      // Elapse all timer
      jest.runAllTimers();
    });

    // Re-rendered due to debounce trigger
    expect(counter).toBe(2);
    expect(result.current()).toBe(4);
  });

  test('Can also accept async function if needed', async () => {
    jest.useFakeTimers();
    let counter = 0;
    const { result } = renderHook(() => {
      counter++;
      return useDelayHook(() => 'delayed', 10);
    });
    // Counter has been rendered
    expect(counter).toBe(1);
    // No result should return yet as no time has passed
    expect(result.current()).toBeUndefined();
    await act(async () => {
      // Overwriting the delayed
      result.current(async () => 'awaiting');
      jest.runAllTimers();
    });

    expect(counter).toBe(2);
    expect(result.current()).toBe('awaiting');
  });
});
