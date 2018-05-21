import React, {Component} from 'react';
import './App.css';
import RegisterObject from './RegisterObject.js';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {time: 0, name: 0};
        this.clear = this.clear.bind(this);
        this.enterName = this.enterName.bind(this);
        this.selectTime = this.selectTime.bind(this);
    }

    selectTime(eventKey) {
        this.state = {time: eventKey};
        var newRegisterObject = new RegisterObject('', '', '', '');
        newRegisterObject.setTime(this.state.time);
    }

    enterName(event) {
        var newRegisterObject = new RegisterObject('', '', '', '');
        newRegisterObject.setFullName(event.target.value);
    }


    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
        this.setState({value: 0});
    }

    render() {

        return (
            <div>
                <DropdownButton title="Time" id="1" onSelect={this.selectTime}>
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
                    <MenuItem divider/>
                    <MenuItem eventKey="4">Add time</MenuItem>
                </DropdownButton>
                <input className="input-name" placeholder="Name" value={this.state.value} onChange={this.enterName}/>
                <Button bsSize="xsmall" bsStyle="danger" className="btn-close" onClick={this.clear}> <Glyphicon
                    glyph="remove"/></Button>
            </div>
        );
    }
}

export default Register;
