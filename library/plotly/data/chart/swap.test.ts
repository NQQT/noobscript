import { describe, test, expect } from "@jest/globals";
import { plotlySwapInputChartData } from "./swap";

describe("Swap Input Data", () => {
  test("Basic Swapping Data usage", () => {
    // Sample
    const input = { fruit: { apple: 1, banana: 2 } };
    const output = {
      apple: { fruit: 1 },
      banana: { fruit: 2 },
    };
    expect(plotlySwapInputChartData(input)).toStrictEqual(output);
    // Should be able to swap both ways
    expect(plotlySwapInputChartData(output)).toStrictEqual(input);
  });

  test("With more complex data structure", () => {
    const input = {
      state: { vic: 1, nsw: 2, qld: 3 },
      branch: { offshore: 1, onshore: 2 },
      system: { offshore: 5, onshore: 10 },
    };
    const output = {
      vic: { state: 1 },
      nsw: { state: 2 },
      qld: { state: 3 },
      offshore: { branch: 1, system: 5 },
      onshore: { branch: 2, system: 10 },
    };

    // Checking data structure
    expect(plotlySwapInputChartData(input)).toStrictEqual(output);
    expect(plotlySwapInputChartData(output)).toStrictEqual(input);
  });
});
