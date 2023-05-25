import { describe, test, expect } from "@jest/globals";
import { createGraphQLRequestString } from "./request";

describe("graphQL Request String", () => {
  // This will create a graphQL response string
  test("Basic conversion from object data", () => {
    // Some basic structure
    expect(
      createGraphQLRequestString({
        hero: {
          name: {},
        },
      })
    ).toBe("{ hero { name } }");

    expect(
      createGraphQLRequestString({
        family: {
          mother: { name: {}, age: {} },
          father: { name: {}, age: {} },
        },
      })
    ).toBe("{ family { mother { name age } father { name age } } }");
  });

  test("With parameters", () => {
    expect(
      createGraphQLRequestString({
        "family(member:5)": {
          mother: { name: {}, age: {} },
          father: { name: {}, age: {} },
        },
      })
    ).toBe("{ family(member:5) { mother { name age } father { name age } } }");
  });
});
