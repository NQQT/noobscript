import react from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { describe, test, expect } from "@jest/globals";
import { createReactReferenceHook } from "./create";

describe("Testing custom reference function", () => {
  // Creating an instance of useReference
  const useReference = createReactReferenceHook(react);

  test("Basic reference hook", () => {
    // This will keep record of how many times the rendered hook has been rendered
    let renderedCount = 0;
    // Rendering the Hook
    const { result } = renderHook(() => {
      renderedCount++;
      return useReference();
    });

    // First Render Count should be triggered
    expect(renderedCount).toBe(1);

    // Triggering the React Hook
    act(() => {
      // Expect the Current Result to be Undefined
      expect(result.current()).toBeUndefined();
      // Store value as 5
      result.current(5);
    });

    // Expecting the rendered count to be the same
    // This is because of useRef, not useState
    expect(renderedCount).toBe(1);

    // Expecting the current result to be 5
    expect(result.current()).toBe(5);
  });
});
