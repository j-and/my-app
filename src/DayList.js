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
                isAvailable: true
            }
        };
        this.addRegister = this.addRegister.bind(this);
        this.fillTimeArray = this.fillTimeArray.bind(this);
    }
    
    addRegister(registers) {
        this.setState({registers: registers});
    }

    fillTimeArray() {
        let arr = [];
        for (var i = 8; i <= 17; i++) {
            let timesCopy = Object.assign({}, this.state.times);
            timesCopy.time = i;
            timesCopy.isAvailable = false;
            arr.push(timesCopy);
        }
        return arr;
        
    }

    render() {
        return (
            <div >
                <RegisterList registers={this.state.registers}/>
                <ClientNameInput addRegister={this.addRegister} fillTimeArray={this.fillTimeArray}/>
            </div>
        );
    }

}
export default DayList;
