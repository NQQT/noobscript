/**
 * This is a preset configuration for Material UI
 */

import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import {
  rendererHelpersComponentPropertyBooleanOptions as booleanOptions,
  rendererHelpersComponentPropertySelectOptions as selectOptions,
  TypeLayoutRendererComponentList,
} from 'assets';

export const rendererPresetMaterialUIComponents: TypeLayoutRendererComponentList = {
  Button: {
    component: Button,
    styles: {},
    properties: {
      variant: selectOptions('text', 'outlined', 'filled', 'filledTonal', 'elevated'),
      color: selectOptions('primary', 'secondary', 'tertiary'),
      size: selectOptions('small', 'medium', 'large'),
      disabled: booleanOptions(),
    },
  },
  ToggleButtonGroup: {
    component: ToggleButtonGroup,
    styles: {},
    properties: {
      disabled: booleanOptions(),
      exclusive: booleanOptions(),
      fullWidth: booleanOptions(),
      orientation: selectOptions('horizontal', 'vertical'),
      color: selectOptions('primary', 'secondary', 'error', 'info', 'success', 'warning'),
      size: selectOptions('small', 'medium', 'large'),
    },
  },
  ToggleButton: {
    component: ToggleButton,
    styles: {},
    properties: {
      disabled: booleanOptions(),
      selected: booleanOptions(),
      fullWidth: booleanOptions(),
      color: selectOptions('primary', 'secondary', 'error', 'info', 'success', 'warning'),
      size: selectOptions('small', 'medium', 'large'),
    },
  },
};
