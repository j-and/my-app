import React, { Component } from 'react';

import './App.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';

class App extends Component {
  render() {
    return (
        <div>
   <PageHeader>My-app</PageHeader>
          <MonthTable/>
      </div>
    );
  }
}

export default App;
