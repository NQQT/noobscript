import { stringMapValue } from '../maps/value';
import { presetRenderValue } from './render/value';

/** The standard preset for margin */
export const stringPresetMargin = stringMapValue((value) => {
  // Return the Margin
  return { margin: presetRenderValue(value) };
});
