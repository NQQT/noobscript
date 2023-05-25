import { stringMapValue } from '../maps/value';
import { presetRenderValue } from './render/value';

/** The standard preset for margin */
export const stringPresetPadding = stringMapValue((value) => {
  // Return the Margin
  return { padding: presetRenderValue(value) };
});
