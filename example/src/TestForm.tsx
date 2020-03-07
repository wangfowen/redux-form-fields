import { CheckboxField, RadioField, TextAreaField, TextField } from './reactComponentLib';

import React from 'react';
import { reduxForm } from 'redux-form';
import styles from './TestForm.module.css';

const TestForm = (props: any) => {
  const { handleSubmit, disabled } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" type="email" />
      <TextField name="presetEmail" label="Email" type="email2" isRequired isDisabled />
      <TextField name="password" label="Password" type="password" />
      <TextAreaField name="textareaz" isRequired label="Textarea" rows={5} />
      <RadioField name="radio" value="1" label="Test Radio 1" checked fieldCustomClass={styles.radioField} />
      <RadioField name="radio" value="2" label="Test Radio 2" fieldCustomClass={styles.radioField} />
      <CheckboxField
        name="terms"
        label={
          <span>
            I agree to the <a href="terms">Terms</a>
          </span>
        }
      />
      <button className="btn btn-primary" type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'test',
})(TestForm);
