import { describe, test, expect } from "@jest/globals";
import { createGraphQLQueryString } from "./query";

describe("graphQL Query", () => {
  test("Basic conversion", () => {
    const example1 = createGraphQLQueryString({ search: { name: "astra" } });
    expect(example1).toBe(`{ search(name:"astra") { name } }`);

    const example2 = createGraphQLQueryString({
      search: { name: "$", color: {} },
    });

    expect(example2).toBe(`{ search(name:$name) { name color } }`);
  });
});
