import { AdaptedInput, FormHelper } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface TextFieldProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isNumber?: boolean;
}

export function TextField(props: TextFieldProps) {
  const { name, label, isRequired, isDisabled, type, placeholder, isNumber } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }
  if (type === 'email') {
    validate.push(FormHelper.isEmail);
  }
  if (type === 'password') {
    validate.push(FormHelper.validPassword);
  }
  if (isNumber) {
    validate.push(FormHelper.isNumber);
  }

  return (
    <Field
      name={name}
      component={AdaptedInput}
      type={type || 'text'}
      placeholder={placeholder}
      validate={validate}
      isRequired={isRequired}
      label={label}
      isDisabled={isDisabled}
    />
  );
}
