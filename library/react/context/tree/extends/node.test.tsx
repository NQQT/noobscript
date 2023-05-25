import React from "react";
import { render, act } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import { createReactContextTreeNode } from "./node";

describe("Context Tree Node", () => {
  // Getting the parent and child
  const {
    parent: ParentNodeProvider,
    child: ChildNodeProvider,
    reactive: useContextState,
    reference: useContextReference,
    handler: contextHandler,
  } = createReactContextTreeNode(React);

  test("Context must be able to be rendered", () => {
    // Rendering the Parent Node
    render(<ParentNodeProvider />);

    // Child Node cannot be rendered by itself. It needs to be loaded within a parent context
    render(
      <ParentNodeProvider>
        <ChildNodeProvider />
      </ParentNodeProvider>
    );

    // Proper Rendering
    render(
      <ParentNodeProvider>
        <ChildNodeProvider />
        <ChildNodeProvider />
      </ParentNodeProvider>
    );

    // Nesting should all be valid
    render(
      <ParentNodeProvider>
        <ChildNodeProvider />
        <ParentNodeProvider />
        <ParentNodeProvider>
          <ChildNodeProvider />
          <ChildNodeProvider />
        </ParentNodeProvider>
      </ParentNodeProvider>
    );
  });

  test("Cascading Context", () => {
    // Setting the Context
    const context = {
      alpha: "valid",
      beta: "valid",
    };

    // Setting the All Switch
    const AllSwitch = React.memo(() => {
      const reference = useContextReference();
      expect(reference()).toStrictEqual({ alpha: "valid", beta: "valid" });
      return null;
    });

    // Type Switch
    const AlphaSwitch = React.memo(() => {
      // Setting the context reference
      const reference = useContextReference();

      expect(reference()).toStrictEqual({ value: "valid" });

      return null;
    });

    const BetaSwitch = React.memo(() => {
      // Setting the context reference
      const reference = useContextReference();

      expect(reference()).toStrictEqual({ value: "valid" });
      // Returning Null
      return null;
    });

    // Rendering the parent node
    render(
      <ParentNodeProvider value={context}>
        <AllSwitch />
        <ChildNodeProvider id="alpha">
          <AlphaSwitch />
        </ChildNodeProvider>
        <ChildNodeProvider id="beta">
          <BetaSwitch />
        </ChildNodeProvider>
      </ParentNodeProvider>
    );
  });
});
