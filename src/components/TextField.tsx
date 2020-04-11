import { FormHelper, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface TextFieldProps {
  name: string;
  type?: string;
  label?: string;
  subtext?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isNumber?: boolean;
  className?: string;
  subtextCustomClass?: string;
}

interface AdaptedInputProps {
  name: string;
  type: string;
  className?: string;
  input: any;
  children: any;
  placeholder?: string;
  isDisabled?: boolean;
}

export const AdaptedInput = (props: AdaptedInputProps) => {
  const { name, type, input, placeholder, children, className, isDisabled } = props;
  const field = (
    <input
      className={className || 'form-control'}
      placeholder={placeholder}
      name={name}
      type={type}
      disabled={isDisabled}
      {...input}
    >
      {children}
    </input>
  );

  return WrappedInput(field, props);
};

export function TextField(props: TextFieldProps) {
  const {
    name,
    label,
    isRequired,
    isDisabled,
    type,
    placeholder,
    isNumber,
    className,
    subtext,
    subtextCustomClass,
  } = props;

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
      className={className}
      subtext={subtext}
      subtextCustomClass={subtextCustomClass}
    />
  );
}
