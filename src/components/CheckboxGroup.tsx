import { CustomClasses, FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxGroupJson {
  name: string;
  label?: string;
  subtext?: string;
  options: { label: string; value: string | number }[];
  isRequired?: boolean;
  customClasses?: CustomClasses;
}

type Props = CheckboxGroupJson & ReduxFieldProps;

class CheckboxGroupInner extends React.Component<Props> {
  componentDidMount() {
    const { input, meta } = this.props;
    if (!input.value && meta.initial) {
      input.onChange(JSON.stringify(meta.initial));
    }
  }

  split(str: string) {
    if (str === '') {
      return [];
    } else {
      return JSON.parse(str);
    }
  }

  join(values: string[]) {
    return JSON.stringify(values);
  }

  render() {
    const { options, customClasses = {}, input } = this.props;
    const element = options.map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          id={`${input.name}${option.value}`}
          name={`${input.name}[]`}
          className={classnames(styles.checkboxInput, customClasses.input)}
          value={option.value}
          checked={this.split(input.value).includes(option.value)}
          onChange={event => {
            const newValue = this.split(input.value);
            if (event.target.checked) {
              newValue.push(option.value);
            } else {
              newValue.splice(newValue.indexOf(option.value), 1);
            }

            return input.onChange(this.join(newValue));
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

export function CheckboxGroup(props: CheckboxGroupJson) {
  const { name, isRequired, label, options, subtext, customClasses } = props;

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
      subtext={subtext}
      options={options}
      customClasses={customClasses}
      validate={validate}
    />
  );
}
