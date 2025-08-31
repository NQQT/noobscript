/** Checking if Object has a Key */
export const objectHasKey = <T extends {}>(object: T, key: any): key is keyof T => object.hasOwnProperty(key);
