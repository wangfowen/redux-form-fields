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

export interface CustomClasses {
  input?: string;
  label?: string;
  subtext?: string;
  pretext?: string;
  field?: string;
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
  isMoney: (value: Input) => {
    if (value === undefined || value === '') {
      return undefined;
    } else {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0 ? undefined : 'Must be a price greater than 0';
    }
  },
};

export const WrappedInput = (field: React.ReactNode, props: any) => {
  const { name, label, subtext, pretext, isRequired, meta, customClasses = {} } = props;
  const { touched, error, warning } = meta;

  let top;
  if (label !== undefined) {
    top = (
      <label htmlFor={name} className={customClasses.label}>
        {label}
        {subtext ? <div className={classnames(styles.subtext, customClasses.subtext)}>{subtext}</div> : null}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
    );
  } else if (isRequired) {
    top = <span className={styles.required}>*</span>;
  }

  return (
    <div className={classnames(styles.field, customClasses.field)}>
      {top}
      {touched &&
        ((error && <div className={styles.error}>{error}</div>) ||
          (warning && <div className={styles.error}>{warning}</div>))}
      <div className={styles.input}>
        {pretext ? <span className={customClasses.pretext}>{pretext}</span> : null}
        {field}
      </div>
    </div>
  );
};
