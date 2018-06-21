import React, { Component } from 'react';

import './App.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';
import LoginForm from './LoginForm.js';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate(),
            isOpen: true
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

  render() {
      
    return (

        <div>
   <PageHeader>My-app</PageHeader>
          <MonthTable daysInMonth={this.state.daysInMonth}/>
             <LoginForm  show={this.state.isOpen}/>
      </div>
    );
  }
}

export default App;