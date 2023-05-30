import { TypeLayoutRendererComponentListProperty } from './component.types';

export const rendererHelpersComponentPropertyBooleanOptions = (): TypeLayoutRendererComponentListProperty => {
  return {
    type: 'boolean',
    options: [true, false],
  };
};

export const rendererHelpersComponentPropertySelectOptions = (
  ...options: string[]
): TypeLayoutRendererComponentListProperty => {
  return {
    type: 'select',
    options,
  };
};
