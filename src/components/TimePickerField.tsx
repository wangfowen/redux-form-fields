import 'rc-time-picker/assets/index.css';
import './Picker.css';

import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';
import moment, { Moment } from 'moment';

import { Field } from 'redux-form';
import React from 'react';
import TimePicker from 'rc-time-picker';

export interface TimePickerFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

export const TimeHelper = {
  toApiFormat(date: Moment) {
    return date.hours() * 60 * 60 + date.minutes() * 60;
  },

  fromApiFormat(time: string | number) {
    const totalSeconds = parseInt(time.toString(), 10);
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = (totalSeconds % (60 * 60)) / 60;
    return moment()
      .startOf('day')
      .hour(hours)
      .minute(minutes);
  },
};

class TimePickerFieldInner extends React.Component<TimePickerFieldProps & ReduxFieldProps> {
  componentDidMount() {
    const { input, meta, isRequired } = this.props;
    if (!input.value) {
      if (meta.initial) {
        input.onChange(meta.initial);
      } else if (isRequired) {
        input.onChange(TimeHelper.toApiFormat(moment().startOf('day')));
      }
    }
  }

  onChange(date: Moment) {
    this.props.input.onChange(TimeHelper.toApiFormat(moment(date)));
  }

  render() {
    const { name, label, isRequired, meta, input } = this.props;

    let time;
    if (input.value) {
      time = TimeHelper.fromApiFormat(input.value);
    } else if (meta.initial) {
      time = TimeHelper.fromApiFormat(meta.initial);
    } else if (isRequired) {
      time = moment()
        .hour(0)
        .minute(0);
    }

    const element = (
      <TimePicker
        onChange={this.onChange.bind(this)}
        name={name}
        showSecond={false}
        defaultValue={time}
        format={'h:mm a'}
        use12Hours
        className={'form-control picker'}
      />
    );

    return WrappedInput(element, { name, label, isRequired, meta });
  }
}

export function TimePickerField(props: TimePickerFieldProps) {
  const { isRequired } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={TimePickerFieldInner} validate={validate} {...props} />;
}
