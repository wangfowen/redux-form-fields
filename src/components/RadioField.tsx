import { Field } from 'redux-form';
import React from 'react';
import { WrappedInputProps } from './FormHelper';
import classnames from 'classnames';
import styles from './Form.css';

export interface RadioFieldJson {
  value: string;
  checked?: boolean;
}

//TODO: can't take initial value
export function RadioField(props: RadioFieldJson & WrappedInputProps) {
  const { name, label, customclasses = {}, value } = props;

  return (
    <div>
      <Field component="input" type="radio" id={`${name}${value}`} {...props} />
      <label htmlFor={`${name}${value}`} className={classnames(styles.checkboxLabel, customclasses.label)}>
        {label}
      </label>
    </div>
  );
}
