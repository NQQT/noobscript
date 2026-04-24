import { stringMapValue } from '../maps';
import { presetRenderValue } from './render';

/** The standard preset for margin */
export const stringPresetMargin = stringMapValue((value) => {
    // Return the Margin
    return { margin: presetRenderValue(value) };
});
