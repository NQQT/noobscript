import { SPACE } from '../../../js/constants/string';
import { isUndefined } from '../../../js/is/undefined';
import { stringSwitch } from '../../../js/string/switch';
import { stringMapValue } from '../maps/value';

/** Preset Border Value controller */
export const stringPresetBorder = stringMapValue((borderStyle, borderWidth, borderColor) => {
  // Evaluating and Filtering
  borderStyle = evaluateBorderStyle(borderStyle);
  borderWidth = evaluateBorderWidth(borderWidth);
  borderColor = evaluateBorderColor(borderColor);
  // Converting The Border
  const border = [borderWidth, borderStyle, borderColor].join(SPACE).trim();
  // Returning the Border Information
  return { border };
});

const evaluateBorderStyle = (style: string): string =>
  stringSwitch(style, {
    d: 'dashed',
    s: 'solid',
    default: () => style || 'solid',
  });

const evaluateBorderWidth = (width: any): string => {
  if (isUndefined(width)) return '1px';
  // Return the value if NaN
  return isNaN(width) ? width : width + 'px';
};

const evaluateBorderColor = (color: any): string => color || '';
