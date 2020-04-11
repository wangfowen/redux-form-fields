import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface RadioFieldJson {
  name: string;
  value: string;
  label?: string | React.ReactNode;
  labelCustomClass?: string;
  checked?: boolean;
}

//TODO: can't take initial value
export function RadioField(props: RadioFieldJson) {
  const { name, label, labelCustomClass, value, checked } = props;

  return (
    <div>
      <Field
        name={name}
        component="input"
        type="radio"
        id={`${name}${value}`}
        value={value}
        label={label}
        labelCustomClass={labelCustomClass}
        checked={checked}
      />
      <label htmlFor={`${name}${value}`} className={classnames(styles.checkboxLabel, labelCustomClass)}>
        {label}
      </label>
    </div>
  );
}
