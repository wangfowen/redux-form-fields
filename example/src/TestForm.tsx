import React from 'react';
import { TextField } from './reactComponentLib';
import { reduxForm } from 'redux-form';

const TestForm = (props: any) => {
  const { handleSubmit, disabled } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" type="email" isRequired />
      <TextField name="password" label="Password" type="password" isRequired />
      <button className="btn btn-primary" type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'test',
})(TestForm);
