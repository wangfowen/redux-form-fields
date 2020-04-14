import { FormHelper, ReduxFieldProps, WrappedInput, WrappedInputProps } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface SelectFieldJson {
  options: { value: string | number; label: string }[];
}

function SelectInner(props: SelectFieldJson & ReduxFieldProps & WrappedInputProps) {
  const { input, options, customclasses = {} } = props;

  const element = (
    <select {...input} className={customclasses.input}>
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

export function SelectField(props: SelectFieldJson & WrappedInputProps) {
  const { isRequired } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={SelectInner} validate={validate} {...props} />;
}
