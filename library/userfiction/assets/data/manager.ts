import { isUndefined, objectProxy, stringSwitch, typeSwitch } from '@library/presource';

type Data = {
  list: { [key: string]: { [key: string]: any } };
  object: any;
  onChange?: () => any;
};

type Structure = (data: Data) => any;

/** Data Manager */
export const dataManager: Structure = (data: any): any => {
  // Extracting List and Object
  const { list, object } = data;

  // Returning a Rquest Object
  const callback = (request: any) =>
    typeSwitch(request, {
      // Smart Handler Function
      // !Fill in smart function handler
      // function: () => {},
      // If String. Return String
      string: () => {
        // Get the Data
        const stringData = list[request] || {};
        list[request] = stringData;
        // Returning the Inventory Data
        return object(stringData);
      },
      // Return The List
      undefined: () => list,
    });

  const updateData = (key: string) => {
    return (update?: any) => {
      if (isUndefined(update)) return data[key];
      data[key] = update;
    };
  };

  // Proxy Function Get
  const proxy = objectProxy(callback, {
    get: ({ k }) => {
      const result = stringSwitch(k, {
        // Updating On Change
        onChange: () => updateData('onChange'),
      });
      // Standard Result Return
      if (result) return result;
      // Else Return Item Modifier
      const item = callback(k);

      // !Not sure what to do here yet
    },
  });

  return proxy;
};
