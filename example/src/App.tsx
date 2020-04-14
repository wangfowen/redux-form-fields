import React, { Component } from 'react';

import TestForm from './TestForm';

class App extends Component {
  handleSubmit(form: any) {
    console.log(form);
  }

  render() {
    return (
      <TestForm
        onSubmit={this.handleSubmit}
        initialValues={{
          presetEmail: 'asdf@asdf.com',
          radio1: '1',
          checkboxes: '1,2',
          descriptor: 'individual',
        }}
      />
    );
  }
}

export default App;
