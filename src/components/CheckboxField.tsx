import { ReduxFieldProps, WrappedInput, WrappedInputProps } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

function CheckboxInner(props: WrappedInputProps & ReduxFieldProps) {
  const { customclasses = {}, input, label, meta } = props;

  const element = (
    <div>
      <input
        type="checkbox"
        id={input.name}
        name={input.name}
        defaultChecked={!!meta.initial}
        {...input}
        className={classnames(styles.checkboxInput, customclasses.input)}
      />
      <label htmlFor={input.name} className={classnames(styles.checkboxLabel, customclasses.label)}>
        {label}
      </label>
    </div>
  );

  const wrappedProps = Object.assign({}, props);
  delete wrappedProps['label'];

  return WrappedInput(element, wrappedProps);
}

export function CheckboxField(props: WrappedInputProps) {
  return <Field component={CheckboxInner} {...props} />;
}
