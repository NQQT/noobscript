const DEFAULT_VALUE = '2';
const DEFAULT_UNIT = 'rem';

/** For Rendering a preset value */
export const presetRenderValue = (value: string) => {
  const numberValue = +(value || DEFAULT_VALUE);
  // Return based on whatever value it is
  return isNaN(numberValue) ? value : valueAsNumber(numberValue);
};

// If value is a number, renderer through number
const valueAsNumber = (value: number) => {
  // Return the Rem Value
  return value * 0.5 + DEFAULT_UNIT;
};
