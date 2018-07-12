import React, {Component} from 'react';

import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';

class DayList extends Component {

    constructor(props) {
        super(props);

        this.addRegister = this.addRegister.bind(this);
        this.removeRegister = this.removeRegister.bind(this);

        this.state = {
            registers: [],
            times: {},
            initialTimeArray: []
        };
    }

    addRegister(registers) {
        this.setState({registers: registers});
    }

    removeRegister(register) {
        var newRegister = {
            year: register.year,
            month: register.month,
            day: register.day,
            time: register.time,
            name: register.name,
            status: 'available'
        };
        var newArray = this.state.registers;

        newArray.filter(function (item) {
            var index = item.time.indexOf(newRegister.time);
            if (index !== -1)  item.status = 'busy';
            return item;
        });
        this.setState({registers: newArray});
    }

    render() {

        var currentMonth = this.props.currentMonth;
        var currentDay = this.props.currentDay;
        var arr = this.state.registers;

        var TIMESARRAY = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'];
        var REGISTERS = [
            {year: '2017', month: '07', day: '2', time: '08.00', name: 'John Doe', status: 'available'},
            {year: '2017', month: '07', day: '2', time: '09.00', name: 'Ann Doe', status: 'busy'},
            {year: '2017', month: '07', day: '2', time: '10.00', name: 'John Doe', status: 'available'},
            {year: '2017', month: '07', day: '5', time: '10.00', name: 'Ann Doe', status: 'busy'},
            {year: '2017', month: '07', day: '5', time: '12.00', name: 'John Doe', status: 'available'},
            {year: '2017', month: '07', day: '5', time: '13.00', name: 'Ann Doe', status: 'available'},
            {year: '2017', month: '07', day: '6', time: '12.00', name: 'John Doe', status: 'available'},
            {year: '2017', month: '07', day: '6', time: '13.00', name: 'Ann Doe', status: 'available'},
            {year: '2017', month: '07', day: '6', time: '14.00', name: 'John Doe', status: 'available'},
            {year: '2017', month: '07', day: '6', time: '15.00', name: 'Ann Doe', status: 'available'}
        ];
        var busyTime = TIMESARRAY;

        var filteredArray = REGISTERS.concat(arr).filter(function (register) {
            if (register.month == currentMonth && register.day == currentDay && register.status == 'available') {
                var index = busyTime.indexOf(register.time);
                if (index !== -1) busyTime.splice(index, 1);
                return register;
            }
        });

        return (
            <div >
                {this.props.currentYear} / {this.props.currentMonth} / {this.props.currentDay}
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