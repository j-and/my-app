import React, { Component } from 'react';

import './App.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';

class App extends Component {
  render() {

      const date=new Date();
      const daysInMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
      
    return (
        <div>
   <PageHeader>My-app</PageHeader>
          <MonthTable  daysInmonth={daysInMonth}/>
      </div>
    );
  }
}

export default App;
