import { ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxFieldJson {
  name: string;
  label: string | React.ReactNode;
  labelCustomClass?: string;
}

function CheckboxInner(props: CheckboxFieldJson & ReduxFieldProps) {
  const { labelCustomClass, input, label } = props;

  const element = (
    <div className={styles.checkbox}>
      <input type="checkbox" id={input.name} name={input.name} {...input} className={styles.checkboxInput} />
      <label htmlFor={input.name} className={classnames(styles.checkboxLabel, labelCustomClass)}>
        {label}
      </label>
    </div>
  );

  const wrappedProps = Object.assign({}, props);
  delete wrappedProps['label'];

  return WrappedInput(element, wrappedProps);
}

export function CheckboxField(props: CheckboxFieldJson) {
  const { name, label, labelCustomClass } = props;

  return <Field name={name} component={CheckboxInner} labelCustomClass={labelCustomClass} label={label} />;
}
