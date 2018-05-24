import React, {Component} from 'react';
import './App.css';

import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {time: 'Time', value: ''};
        this.clear = this.clear.bind(this);
        this.enterName = this.enterName.bind(this);
        this.save = this.save.bind(this);
        this.selectTime = this.selectTime.bind(this);

    }


    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
        this.setState({value: ''});
        this.setState({time: 'Time'});
    }

    enterName(event) {
        this.setState({value: event.target.value});
    }

    save(event) {
        this.props.updateData(this.state.time, this.state.value);
    }

    selectTime(eventKey) {
        this.setState({time: eventKey});
    }

    render() {

        return (

            <div>
                <DropdownButton title={this.state.time} id="1" onSelect={this.selectTime}>
                    <MenuItem eventKey="08.00">08.00</MenuItem>
                    <MenuItem eventKey="09.00">09.00</MenuItem>
                    <MenuItem eventKey="10.00">10.00</MenuItem>
                    <MenuItem eventKey="11.00">11.00</MenuItem>
                    <MenuItem eventKey="12.00">12.00</MenuItem>
                    <MenuItem eventKey="13.00">13.00</MenuItem>
                    <MenuItem eventKey="14.00">14.00</MenuItem>
                    <MenuItem eventKey="15.00">15.00</MenuItem>
                    <MenuItem eventKey="16.00">16.00</MenuItem>
                    <MenuItem eventKey="17.00">17.00</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey="4">Add</MenuItem>
                </DropdownButton>
                <input class="input-name" placeholder="Name" value={this.state.value} onChange={this.enterName}/>
                <Button bsSize="xsmall" bsStyle="success" className="" onClick={this.save}> <Glyphicon
                    glyph="ok"/></Button>
                <Button bsSize="xsmall" bsStyle="danger" className="" onClick={this.clear}> <Glyphicon
                    glyph="remove"/></Button>
            </div>
        );
    }
}

export default Register;
