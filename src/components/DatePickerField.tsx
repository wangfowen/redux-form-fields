import 'react-datepicker/dist/react-datepicker.css';
import './Picker.css';

import { FormHelper, ReduxFieldProps, WrappedInput, WrappedInputProps } from './FormHelper';
import moment, { Moment } from 'moment';

import { Field } from 'redux-form';
import React from 'react';
import ReactDatePicker from 'react-datepicker';

export const DateHelper = {
  toApiFormat(date: Moment) {
    return date.valueOf();
  },

  fromApiFormat(dateMs: string | number) {
    return moment(parseInt(dateMs.toString(), 10));
  },
};

interface DatePickerProps {
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  startDate?: Date
  endDate?: Date
  selectsStart?: boolean
  selectsEnd?: boolean
  disabled?: boolean
  showTimeSelect?: boolean
  showTimeInput?: boolean
  dateFormat?: string
  timeFormat?: string
  timeIntervals?: number
}

type Props = WrappedInputProps & ReduxFieldProps & DatePickerProps

class DatePickerFieldInner extends React.Component<Props> {
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
    const { name, isRequired, meta, input, placeholder,
      minDate, maxDate, startDate, endDate, dateFormat,
      showTimeSelect, showTimeInput, timeFormat, timeIntervals,
      selectsStart, selectsEnd, disabled } = this.props;

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
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        disabled={disabled}
        placeholderText={placeholder}
        showTimeSelect={showTimeSelect}
        showTimeInput={showTimeInput}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
      />
    );

    return WrappedInput(element, this.props);
  }
}

export function DatePickerField(props: WrappedInputProps & DatePickerProps) {
  const { isRequired } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={DatePickerFieldInner} validate={validate} {...props} />;
}
