import { jsonStringify } from '../../../js/json/stringify';
import { typeSwitch } from '../../../js/type/switch';
import { TreeDatabase, TreeDatabaseData } from '../class';

type ObjectData = { [key: string]: any };

// The Handler Function. Accesible if pass funtion into exportFunction
type Handler = (args: { string: () => string; object: () => ObjectData }) => any;

export interface ExportFunction {
  (input: Handler): any;
  (): ObjectData;
}

/** Exporting Data into various format */
export const exportFunction = (node: TreeDatabase, input?: any) => {
  // Checking Type Switch
  return typeSwitch(input, {
    function: () =>
      input({
        string: () => jsonStringify(extractData(node)),
        object: () => extractData(node),
      }),
    // If Not Set. Auto Extract Data
    undefined: () => extractData(node),
  });
};

const extractData = (node: TreeDatabase) => extractDataRecursive(node.root().memory());
/** Recursive Stringify */
const extractDataRecursive = (memory: TreeDatabaseData): TreeDatabaseData => {
  // Extracting The Result
  const { parent, children, ...data } = memory;
  const result: any = data;
  // Ignore the Parent, as it is used for reference

  // If Children Exists and Not Empty
  if (children && children.length) {
    // Stringify Children
    result.children = children.map((childMemory) => {
      // Continue to Extract Recursively
      return extractDataRecursive(childMemory);
    });
  }

  // Return the Final Result
  return result;
};
