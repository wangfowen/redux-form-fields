import { FormHelper, ReduxFieldProps, WordCounter, WrappedInput, WrappedInputProps } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface TextAreaFieldJson {
  rows?: number;
  cols?: number;
  maxWords?: number;
  minWords?: number;
  placeholder?: string;
}

function TextAreaInner(props: TextAreaFieldJson & ReduxFieldProps & WrappedInputProps) {
  const { name, input, placeholder, customclasses = {}, rows, cols, maxWords, minWords } = props;
  const field = (
    <>
      <textarea
        className={customclasses.input || 'form-control'}
        placeholder={placeholder}
        name={name}
        rows={rows}
        cols={cols}
        {...input}
      ></textarea>
      {maxWords !== undefined || minWords !== undefined ? (
        <WordCounter words={input.value} maxWords={maxWords} minWords={minWords} />
      ) : null}
    </>
  );

  return WrappedInput(field, props);
}

export function TextAreaField(props: TextAreaFieldJson & WrappedInputProps) {
  const { name, label, isRequired, placeholder, rows, cols, subtext, customclasses, maxWords, minWords } = props;

  const validate = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return (
    <Field
      name={name}
      component={TextAreaInner}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      validate={validate}
      rows={rows}
      cols={cols}
      subtext={subtext}
      customclasses={customclasses}
      maxWords={maxWords}
      minWords={minWords}
    />
  );
}
