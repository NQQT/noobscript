import { TypeLayoutRenderer, TypeLayoutRendererComponent } from './renderer.types';
import React, { useState } from 'react';
import { objectObserve } from '@library/presource/js/object/observe';

/**
 * For constructing the layout component
 */
export const layoutRenderer: TypeLayoutRenderer = ({ component, on }) => {
  // Building the Renderer
  const Renderer: React.FC<TypeLayoutRendererComponent> = ({ id, style, props, nested }) => {
    // Extracting the component from the component listing
    const { component: Component, properties: options } = component.list[id];

    const refresh = useState({})[1];

    // The reactive properties
    const reactiveProperties = objectObserve(props, ({ method }) => {
      if (method === 'set') {
        refresh({});
      }
    });

    const additionalProps: any = {};
    if (nested) {
      // Adding additional props
      additionalProps.children = nested.map((nestedProps, index) => {
        return <Renderer key={index} {...nestedProps} />;
      });
    }

    return (
      <Component
        {...reactiveProperties}
        {...additionalProps}
        onMouseOver={() => {
          on.edit({
            // ON Selected triggers
            properties: reactiveProperties,
            options,
          });
        }}
      />
    );
  };

  // Returning the renderer component
  return Renderer;
};
