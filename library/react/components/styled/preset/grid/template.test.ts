import { describe, test, expect } from "@jest/globals";
import { styledPresetGridTemplate } from "./template";

describe("Filler Grid Template", () => {
  test("Filling Style Object Correctly", () => {
    // Polyfill with a value of 5
    // That is, equal spacing
    expect(styledPresetGridTemplate({ v: 5 } as any)).toStrictEqual({
      gridTemplate: "1fr 1fr 1fr 1fr 1fr",
    });
    // String also works, but probably less efficient
    expect(styledPresetGridTemplate({ v: "5" } as any)).toStrictEqual({
      gridTemplate: "1fr 1fr 1fr 1fr 1fr",
    });
  });
});
