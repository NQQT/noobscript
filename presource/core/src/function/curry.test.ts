import { functionCurry } from '@presource/core';

describe('Testing Curry Function - the ability to construct curry function easily', () => {
  it('should be able to curry functions', () => {
    // Create a Sum function
    const sum = (a: number, b: number, c: number) => a + b + c;
    const currySum = functionCurry(sum);

    expect(currySum(5, 10, 20)).toBe(35);
    expect(currySum(5)(10)(20)).toBe(35);
    expect(currySum(5, 10)(20)).toBe(35);
    expect(currySum(5)(10, 20)).toBe(35);
  });

  it('should still work with different naming convention', () => {
    // let's create an example
    const divideBy = functionCurry((a: number, b: number) => b / a);
    const multiplyBy = functionCurry((a: number, b: number) => a * b);

    const divideByTwo = divideBy(2);
    expect(divideByTwo(10)).toBe(5);

    const mupltiplyByFive = multiplyBy(5);
    expect(mupltiplyByFive(10)).toBe(50);
  });
});
