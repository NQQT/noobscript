/** For Extracting Object Keys Types */
export type ObjectKeys<Base, Conditions = any> = {
  [Key in keyof Base]: Base[Key] extends Conditions ? Key : never;
}[keyof Base];
