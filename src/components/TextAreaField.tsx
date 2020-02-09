import { AdaptedInput, FormHelper } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface LongTextFieldJson {
  name: string;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  isEmail?: boolean;
}

export function TextAreaField(props: LongTextFieldJson) {
  const { name, label, isRequired, isEmail, placeholder } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }
  if (isEmail) {
    validate.push(FormHelper.isEmail);
  }

  return (
    <Field
      name={name}
      component={AdaptedInput}
      type="textarea"
      placeholder={placeholder}
      validate={validate}
      isRequired={isRequired}
      label={label}
    />
  );
}
