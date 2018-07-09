import React, {Component} from 'react';
import {sendData} from './methods.js';


class ClientNameInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: [],
            times: {
                time: '',
                isAvailable: 'true'
            },
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
            this.props.editTimeArray(this.state.times);
            var newRegister = {
                time: this.state.times.time,
                name: this.state.names
            };
            var newArray = this.state.registers;//.slice();
            newArray.push({year:this.props.currentYear, month:this.props.currentMonth, day:this.props.currentDay,time: this.state.times.time, name: this.state.names});
            this.setState({registers: newArray});
            sendData(newRegister);
            this.props.updateRegisters(this.state.registers);
            this.refs.registerForm.reset();
        }
        else {
            alert("Enter name");
        }
    }

    handleTimeChange(event) {
        let timesCopy = Object.assign({}, this.state.times);
        timesCopy.time = event.target.value;
        timesCopy.isAvailable = 'false';
        this.setState({times: timesCopy});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref="registerForm" className="day_list">
                    <select value={this.state.value} onChange={this.handleTimeChange}>
                        <option value="Time">Time</option>
                        {this.props.initialTimeArray.map(function (times) {
                            return times.isAvailable === true ?
                                <option value={times.time}>{times.time}{times.isAvailable}</option> : null;
                        })}
                    </select>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

export default ClientNameInput;