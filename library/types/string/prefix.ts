/** This add prefix to string */
export type StringPrefixAdd<TKey, TPrefix extends string> = TKey extends string ? `${TPrefix}${TKey}` : never;

/** This remove prefix to string */
export type StringPrefixRemove<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends StringPrefixAdd<
  infer TKey,
  TPrefix
>
  ? TKey
  : '';
