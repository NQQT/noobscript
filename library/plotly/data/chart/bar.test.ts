import { describe, test, expect } from "@jest/globals";
import { plotBarChartData } from "./bar";

describe("Plotting Bar Data", () => {
  // Sample
  const sample = { fruit: { apple: 1, banana: 2 } };

  test("Basic bar plot", () => {
    // Expecting the input equal to output
    expect(plotBarChartData(sample)).toStrictEqual([
      { name: "fruit", type: "bar", x: ["apple", "banana"], y: [1, 2] },
    ]);
  });
});
