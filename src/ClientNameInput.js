import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
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

            this.id = 'id/' + this.props.currentYear + '/' + this.props.currentMonth + '/' + this.props.currentDay + '/' + this.state.times.time + '/' + this.state.names;
            var newRegister = {
                id: this.id,
                year: this.props.currentYear,
                month: this.props.currentMonth,
                day: this.props.currentDay,
                time: this.state.times.time,
                name: this.state.names,
                status: 'busy'
            };
            var newArray = this.state.registers;
            newArray.push(newRegister);
            this.setState({registers: newArray});
            this.props.addRegister(this.state.registers);
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
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add"><Glyphicon
                        glyph="plus"/></Button>
                </form>
            </div>
        )
    }
}

export default ClientNameInput;