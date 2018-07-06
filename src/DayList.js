import React, {Component} from 'react';

import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';

class DayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: {},
            times: {
                time: '',
                isAvailable: 'true'
            },
            initialTimeArray: [{time: '08.00', isAvailable: true}, {time: '09.00', isAvailable: true}, {
                time: '10.00',
                isAvailable: true
            }, {time: '11.00', isAvailable: true}]
            //     function(){
            //     let arr = [];
            //     for (var i = 8; i <= 17; i++) {
            //         let timesCopy ={};
            //         timesCopy.time = i;
            //         timesCopy.isAvailable = 'true';
            //         arr.push(timesCopy);
            //     }
            //     return arr;
            // }
        };
        this.addRegister = this.addRegister.bind(this);
        this.fillTimeArray = this.fillTimeArray.bind(this);
    }

    addRegister(registers) {
        this.setState({registers: registers});
    }

    fillTimeArray(times) {
        let arr = this.state.initialTimeArray;
        for (var i = 0; i < arr.length; i++) {
            if (times.time === arr[i].time) {
                //alert(times.time);
                let timesCopy = Object.assign({}, times);
                timesCopy.time = times.time;
                timesCopy.isAvailable = false;
                arr[i] = timesCopy;
            }
        }
        this.setState({initialTimeArray: arr});
    }

    render() {

        return (
            <div >
                <RegisterList registers={this.state.registers}/>
                <ClientNameInput addRegister={this.addRegister} fillTimeArray={this.fillTimeArray}
                                 initialTimeArray={this.state.initialTimeArray}/>
            </div>
        );
    }

}
export default DayList;