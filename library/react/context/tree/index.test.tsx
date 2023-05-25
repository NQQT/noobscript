import React from "react";
import { render, act } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import { createReactContextTree } from ".";

describe("Advance Context Tree Functionality", () => {
  // This is how you create a Tree Context
  const {
    reactive: useContextState,
    reference: useContextRef,
    provider: ContextProvider,
    handler: contextHandler,
  } = createReactContextTree(React);

  test("Checking whether context provider can be rendered", () => {
    // Can use Normal Render
    render(<ContextProvider />);
    render(<ContextProvider value={{ id: "hello" }} />);
  });

  test("Real world cases", () => {
    const contextValue = { actions: [] };

    const State = React.memo(() => {
      const context = useContextState();
      expect(context()).toStrictEqual(contextValue);
      return null;
    });

    const value = { actions: [] };

    render(
      <ContextProvider value={value}>
        <State />
      </ContextProvider>
    );
  });
});

/** This is to test the context level controllers */
describe("Nested Context Level", () => {
  // Building the Necessary Context
  const {
    reactive: useContextState,
    reference: useContextRef,
    provider: ContextProvider,
  } = createReactContextTree(React);

  let heavenCount = 0;
  // Constructing Some Level For Manipulation
  const heavenContext: any = { level: "heaven" };
  const HeavenLevel = React.memo(() => {
    // Increment by One
    heavenCount++;
    const context = useContextState();
    expect(context()).toStrictEqual(heavenContext);
    return null;
  });

  let spaceCount = 0;
  const spaceContext: any = { level: "space" };
  const SpaceLevel = React.memo(() => {
    // Increment by One
    spaceCount++;
    const context = useContextState();
    expect(context()).toStrictEqual(spaceContext);
    return null;
  });

  let skyCount = 0;
  const skyContext: any = { level: "sky" };
  const SkyLevel = React.memo(() => {
    // Increment By One
    skyCount++;
    const context = useContextState();
    expect(context()).toStrictEqual(skyContext);
    return null;
  });

  let groundCount = 0;
  const groundContext: any = { level: "ground" };
  const GroundLevel = React.memo(() => {
    // Increment By one
    groundCount++;

    const context = useContextState();
    expect(context()).toStrictEqual(groundContext);
    return null;
  });

  let earthCount = 0;
  const earthContext: any = { level: "earth" };
  const EarthLevel = React.memo(() => {
    // Checking Incremental Level
    earthCount++;
    const context = useContextState();
    expect(context()).toStrictEqual(earthContext);

    // Getting One level above. Which is ground Level context
    const groundLevel = useContextState(-1);
    expect(groundLevel()).toStrictEqual(groundContext);

    // Can access by name
    const heavenLevel = useContextState({ layer: "heaven" });
    expect(heavenLevel()).toStrictEqual(heavenContext);

    return null;
  });

  const controller: any = {};
  const Controller = React.memo(() => {
    // Getting all Reference Controller
    controller.heaven = useContextRef({ layer: "heaven" });
    controller.space = useContextRef({ layer: "space" });
    controller.sky = useContextRef({ layer: "sky" });
    controller.ground = useContextRef({ layer: "ground" });
    controller.earth = useContextRef({ layer: "earth" });
    return null;
  });

  test("Accessing Correct Data", () => {
    // Rendering the Necessary Context for Testing
    render(
      <ContextProvider name="heaven" value={{ level: "heaven" }}>
        <HeavenLevel />
        <ContextProvider name="space" value={{ level: "space" }}>
          <SpaceLevel />
          <ContextProvider name="sky" value={{ level: "sky" }}>
            <SkyLevel />
            <ContextProvider name="ground" value={{ level: "ground" }}>
              <GroundLevel />
              <ContextProvider name="earth" value={{ level: "earth" }}>
                <EarthLevel />
                <Controller />
              </ContextProvider>
            </ContextProvider>
          </ContextProvider>
        </ContextProvider>
      </ContextProvider>
    );

    expect(heavenCount).toBe(1);
    expect(spaceCount).toBe(1);
    expect(skyCount).toBe(1);
    expect(groundCount).toBe(1);
    expect(earthCount).toBe(1);
  });

  test("Updating and Triggering Re-rendering", () => {
    // Rendering the Necessary Context for Testing
    render(
      <ContextProvider name="heaven" value={{ level: "heaven" }}>
        <HeavenLevel />
        <ContextProvider name="space" value={{ level: "space" }}>
          <SpaceLevel />
          <ContextProvider name="sky" value={{ level: "sky" }}>
            <SkyLevel />
            <ContextProvider name="ground" value={{ level: "ground" }}>
              <GroundLevel />
              <ContextProvider name="earth" value={{ level: "earth" }}>
                <EarthLevel />
                <Controller />
              </ContextProvider>
            </ContextProvider>
          </ContextProvider>
        </ContextProvider>
      </ContextProvider>
    );

    // Checking Count
    expect(heavenCount).toBe(2);
    expect(spaceCount).toBe(2);
    expect(skyCount).toBe(2);
    expect(groundCount).toBe(2);
    expect(earthCount).toBe(2);

    // Extracting all controllers
    const { heaven, space, sky, ground, earth } = controller;

    heavenContext.count = 1;
    act(() => {
      // Updating Heaven
      heaven({ count: 1 });
    });

    // Checking Count again
    expect(heavenCount).toBe(3);
    expect(spaceCount).toBe(2);
    expect(skyCount).toBe(2);
    expect(groundCount).toBe(2);
    expect(earthCount).toBe(3);

    groundContext.native = "human";
    act(() => {
      ground({ native: "human" });
    });

    // Expecting the Count
    expect(heavenCount).toBe(3);
    expect(spaceCount).toBe(2);
    expect(skyCount).toBe(2);
    expect(groundCount).toBe(3);
    expect(earthCount).toBe(4);
  });
});
