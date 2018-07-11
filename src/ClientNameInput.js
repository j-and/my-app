import React, {Component} from 'react';
import {sendData} from './methods.js';


class ClientNameInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: [],
            times: {
                time: '',
                isAvailable: true
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
            var newRegister = {
                year: this.props.currentYear,
                month: this.props.currentMonth,
                day: this.props.currentDay,
                time: this.state.times.time,
                name: this.state.names
            };
            var newArray = this.state.registers;
            newArray.push(newRegister);
            this.setState({registers: newArray});
            sendData(newRegister);
            this.refs.registerForm.reset();
        }
        else {
            alert("Enter name");
        }
    }

    handleTimeChange(event) {
        let timesCopy = Object.assign({}, this.state.times);
        timesCopy.time = event.target.value;
        this.setState({times: timesCopy});
    }

    render() {
        var arr = this.props.initialTimeArray;
        return (
            <div>
                <form onSubmit={this.handleSubmit} ref="registerForm" className="day_list">
                    <select value={this.state.value} onChange={this.handleTimeChange}>
                        <option value="Time">Time</option>
                        {arr.map(function (time) {
                            return <option value={time}>{time}</option>
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