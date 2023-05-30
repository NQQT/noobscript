import React, { useState } from 'react';
import { objectEach, objectHasKey, stringSwitch } from '@library/presource';
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { TypeLayoutRendererComponentListProperty, TypeLayoutRendererComponentProperties } from '../../index';

export type TypeRendererEditorProperty = {
  props: TypeLayoutRendererComponentProperties;
  // Configuration for that particular property
  configs: {
    [key: string]: TypeLayoutRendererComponentListProperty;
  };
};

/**
 * Designing for Property Editor
 */
export const RendererEditorProperty: React.FC<TypeRendererEditorProperty> = ({ props, configs }) => {
  const editors: any[] = [];

  objectEach(props, ({ key, value }) => {
    if (objectHasKey(configs, key)) {
      // Option must have this key, otherwise, there is no control for the property
      const propertyData = configs[key];
      editors.push(
        stringSwitch(propertyData.type, {
          // Switch for Boolean
          boolean: () => renderSwitchPropertyEditor(key, propertyData, props),
          // List of Options to be selected
          select: () => renderSelectPropertyEditor(key, propertyData, props),
          // Flexible Input to be selected
          input: () => renderInputPropertyEditor(key, propertyData, props),
        }),
      );
    }
  });

  return (
    <Grid container spacing={2}>
      {editors.map((editor, index) => (
        <Grid key={index} item xs={12}>
          {editor}
        </Grid>
      ))}
    </Grid>
  );
};

const renderSwitchPropertyEditor = (
  label: string,
  propertyConfigs: TypeLayoutRendererComponentListProperty,
  properties: TypeLayoutRendererComponentProperties,
) => {
  return (
    <FormControl fullWidth>
      <FormControlLabel control={<Switch defaultChecked />} label={label} />
    </FormControl>
  );
};

const renderInputPropertyEditor = (
  key: string,
  propertyConfigs: TypeLayoutRendererComponentListProperty,
  properties: TypeLayoutRendererComponentProperties,
) => {
  return (
    <TextField
      key={key}
      label={key}
      variant={'outlined'}
      fullWidth
      value={properties[key]}
      onChange={({ target: { value } }) => {
        // Updating reactive property
        properties[key] = value;
      }}
    />
  );
};

const renderSelectPropertyEditor = (
  key: string,
  propertyConfigs: TypeLayoutRendererComponentListProperty,
  properties: TypeLayoutRendererComponentProperties,
) => {
  const { options } = propertyConfigs;
  // So that itself also get updated
  const [currentValue, setNewValue] = useState<string>(properties[key]);
  return (
    <FormControl fullWidth>
      <InputLabel>{key}</InputLabel>
      <Select
        label={key}
        value={currentValue as any}
        onChange={({ target: { value } }) => {
          // Property is a reactive data, so changing will cause re-rendering
          properties[key] = value;
          setNewValue(value);
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.toString()}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
