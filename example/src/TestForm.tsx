import {
  CheckboxField,
  CheckboxGroup,
  RadioField,
  RadioGroup,
  SelectField,
  TextAreaField,
  TextField,
} from './reactComponentLib';

import React from 'react';
import { reduxForm } from 'redux-form';

const TestForm = (props: any) => {
  const { handleSubmit, disabled } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" subtext="some subtext" type="email" />
      <TextField name="presetEmail" label="Email" type="email2" isRequired isDisabled />
      <TextField name="password" label="Password" type="password" />
      <TextAreaField name="textareaz" label="Textarea" subtext="some more subtext" rows={5} />
      <RadioField name="radio2" value="1" label="Individual Radio 1" />
      <RadioField name="radio2" value="2" label="Individual Radio 2" />
      <RadioGroup
        name="radio1"
        options={[
          { value: '1', label: 'Test Radio 1' },
          { value: '2', label: 'Test Radio 2' },
        ]}
      />
      <SelectField
        name="descriptor"
        label="Which best describes you?"
        options={[
          { value: 'individual', label: 'Individual Teacher' },
          { value: 'business', label: 'Business' },
        ]}
      />
      <CheckboxField
        name="terms"
        label={
          <span>
            I agree to the <a href="terms">Terms</a>
          </span>
        }
      />
      <CheckboxGroup
        name="checkboxes"
        label="More checkboxes"
        subtext="yoyo"
        options={[
          { value: 1, label: 'Individual Teacher' },
          { value: 2, label: 'Business' },
        ]}
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
