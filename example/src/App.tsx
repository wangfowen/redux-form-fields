import React, { Component } from 'react';

import TestForm from './TestForm';

class App extends Component {
  handleSubmit(form: any) {
    console.log(form);
  }

  render() {
    return <TestForm onSubmit={this.handleSubmit} />;
  }
}

export default App;
