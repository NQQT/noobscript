import { stringMapValue } from '../maps';
import { presetRenderValue } from './render';

/** The standard preset for margin */
export const stringPresetPadding = stringMapValue((value) => {
    // Return the Margin
    return { padding: presetRenderValue(value) };
});
