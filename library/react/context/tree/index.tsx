import { resolveDataFunction } from './functions/resolver/data';
import { useAccessorReactiveFunction } from './functions/accessor/reactive';
import { accessorReferenceFunction } from './functions/accessor/reference';
import { handlerGetFunction } from './functions/handler/get';
import { instanceCreate } from '@library/presource/js/instance/create';
import { setConstant } from '@library/presource/js/set/constant';
import { treeDatabase } from '@library/presource/db';
import { objectFilter } from '@library/presource/js/object/filter';
import { isUndefined } from '@library/presource/js/is/undefined';

/** For Creating Tree Context */
export const createReactContextTree = (react: any) => {
  // Extracting Necessary Object
  const { memo, useMemo, createContext, useContext, createElement } = react;

  // The Root Tree
  let root: any;

  // Using React to Create Context Object
  const Context = createContext({});
  // Constructing the Native Context Provider
  const Provider = Context.Provider;

  // Creating the Context Provider to Consume
  const ContextProvider = memo(({ name, value, children }: any) => {
    // Creating the Context Data
    const context = {
      // Value can be change, so will change according to value
      database: useMemo(() => value || {}, [value]),
      // Unlike database above, remember the listener, it will be recreated
      listener: useMemo(() => ({}), []),
      // Same as listener. Observer will not be recreated
      observer: useMemo(() => instanceCreate(setConstant()), []),
    };

    // Get the Context
    const contextData = useContext(Context);

    // Get the Correct Context Tree
    const currentTree = useMemo(() => {
      // Get the current tree from context
      let { tree } = contextData;
      // If the parent tree does not exists, then the tree is the root
      // This can only occured if the root is not entirely defined
      if (!tree) {
        // Create a New Root Tree
        tree = treeDatabase();
        // Save the Tree as Root
        root = tree;
        // Return the Tree itself
        return tree;
      }
      // Else. Return a New tree
      return tree.append();
    }, []);

    // Keep Updating the Tree Value. Overwriting if necessary
    currentTree.data(objectFilter({ name, context }, ({ v }) => !isUndefined(v)));

    // Return the Provider as React Element
    return createElement(Provider, { value: { tree: currentTree } }, children);
  });

  const useRelativeContext = (parameters: any[]): any => {
    const { tree } = useContext(Context);
    // Get the Relative Context
    return resolveDataFunction({ parameters, tree });
  };

  // Reactive Hook. That is, useState
  const reactive = (...data: any[]) => {
    // getting the context and id
    const { context, field } = useRelativeContext(data);
    // Return the accessor function
    return useAccessorReactiveFunction({ react, context, field });
  };

  // The Reference Hook. That is, useRef
  const reference = (...data: any[]) => {
    const { context, field } = useRelativeContext(data);
    return accessorReferenceFunction({ context, field });
  };

  /** Helper type script */
  type Arguments = {
    root: () => ReturnType<typeof treeDatabase>;
    get: (id: string, field?: string) => ReturnType<typeof accessorReferenceFunction>;
  };
  type Callback = (args: Arguments) => any;

  // Advance Handler Function
  const handler = (callback: Callback) =>
    callback({
      // Getting the Root Database
      root: () => root,
      // Return the get Function
      get: (id: string, field?: string) => handlerGetFunction({ root, id, field }),
      // Accessing Pay
    });
  // Return The Tree Context to Consume
  return {
    // Returning the React object
    react,
    context: Context,
    provider: ContextProvider,
    reactive,
    reference,
    handler,
  };
};
