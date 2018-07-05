import React, {Component} from 'react';
import {sendData} from './methods.js';

class ClientNameInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: [],
            times: '',
            names: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({names: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.times && this.state.names) {

            this.props.addRegister(this.state.registers);
            var newRegister = {
                time: this.state.times,
                name: this.state.names
            };
            var newArray = this.state.registers;//.slice();
            newArray.push(this.state.times + ' - ' + this.state.names);
            this.setState({registers: newArray});
            sendData(newRegister);
            this.refs.registerForm.reset();

        }
        else {
            alert("Enter name");
        }
    }

    handleTimeChange(event) {
        this.setState({times: event.target.value});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref="registerForm" className="day_list">
                    <select value={this.state.value} onChange={this.handleTimeChange}>
                        <option value="Time" selected disabled>Time</option>
                        <option value="08.00">08.00</option>
                        <option value="09.00">09.00</option>
                        <option value="10.00">10.00</option>
                        <option value="11.00">11.00</option>
                        <option value="12.00">12.00</option>
                        <option value="13.00">13.00</option>
                        <option value="14.00">14.00</option>
                        <option value="15.00">15.00</option>
                    </select>
                    <input type="text" value={this.state.value} onChange={this.handleChange} autocomplete="on"/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

export default ClientNameInput;
