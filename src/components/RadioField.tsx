import { ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

interface RadioInnerFieldJson {
  radioValue: string;
  label?: string | React.ReactNode;
  labelCustomClass?: string;
  checked?: boolean;
}

function RadioInner(props: RadioInnerFieldJson & ReduxFieldProps) {
  const { labelCustomClass, input, label, radioValue, checked } = props;

  const element = (
    <div>
      <input type="radio" name={input.name} id={radioValue} value={radioValue} checked={checked} />
      <label htmlFor={radioValue} className={classnames(styles.checkboxLabel, labelCustomClass)}>
        {label}
      </label>
    </div>
  );

  const wrappedProps = Object.assign({}, props);
  delete wrappedProps['label'];

  return WrappedInput(element, wrappedProps);
}

export interface RadioFieldJson {
  name: string;
  value: string;
  label?: string | React.ReactNode;
  labelCustomClass?: string;
  fieldCustomClass?: string;
  checked?: boolean;
}

export function RadioField(props: RadioFieldJson) {
  const { name, label, labelCustomClass, value, checked, fieldCustomClass } = props;

  return (
    <Field
      name={name}
      component={RadioInner}
      labelCustomClass={labelCustomClass}
      fieldCustomClass={fieldCustomClass}
      label={label}
      radioValue={value}
      checked={checked}
    />
  );
}
