import { describe, test, expect } from "@jest/globals";
import { styledPresetGridFlow } from "./flow";

describe("Grid Flow Filler", () => {
  test("Basic Filler Test", () => {
    const value = "flex";

    // Polyfill a Style Object
    const style = styledPresetGridFlow({ value, v: value } as any);
    // Returning the expectev alue
    expect(style).toStrictEqual({
      display: "inline-grid",
      gridAutoFlow: "column",
    });
  });
});
