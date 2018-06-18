import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class ClientNameInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: {},
            times: {},
            names: {}
        };
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendData = this.sendData.bind(this);
        this.counter = 1;
    }

    add() {
        return this.counter += 1;
    }

    sendData(data){
        var request = new XMLHttpRequest();
        request.open('POST', '/my/url', true);
        // alert(data);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(data);
    }

    handleChange(event) {
        this.state.names[this.counter] = event.target.value;
    }


    handleSubmit(event) {
        event.preventDefault();

        if (this.state.times[this.counter] && this.state.names[this.counter]) {
            this.state.registers[this.counter] = this.state.times[this.counter] + ' - ' + this.state.names[this.counter];
            this.props.addRegister(this.state.registers);
            this.sendData(this.state.registers);
            this.refs.registerForm.reset();
            this.add();
        }
        else {
            alert("Enter name");
        }

    }

    handleTimeChange(event) {
        this.state.times[this.counter] = event.target.value;
    }

    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit} ref="registerForm">

                    <select value={this.state.value} onChange={this.handleTimeChange}>
                        <option value="08.00">08.00</option>
                        <option value="09.00">09.00</option>
                        <option value="10.00">10.00</option>
                        <option value="11.00">11.00</option>
                        <option value="11.00">12.00</option>
                        <option value="11.00">13.00</option>
                        <option value="11.00">14.00</option>
                        <option value="11.00">15.00</option>
                    </select>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

export default ClientNameInput;
