/**
 *
 * Mimicking the Setter Function of Lombok
 *
 */

import { stringCapitalize } from '../../js/string/capitalize';

const Setters =
  () =>
  <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const props = Reflect.ownKeys(this);
        props.forEach((prop: any) => {
          const capitalizedKey = stringCapitalize(prop);
          const methodName = `set${capitalizedKey}`;
          Object.defineProperty(this, methodName, {
            value: (newValue: any) => {
              (this as any)[prop] = newValue;
            },
          });
        });
      }
    };
  };
