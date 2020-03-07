import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

//when you stick a component into a Field, these props are what get injected and you interact with
export interface ReduxFieldProps {
  input: {
    name: string;
    value: string;
    onChange: (value: any) => void;
  };
  meta: {
    touched: boolean;
    error?: string;
    warning?: string;
    initial?: string | number;
  };
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Input = undefined | string;

export const FormHelper = {
  required: (value: Input) =>
    value !== undefined && value !== '' && value !== null ? undefined : 'This field is required',
  isEmail: (value: Input) =>
    value === undefined || emailRegex.test(value) ? undefined : 'Please provide a valid email',
  validPassword: (value: Input) =>
    value === undefined || value.length >= 8 ? undefined : 'Password must be at least 8 characters',
  isNumber: (value: any) => (value === undefined || value === '' || !isNaN(value) ? undefined : 'Must be a number'),
};

export const WrappedInput = (field: React.ReactNode, props: any) => {
  const { name, label, isRequired, meta, fieldCustomClass } = props;
  const { touched, error, warning } = meta;

  let top;
  if (label !== undefined) {
    top = (
      <label htmlFor={name}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
    );
  } else if (isRequired) {
    top = <span className={styles.required}>*</span>;
  }

  return (
    <div className={classnames(styles.field, fieldCustomClass)}>
      {top}
      {touched &&
        ((error && <div className={styles.error}>{error}</div>) ||
          (warning && <div className={styles.error}>{warning}</div>))}
      <div className={styles.input}>{field}</div>
    </div>
  );
};

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
