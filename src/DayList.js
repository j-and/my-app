import React, {Component} from 'react';
var fetch = require("node-fetch");
import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';
import {dateToTimestamp} from './methods.js';

class DayList extends Component {

    constructor(props) {
        super(props);

        this.addRegister = this.addRegister.bind(this);
        this.removeRegister = this.removeRegister.bind(this);

        this.state = {
            registers: [],
            times: {},
            initialTimeArray: [],
            REGISTERS: [],
            busytime: []
        };
    }

    componentDidMount() {
        fetch('/getRegisters', {
            method: 'GET'
        }).then((response) => {
            response.json().then((data) => {
                this.setState({REGISTERS: data})
            })
        });
    }

    addRegister(registers) {
        this.setState({registers: registers});
    }

    removeRegister(register) {
        var newRegister = {
            name:register.name,
            datetime: dateToTimestamp(register.datetime)           
        };
        fetch('/removeRegister', {
            method: "POST",
            body: JSON.stringify(newRegister),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (response) => {
                response.json().then((data) => {
                    this.setState({REGISTERS: data});
                    this.setState({registers: []});
                })

            }
        );
    }

    render() {

        var currentMonth = this.props.currentMonth < 10 ? '0' + this.props.currentMonth : this.props.currentMonth;

        var currentDay = this.props.currentDay < 10 ? '0' + this.props.currentDay : this.props.currentDay;
        var arr = this.state.registers;

        var busyTime = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'];
        var REGISTERS = this.state.REGISTERS;

        var filteredArray = REGISTERS.concat(arr).filter(function (register) {
            var datetime = dateToTimestamp(register.datetime);
            datetime = datetime.slice(0, datetime.length - 2);

            var month = datetime.slice(5, 7);
            var day = datetime.slice(8, 10);
            var time = datetime.slice(11, 13) + '.00';

            if (time.length == 4) {
                time = '0' + time;
            }
            if (month == currentMonth && day == currentDay && register.status == 'busy') {
                var index = busyTime.indexOf(time);
                if (index !== -1) busyTime.splice(index, 1);
                return register;
            }
        });
        return (
            <div >
                <div className="day_ordinary_label"> {this.props.currentDay}</div>
                <RegisterList registers={filteredArray} removeRegister={this.removeRegister}/>
                <ClientNameInput addRegister={this.addRegister}
                                 initialTimeArray={busyTime}
                                 currentDay={this.props.currentDay} currentMonth={this.props.currentMonth}
                                 currentYear={this.props.currentYear}/>
            </div>
        );
    }
}
export default DayList;