import { FormHelper, ReduxFieldProps, WrappedInput, WrappedInputProps } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface TextFieldProps {
  type?: 'text' | 'email' | 'password';
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isNumber?: boolean;
  isMoney?: boolean;
}

export const AdaptedInput = (props: TextFieldProps & WrappedInputProps & ReduxFieldProps) => {
  const { name, type, input, placeholder, customclasses = {}, isDisabled } = props;
  const field = (
    <input
      className={customclasses.input || 'form-control'}
      placeholder={placeholder}
      name={name}
      type={type}
      disabled={isDisabled}
      {...input}
    />
  );

  return WrappedInput(field, props);
};

export function TextField(props: TextFieldProps & WrappedInputProps) {
  const { isRequired, type, isNumber, isMoney } = props;

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
  if (isMoney) {
    validate.push(FormHelper.isMoney);
  }

  return <Field component={AdaptedInput} type={type || 'text'} validate={validate} {...props} />;
}
