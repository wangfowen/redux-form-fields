import 'react-datepicker/dist/react-datepicker.css';
import './Picker.css';

import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';
import moment, { Moment } from 'moment';

import { Field } from 'redux-form';
import React from 'react';
import ReactDatePicker from 'react-datepicker';

export interface DatePickerFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

export const DateHelper = {
  toApiFormat(date: Moment) {
    return date.valueOf();
  },

  fromApiFormat(dateMs: string | number) {
    return moment(parseInt(dateMs.toString(), 10));
  },
};

class DatePickerFieldInner extends React.Component<DatePickerFieldProps & ReduxFieldProps> {
  componentDidMount() {
    const { input, meta, isRequired } = this.props;
    if (!input.value) {
      if (meta.initial) {
        input.onChange(meta.initial);
      } else if (isRequired) {
        input.onChange(DateHelper.toApiFormat(moment().startOf('day')));
      }
    }
  }

  onChange(date: Date) {
    this.props.input.onChange(DateHelper.toApiFormat(moment(date)));
  }

  render() {
    const { name, label, isRequired, meta, input } = this.props;

    let date;
    if (input.value) {
      date = DateHelper.fromApiFormat(input.value).toDate();
    } else if (meta.initial) {
      date = DateHelper.fromApiFormat(meta.initial).toDate();
    } else if (isRequired) {
      date = moment()
        .startOf('day')
        .toDate();
    }

    const element = (
      <ReactDatePicker
        name={name}
        selected={date}
        onChange={this.onChange.bind(this)}
        className={'form-control picker'}
      />
    );

    return WrappedInput(element, { name, label, isRequired, meta });
  }
}

export function DatePickerField(props: DatePickerFieldProps) {
  const { isRequired } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={DatePickerFieldInner} validate={validate} {...props} />;
}
