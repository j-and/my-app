import React, { Component } from 'react';
import './App.css';
import RegisterObject from './RegisterObject.js';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {time:0};
  }

  onSelectAlert(eventKey) {
    this.state = {time:eventKey};
    var newRegisterObject=new RegisterObject('firstname','lastname','newDate',this.state.time);
    newRegisterObject.setTime(this.state.time);
}
  clear(e) {
  e.preventDefault();
  alert('Delete registerObject');
}

  render() {
    
    return (
        <div>
          <DropdownButton title="Time" id="1" onSelect={this.onSelectAlert.bind(this)}>
            <MenuItem eventKey="8">08.00</MenuItem>
            <MenuItem eventKey="9">09.00</MenuItem>
            <MenuItem eventKey="10">10.00</MenuItem>
            <MenuItem eventKey="11">11.00</MenuItem>
            <MenuItem eventKey="12">12.00</MenuItem>
            <MenuItem eventKey="13">13.00</MenuItem>
            <MenuItem eventKey="14">14.00</MenuItem>
            <MenuItem eventKey="15">15.00</MenuItem>
            <MenuItem eventKey="16">16.00</MenuItem>
            <MenuItem eventKey="17">17.00</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Add time</MenuItem>
          </DropdownButton>
          <input className="input-name" placeholder="Name"/>
          <Button bsSize="xsmall"  bsStyle="danger" className="btn-close" onClick={this.clear}> <Glyphicon glyph="remove" /></Button>
      </div>
    );
  }
}

export default Register;
