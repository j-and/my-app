import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Register extends Component {
  render() {
    return (
        <div>
          <DropdownButton title="Time" id="1" bsSize="small">
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
          <Button bsSize="xsmall"  bsStyle="danger" className="btn-close"> <Glyphicon glyph="remove" /></Button>
      </div>
    );
  }
}

export default Register;
