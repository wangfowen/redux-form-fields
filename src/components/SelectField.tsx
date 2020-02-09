import { AdaptedInput } from './FormHelper';
import { Field } from 'redux-form';
import React from 'react';

export interface SelectFieldJson {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

export function SelectField(props: SelectFieldJson) {
  const { options, label, name } = props;

  return (
    <Field name={name} component={AdaptedInput} type="select" label={label}>
      <option value=""></option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Field>
  );
}
