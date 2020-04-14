import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';
import { WrappedInputProps } from './FormHelper';
import classnames from 'classnames';
import styles from './Form.css';

export interface CheckboxGroupJson {
  options: { label: string; value: string }[];
}

type Props = CheckboxGroupJson & ReduxFieldProps & WrappedInputProps;

class CheckboxGroupInner extends React.Component<Props> {
  componentDidMount() {
    const { input, meta } = this.props;
    if (input.value) {
      input.onChange(this.join(input.value));
    } else if (meta.initial) {
      input.onChange(this.join(meta.initial));
    }
  }

  split(str: string) {
    return str.split(',').filter(s => s !== '');
  }

  join(values: string[] | string | number) {
    if (Array.isArray(values)) {
      return values.join(',');
    } else {
      return values;
    }
  }

  render() {
    const { options, customclasses = {}, input } = this.props;
    const element = options.map((option, index) => (
      <div key={index}>
        <input
          type="checkbox"
          id={`${input.name}${option.value}`}
          name={`${input.name}[]`}
          className={classnames(styles.checkboxInput, customclasses.input)}
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
          className={classnames(styles.checkboxLabel, customclasses.label)}
        >
          {option.label}
        </label>
      </div>
    ));

    return WrappedInput(element, this.props);
  }
}

export function CheckboxGroup(props: CheckboxGroupJson & WrappedInputProps) {
  const { isRequired } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={CheckboxGroupInner} validate={validate} {...props} />;
}
