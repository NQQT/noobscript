/** This add suffix to the string */
export type StringSuffixAdd<TKey, TSuffix extends string> = TKey extends string ? `${TKey}${TSuffix}` : never;

/** This remove suffix of a string */
export type StringSuffixRemove<TSuffixedKey, TSuffix extends string> = TSuffixedKey extends StringSuffixAdd<
  infer TKey,
  TSuffix
>
  ? TKey
  : '';
