import react from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { describe, test, expect, jest } from "@jest/globals";
import { createReactPromiseHook } from "./create";

describe("usePromise hook", () => {
  // Make sure to fake the timer

  test("normal function with usePromise", () => {
    // Create a use promise
    const usePromise = createReactPromiseHook(react);
    // Use fake timer
    jest.useFakeTimers();
    let counter = 0;
    // getting the result
    const { result } = renderHook(() => {
      counter++;
      // Triggering a function
      return usePromise(() => 1);
    });

    // Run all timer
    act(() => {
      // Run All Timer
      jest.runAllTimers();
    });

    // Only one render
    expect(counter).toBe(2);
    // Expecting the value 1 to be returned
    expect(result.current()).toBe(1);
  });

  test("async function with usePromise", async () => {
    // Creating a usePromise hook
    const usePromise = createReactPromiseHook(react);
    // Run All Timer
    jest.useFakeTimers();
    let counter = 0;
    // getting the result
    const { result } = renderHook(() => {
      counter++;
      // Triggering a function
      return usePromise(async () => 1);
    });

    // The first result should be undefined
    expect(result.current()).toBeUndefined();
    // Run all timer
    await act(async () => {
      // Executing all timer
      jest.runAllTimers();
    });
    expect(counter).toBe(2);
    expect(result.current()).toBe(1);
  });
});
