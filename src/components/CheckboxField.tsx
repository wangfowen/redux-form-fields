import { CustomClasses, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxFieldJson {
  name: string;
  label: string | React.ReactNode;
  customClasses?: CustomClasses;
}

function CheckboxInner(props: CheckboxFieldJson & ReduxFieldProps) {
  const { customClasses = {}, input, label, meta } = props;

  const element = (
    <div>
      <input
        type="checkbox"
        id={input.name}
        name={input.name}
        defaultChecked={!!meta.initial}
        {...input}
        className={classnames(styles.checkboxInput, customClasses.input)}
      />
      <label htmlFor={input.name} className={classnames(styles.checkboxLabel, customClasses.label)}>
        {label}
      </label>
    </div>
  );

  const wrappedProps = Object.assign({}, props);
  delete wrappedProps['label'];

  return WrappedInput(element, wrappedProps);
}

export function CheckboxField(props: CheckboxFieldJson) {
  const { name, label, customClasses } = props;

  return <Field name={name} component={CheckboxInner} customClasses={customClasses} label={label} />;
}
