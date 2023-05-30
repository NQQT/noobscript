/**
 * types for all component
 *
 */

export type TypeLayoutRendererComponentList = {
  [key: string]: {
    // The Acctual React Component here for rendering
    component: any;
    styles: TypeLayoutRendererComponentListStyles;
    // List of all properties for the component
    properties: TypeLayoutRendererComponentListProperties;
  };
};

export type TypeLayoutRendererComponentListProperties = {
  [key: string]: TypeLayoutRendererComponentListProperty;
};

export type TypeLayoutRendererComponentListProperty = {
  type: 'boolean' | 'select' | 'input';
  options: (number | string | boolean)[];
};

export type TypeLayoutRendererComponentListStyles = {
  [key: string]: TypeLayoutRendererComponentListStyle;
};
export type TypeLayoutRendererComponentListStyle = {
  type: 'boolean' | 'select' | 'input';
  options: (number | string | boolean)[];
};
