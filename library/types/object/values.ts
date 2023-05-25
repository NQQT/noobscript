/** For Extracting Object Values Types */
export type ObjectValues<Base, Conditions = any> = {
  [Key in keyof Base]: Base[Key] extends Conditions ? Base[Key] : never;
}[keyof Base];
