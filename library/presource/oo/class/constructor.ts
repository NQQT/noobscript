import { objectConstant } from '../../js/object/constant';

type ClassConstructor = <T extends { new (...args: any[]): InstanceType<T> }>(instance: T) => InstanceType<T>;

// Return the class constructor
export const classConstructor: ClassConstructor = (instance) => {
  return objectConstant().getPrototypeOf(instance).constructor;
};

class A {
  constructor(public a: number) {}
}

// declare that the return value of the class constructor returns an instance of that class
function f<W extends { new (a: number): InstanceType<W> }>(e: W) {
  return new e(2); // return type is automatically inferred to be InstanceType<W>
}

let w = f(A); // w: A
