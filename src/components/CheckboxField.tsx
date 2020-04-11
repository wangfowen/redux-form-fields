import { ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxFieldJson {
  name: string;
  label: string | React.ReactNode;
  labelCustomClass?: string;
  inputCustomClass?: string;
  fieldCustomClass?: string;
}

function CheckboxInner(props: CheckboxFieldJson & ReduxFieldProps) {
  const { labelCustomClass, inputCustomClass, input, label, meta } = props;

  const element = (
    <div>
      <input
        type="checkbox"
        id={input.name}
        name={input.name}
        defaultChecked={!!meta.initial}
        {...input}
        className={classnames(styles.checkboxInput, inputCustomClass)}
      />
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
  const { name, label, labelCustomClass, fieldCustomClass, inputCustomClass } = props;

  return (
    <Field
      name={name}
      component={CheckboxInner}
      fieldCustomClass={fieldCustomClass}
      labelCustomClass={labelCustomClass}
      inputCustomClass={inputCustomClass}
      label={label}
    />
  );
}
