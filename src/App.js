import React, { Component } from 'react';

import './App.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()
        };
    }

  render() {
      
    return (

        <div>
   <PageHeader>My-app</PageHeader>
          <MonthTable daysInMonth={this.state.daysInMonth}/>
      </div>
    );
  }
}

export default App;
