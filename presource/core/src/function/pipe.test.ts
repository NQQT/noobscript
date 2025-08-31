import { functionPipe } from './pipe';

describe('Function piping test', () => {
  test('it should be able to pipe values down', () => {
    const multipleByPi = (value: any) => value * Math.PI;
    const divideBy180 = (value: any) => value / 180;

    const sine = functionPipe(multipleByPi, divideBy180, Math.sin);

    expect(sine(90)).toBe(1);
  });
});
