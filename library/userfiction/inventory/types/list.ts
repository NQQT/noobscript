import { InventoryItemType } from './item';

/**
 * Item are organised into a list, which is defined by the InventoryListType.
 * While it is simple, it is designed like this for future expansions.
 */

export type InventoryListType = { [key: string]: InventoryItemType };
