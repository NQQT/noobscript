import { StringPrefixAdd, StringPrefixRemove } from '../string/prefix';

/** Adding Prefix to Object Keys. */
export type ObjectPrefixKeys<Base extends object, TPrefixKey extends string> = {
  [Key in StringPrefixAdd<keyof Base, TPrefixKey>]: Base extends {
    // Selecting only certain value
    [SelectedKey in StringPrefixRemove<Key, TPrefixKey>]: infer SelectedValue;
  }
    ? SelectedValue
    : never;
};
