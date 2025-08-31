import { isEqual } from '../is/equal';
import { isObject } from '../is/object';
import { isUndefined } from '../is/undefined';
import { toString } from '../to/string';
import { objectAlias } from './alias';
import { objectEach, objectEachAliasKey } from './each';

type Arguments = {
  key: string;
  value: any;
  object: { [key: string]: any };
  index: number;
  length: number;
  path: string[];

  // Shorthand Notations
  l: number;
  o: { [key: string]: any };
  k: string;
  v: any;
  i: number;
  p: string[];
};

type Callback = (args: Arguments) => any;
// Persitance, Recursive Data
type Recursive = {
  // The Chain Pathways
  path: string[];
};
type Structure = (object: { [key: string]: any }, callback: Callback, recursive?: Recursive) => void;

// For Scanning an Object, running deeply. Can also detect nested
export const objectScan: Structure = (object, callback, recursive = { path: [] }) => {
  // Using Special Object Each as Based Scanner
  objectEach(object, (data) => {
    // Extracting the value and key
    const { v, k } = data;
    const path = recursive.path.slice();

    const params: any = objectAlias(
      { ...data, path },
      {
        ...objectEachAliasKey,
        p: 'path',
      },
    );

    // Replacement for the value (if necessary)
    const replacement = callback(params);

    // Checking if Replacement is a value
    if (!isUndefined(replacement)) {
      // If Replacement is Not Undefined
      object[k] = replacement;
    }

    // Checking whether object[k] is still value
    // Do not continue with replacement due to possible recursive loop
    if (isEqual(v, object[k]) && isObject(v)) {
      // If it is, then continue
      const newPath = [...path];
      // Adding K to New Path
      newPath.push(toString(k));
      // Scanning the nested value with new callback
      objectScan(v, callback, { path: newPath });
    }
  });
};
