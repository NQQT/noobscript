import { isUndefined, objectFilter, typeSwitch } from '@library/presource';
import { createReactContextTree } from '..';

/** Extending Context Tree */
export const createReactContextTreeNode = (react: any) => {
  // Get the Context Controllerf
  const context = createReactContextTree(react);

  // The Parent Node
  const parent = context.provider;

  // The Child Node
  const child = react.memo(({ name, id, children }: any) => {
    // Get the Value
    const state = context.reactive(id);

    // Getting the Value for creation of element
    const value = typeSwitch(state(), {
      // Function is more special
      function: () => {
        // Experimental at the moment. Will work more on this
        return null;
      },
      // If Object. Return the object as it is
      object: ({ v }) => v,
      // By Default. Return value as it is
      default: ({ v }) => ({ value: v }),
    });

    // Getting the Props Data
    const props = objectFilter({ name, value }, ({ v }) => !isUndefined(v));

    // Create the element
    return react.createElement(parent, props, children);
  });

  return {
    // Return all the natural context data
    ...context,
    parent,
    child,
  };
};
