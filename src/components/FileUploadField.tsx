import Dropzone, { DropzoneRootProps } from 'react-dropzone';
import { FormHelper, ReduxFieldProps, WrappedInput } from './FormHelper';

import { Field } from 'redux-form';
import React from 'react';

export interface FileUploadFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  rootProps?: DropzoneRootProps;
}

class FileUploadFieldInner extends React.Component<FileUploadFieldProps & ReduxFieldProps> {
  async onChange(files: any) {
    /*
    const blobPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data !== null) {
          resolve(base64data);
        } else {
          reject("no data")
        }
      };
    });
    const data = await blobPromise
    */
    this.props.input.onChange(files[0]);
  }

  render() {
    const { name, label, isRequired, meta, rootProps } = this.props;

    //TODO: once accepted file, show it here
    //TODO: only do one file for now
    //TODO: show progress bar
    //TODO: change file accept to be passed in
    const element = (
      <Dropzone onDrop={acceptedFiles => this.onChange(acceptedFiles)} accept="video/mp4">
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps(rootProps)}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );

    return WrappedInput(element, { name, label, isRequired, meta });
  }
}

export function FileUploadField(props: FileUploadFieldProps) {
  const { isRequired } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={FileUploadFieldInner} validate={validate} {...props} />;
}
