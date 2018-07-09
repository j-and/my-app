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
        const REGISTERS = [
            {time: '08.00', name: 'John Doe'},
            {time: '10.00', name: 'Ann Doe'},
            {time: '08.00', name: 'John Doe'},
            {time: '10.00', name: 'Ann Doe'},
            {time: '08.00', name: 'John Doe'},
            {time: '10.00', name: 'Ann Doe'}
        ];
        return (
            <div >
                {this.props.registersMock.length} - {this.props.counter}
                <RegisterList registers={this.state.registers} registersMock={REGISTERS}/>
                <ClientNameInput addRegister={this.addRegister} editTimeArray={this.editTimeArray}
                                 initialTimeArray={this.state.initialTimeArray} updateRegisters={this.updateRegisters}
                                 registersMock={REGISTERS}/>
            </div>
        );
    }

}
export default DayList;