import { CustomClasses, FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface RadioGroupJson {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
  isRequired?: boolean;
  customClasses?: CustomClasses;
}

type Props = RadioGroupJson & ReduxFieldProps;

class RadioGroupInner extends React.Component<Props> {
  componentDidMount() {
    const { input, meta } = this.props;
    if (!input.value && meta.initial) {
      input.onChange(meta.initial);
    }
  }

  render() {
    const { options, customClasses = {}, input } = this.props;
    const element = options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          id={`${input.name}${option.value}`}
          name={`${input.name}[]`}
          value={option.value}
          checked={input.value === option.value}
          className={classnames(styles.checkboxInput, customClasses.input)}
          onChange={event => {
            input.onChange(event.target.value);
          }}
        />
        <label
          htmlFor={`${input.name}${option.value}`}
          className={classnames(styles.checkboxLabel, customClasses.label)}
        >
          {option.label}
        </label>
      </div>
    ));

    return WrappedInput(element, this.props);
  }
}

export function RadioGroup(props: RadioGroupJson) {
  const { name, isRequired, label, options, customClasses } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return (
    <Field
      name={name}
      component={RadioGroupInner}
      isRequired={isRequired}
      label={label}
      options={options}
      customClasses={customClasses}
      validate={validate}
    />
  );
}
