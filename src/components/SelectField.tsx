import { CustomClasses, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface SelectFieldJson {
  name: string;
  options: { value: string | number; label: string }[];
  label?: string;
  customClasses?: CustomClasses;
}

function SelectInner(props: SelectFieldJson & ReduxFieldProps) {
  const { input, options, customClasses = {} } = props;

  const element = (
    <select {...input} className={customClasses.input}>
      <option value=""></option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );

  return WrappedInput(element, props);
}

export function SelectField(props: SelectFieldJson) {
  const { options, label, name, customClasses } = props;

  return <Field name={name} component={SelectInner} options={options} label={label} customClasses={customClasses} />;
}
