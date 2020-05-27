import { FormHelper, ReduxFieldProps, WordCounter, WrappedInput, WrappedInputProps } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface TextFieldProps {
  type?: 'text' | 'email' | 'password' | 'hidden';
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isNumber?: boolean;
  isMoney?: boolean;
  maxWords?: number;
  minWords?: number;
}

export const AdaptedInput = (props: TextFieldProps & WrappedInputProps & ReduxFieldProps) => {
  const { name, type, input, placeholder, customclasses = {}, isDisabled, maxWords, minWords } = props;
  const field = (
    <>
      <input
        className={customclasses.input || 'form-control'}
        placeholder={placeholder}
        name={name}
        type={type}
        disabled={isDisabled}
        {...input}
      />
      {maxWords !== undefined || minWords !== undefined ? (
        <WordCounter words={input.value} maxWords={maxWords} minWords={minWords} />
      ) : null}
    </>
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
