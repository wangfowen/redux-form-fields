import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import { WrappedInputProps } from './FormHelper';
import classnames from 'classnames';
import styles from './Form.css';

export interface RadioGroupJson {
  options: { label: string; value: string | number }[];
}

type Props = RadioGroupJson & ReduxFieldProps & WrappedInputProps;

class RadioGroupInner extends React.Component<Props> {
  componentDidMount() {
    const { input, meta } = this.props;
    if (!input.value && meta.initial) {
      input.onChange(meta.initial);
    }
  }

  render() {
    const { options, customclasses = {}, input } = this.props;
    const element = options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          id={`${input.name}${option.value}`}
          name={`${input.name}[]`}
          value={option.value}
          checked={input.value === option.value}
          className={classnames(styles.checkboxInput, customclasses.input)}
          onChange={event => {
            input.onChange(event.target.value);
          }}
        />
        <label
          htmlFor={`${input.name}${option.value}`}
          className={classnames(styles.checkboxLabel, customclasses.label)}
        >
          {option.label}
        </label>
      </div>
    ));

    return WrappedInput(element, this.props);
  }
}

export function RadioGroup(props: RadioGroupJson & WrappedInputProps) {
  const { isRequired } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={RadioGroupInner} {...props} validate={validate} />;
}
