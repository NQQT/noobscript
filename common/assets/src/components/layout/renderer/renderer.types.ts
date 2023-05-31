import { TypeLayoutRendererComponentList } from './helpers';
import React from 'react';

export type TypeLayoutRenderer = (
  configurations: TypeLayoutRendererConfigurations,
) => React.FC<TypeLayoutRendererComponent>;

export type TypeLayoutRendererConfigurations = {
  component: {
    // List of component that the renderer can be used to generate
    list: TypeLayoutRendererComponentList;
  };
  on: {
    // On Editing a component via UI. This should trigger a way to modify styles and props
    edit: (data: any) => any;
  };
};

export type TypeLayoutRendererComponent = {
  id: string;
  style?: TypeLayoutRendererComponentStyle;
  props?: TypeLayoutRendererComponentProperties;
  nested?: TypeLayoutRendererComponent[];
};

export type TypeLayoutRendererComponentStyle = { [key: string]: number | string };

// This is the type for the component's properties layout.
// For now, it is simply list of keys and any value assigned to that key
export type TypeLayoutRendererComponentProperties = { [key: string]: any };
