import react from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { describe, test, expect } from "@jest/globals";
import { createReactStateHook } from ".";

describe("Testing reactality state hooks", () => {
  // Get the new rewrapped useState
  const useState = createReactStateHook(react);

  test("Basic useState hook", () => {
    let renderedCount = 0;
    // Rendering the Hook with no initial value
    const { result } = renderHook(() => {
      renderedCount++;
      return useState();
    });

    // It has been rendered once
    expect(renderedCount).toBe(1);
    // Expecting the value to be undefined
    expect(result.current()).toBeUndefined();

    act(() => {
      // Updating the value
      result.current(5);
    });

    // It has been rendered again.
    // This is different than from useRef, as it cause the component to be rendered again
    expect(renderedCount).toBe(2);

    expect(result.current()).toBe(5);
  });
});
