import { CustomClasses, FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface LongTextFieldJson {
  name: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  label?: string;
  subtext?: string;
  isRequired?: boolean;
  customClasses?: CustomClasses;
}

function TextAreaInner(props: LongTextFieldJson & ReduxFieldProps) {
  const { name, input, placeholder, customClasses = {}, rows, cols } = props;
  const field = (
    <textarea
      className={customClasses.input || 'form-control'}
      placeholder={placeholder}
      name={name}
      rows={rows}
      cols={cols}
      {...input}
    ></textarea>
  );

  return WrappedInput(field, props);
}

export function TextAreaField(props: LongTextFieldJson) {
  const { name, label, isRequired, placeholder, rows, cols, subtext, customClasses } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return (
    <Field
      name={name}
      component={TextAreaInner}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      validate={validate}
      rows={rows}
      cols={cols}
      subtext={subtext}
      customClasses={customClasses}
    />
  );
}
