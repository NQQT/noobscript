import { describe, test, expect } from "@jest/globals";
import { createGraphQLVariableString } from "./variable";

describe("graphQL Variable String", () => {
  test("Basic Variable String", () => {
    // Expecting sample
    expect(createGraphQLVariableString({ name: "john" })).toBe(`(name:"john")`);

    expect(
      createGraphQLVariableString({ name: { first: "john", last: "doe" } })
    ).toBe(`(name:{\"first\":\"john\",\"last\":\"doe\"})`);
  });

  test("More commonly used as follow", () => {
    // When using $ prefix value
    expect(createGraphQLVariableString({ name: "$" })).toBe("(name:$name)");
    expect(createGraphQLVariableString({ name: "$hisname" })).toBe(
      "(name:$hisname)"
    );
  });
});
