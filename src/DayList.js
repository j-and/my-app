import React, {Component} from 'react';

import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';

class DayList extends Component {

    constructor(props) {
        super(props);

        this.addRegister = this.addRegister.bind(this);
        this.editTimeArray = this.editTimeArray.bind(this);
        this.updateRegisters = this.updateRegisters.bind(this);
        var timesArray = [{time: '08.00', isAvailable: true}, {time: '09.00', isAvailable: true}, {
            time: '10.00',
            isAvailable: true
        }, {time: '11.00', isAvailable: true}];

        this.state = {
            registers: {},
            times: {
                time: '',
                isAvailable: 'true'
            },
            initialTimeArray: timesArray

        };
    }

    addRegister(registers) {
        this.setState({registers: registers});
    }

    editTimeArray(times) {
        let arr = this.state.initialTimeArray;
        for (var i = 0; i < arr.length; i++) {
            if (times.time === arr[i].time) {
                let timesCopy = Object.assign({}, times);
                timesCopy.time = times.time;
                timesCopy.isAvailable = false;
                arr[i] = timesCopy;
            }
        }
        this.setState({initialTimeArray: arr});
    }

    updateRegisters(registers) {
        //  this.setState({registers: []});
    }

    render() {

        var currentMonth = this.props.currentMonth;
        var currentDay = this.props.currentDay;

        const REGISTERS = [
            {year: '2017', month: '01', day: '2', time: '08.00', name: 'John Doe'},
            {year: '2017', month: '01', day: '2', time: '10.00', name: 'Ann Doe'},
            {year: '2017', month: '02', day: '2', time: '08.00', name: 'John Doe'},
            {year: '2017', month: '02', day: '5', time: '10.00', name: 'Ann Doe'},
            {year: '2017', month: '07', day: '5', time: '12.00', name: 'John Doe'},
            {year: '2017', month: '07', day: '5', time: '13.00', name: 'Ann Doe'}
        ];

        var filteredArray = REGISTERS.filter(function (register) {
            return register.month == currentMonth && register.day == currentDay;
        });

        return (
            <div >
                {this.props.currentYear} / {this.props.currentMonth} / {this.props.currentDay}
                <RegisterList registers={this.state.registers} registersMock={filteredArray}/>
                <ClientNameInput addRegister={this.addRegister} editTimeArray={this.editTimeArray}
                                 initialTimeArray={this.state.initialTimeArray} updateRegisters={this.updateRegisters}
                                 registersMock={REGISTERS} currentDay={this.props.counter}/>
            </div>
        );
    }

}
export default DayList;