import { childrenFunction, ChildrenResponse } from './functions/children';
import { appendFunction } from './functions/append';
import { ExportFunction, exportFunction } from './functions/export';
import { rootFunction } from './functions/root';
import { dataFunction } from './functions/data';
import { parentFunction } from './functions/parent';
import { descendantsFunction, DescendantsFunction } from './functions/descendants';
import { NULL } from '../../js/constants/primitive';
import { objectRegistry } from '../../js/object/registry';
import { objectFill } from '../../js/object/fill';

// The Memory Structure
export type TreeDatabaseData = {
  // The reference to the parent. Can only be one parent
  parent?: TreeDatabaseData;
  // The Tree Node Children. Can contain unlimited number of children
  children?: TreeDatabaseData[];
  // The Data within the Tree Node
  // It could be anything
  data?: any;
};

// The Standard Tree Database
export class TreeDatabase {
  memory: any = NULL;
  // Building the Constructor
  constructor(memory: TreeDatabaseData = {}) {
    // Updaating the memory object
    this.memory = objectRegistry(
      // Filling in the Memory to make sure parent and children exists
      objectFill(memory || {}, {
        parent: NULL,
        children: [],
      }),
    );
  }

  // Appending New Data
  data = (value?: any) => dataFunction(this, value);

  // Get the Root within the Tree Database
  root = () => rootFunction(this);
  parent = () => parentFunction(this);

  // Standard Append Function
  append = (data?: any): TreeDatabase => appendFunction(this, data);
  export: ExportFunction = (input?) => exportFunction(this, input);

  /** The Children Handler Function */
  children: ChildrenResponse = (input?) => childrenFunction(this, input);
  /** The Descendant Handler Function */
  descendants: DescendantsFunction = (input?) => descendantsFunction(this, input);
}
