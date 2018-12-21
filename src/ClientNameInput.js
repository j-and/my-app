import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import {sendData} from './methods.js';
import {dateToTimestamp} from './methods.js';


class ClientNameInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: [],
            times: {
                time: '',
                isAvailable: true
            },
            names: '',
            client_id: ''
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
            var date = new Date(this.props.currentYear, this.props.currentMonth - 1, this.props.currentDay, this.state.times.time);
           // var datetime = dateToTimestamp(date);
            var newRegister = {
                name: this.state.names,
                datetime: dateToTimestamp(date),
                comment:'comment',
                payment:0,
                status: 'busy'
            };
            var newArray = this.state.registers;
            newArray.push(newRegister);
            this.setState({registers: newArray});
            this.props.addRegister(this.state.registers);
            //this.getClientId(newRegister);
            sendData(newRegister, "/addRegister");
            this.refs.registerForm.reset();
            this.setState({times: ''});
            this.setState({names: ''});
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