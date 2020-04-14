import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { FormHelper, ReduxFieldProps, WrappedInput, WrappedInputProps } from './FormHelper';
import React, { useMemo } from 'react';

import { Field } from 'redux-form';
import styles from './FileUploadField.module.css';

export interface FileUploadFieldProps {
  accept: string;
  rootProps?: DropzoneRootProps;
}

function Dropzone(props: any) {
  const activeStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const { isDragActive, isDragAccept, isDragReject, getRootProps, getInputProps } = useDropzone({
    accept: props.accept,
    onDrop: props.onDrop,
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [acceptStyle, activeStyle, isDragAccept, isDragActive, isDragReject, rejectStyle],
  );
  const rootProps = Object.assign({}, props.rootProps, { style });

  return (
    <section>
      <div {...getRootProps(rootProps)} className={styles.dropzone}>
        <input {...getInputProps()} />
        <div>Drag and drop a file here, or click to select a file</div>
      </div>
      {props.file !== '' ? (
        <aside className={styles.selectedFile}>
          <h5>Selected File</h5>
          <div>{props.file.name}</div>
        </aside>
      ) : null}
    </section>
  );
}

class FileUploadFieldInner extends React.Component<FileUploadFieldProps & ReduxFieldProps & WrappedInputProps> {
  onChange(files: any) {
    this.props.input.onChange(files[files.length - 1]);
  }

  render() {
    const { rootProps, accept, input } = this.props;

    const element = (
      <Dropzone
        onDrop={(acceptedFiles: any) => this.onChange(acceptedFiles)}
        accept={accept}
        rootProps={rootProps || {}}
        file={input.value}
      />
    );

    return WrappedInput(element, this.props);
  }
}

export function FileUploadField(props: FileUploadFieldProps & WrappedInputProps) {
  const { isRequired } = props;

  const validate: ((value: string) => undefined | string)[] = [];
  if (isRequired) {
    validate.push(FormHelper.required);
  }

  return <Field component={FileUploadFieldInner} validate={validate} {...props} />;
}
