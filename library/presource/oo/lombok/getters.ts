import { arrayEach } from '../../js/array/each';
import { stringCapitalize } from '../../js/string/capitalize';

export type GettersInterface<T extends { new (...args: any[]): {} }> = Instance<InstanceType<T>>;
type Instance<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

export const LombokGettersDecorator = () => {
  // Decorator Factory. Extending Function Further
  return () => {
    // The actual Decorators
    return <T extends { new (...args: any[]): {} }>(objectClass: T) => {
      // Returning a New Class
      return class extends objectClass {
        // Adding New Constructor
        constructor(...args: any[]) {
          super(...args);
          const $self: any = this;
          const props = Reflect.ownKeys($self);
          arrayEach(props, ({ v: prop }: any) => {
            const capitalizedKey = stringCapitalize(prop);
            const methodName = `get${capitalizedKey}`;
            Object.defineProperty($self, methodName, { value: () => $self[prop] });
          });
        }
      };
    };
  };
};
