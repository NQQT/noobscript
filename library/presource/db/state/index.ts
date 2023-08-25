/**
 * State Database helps build the state of the database through predefined methods
 */

type Recursive<T> = {
  [key in keyof T]: (...input: Parameters<T[key]>) => ReturnType<T[key]>;
};

type StateDatabase = <T>(methods: () => T) => Recursive<T>;

export const stateDatabase: StateDatabase = (input) => {
  // The Memory Block
  const memory = {};
  // Building the Function Chainer
  return input();
};

const react = stateDatabase(() => ({
  get: (input: string) => react,
  find: (input: string) => react,
  then: (callback: any) => {
    callback();
  },
}));
react.get('file').get('abc').find('abc');
react
  .get('file')
  .find('abc')
  .then(() => 'a');
