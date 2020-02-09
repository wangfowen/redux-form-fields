import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxGroupJson {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  isRequired?: boolean;
  labelCustomClass?: string;
}

function CheckboxGroupInner(props: CheckboxGroupJson & ReduxFieldProps) {
  const { options, labelCustomClass, input } = props;

  const element = options.map((option, index) => (
    <div className={styles.checkbox} key={index}>
      <input
        type="checkbox"
        id={option.value}
        name={`${input.name}[${index}]`}
        value={option.value}
        checked={input.value.includes(option.value)}
        onChange={event => {
          const newValue = [input.value];
          if (event.target.checked) {
            newValue.push(option.value);
          } else {
            newValue.splice(newValue.indexOf(option.value), 1);
          }

          return input.onChange(newValue);
        }}
      />
      <label htmlFor={option.value} className={classnames(styles.checkboxLabel, labelCustomClass)}>
        {option.label}
      </label>
    </div>
  ));

  return WrappedInput(element, props);
}

export function CheckboxGroup(props: CheckboxGroupJson) {
  const { name, isRequired, label, options, labelCustomClass } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return (
    <Field
      name={name}
      component={CheckboxGroupInner}
      isRequired={isRequired}
      label={label}
      options={options}
      labelCustomClass={labelCustomClass}
      validate={validate}
    />
  );
}
