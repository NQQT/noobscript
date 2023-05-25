/** For Freezing an Object, preventing further changes */
export type ObjectFreeze<T> = {
  readonly [Key in keyof T]: ObjectFreeze<T[Key]>;
};
