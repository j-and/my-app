import React, {Component} from 'react';

import RegisterList from './RegisterList.js';
import ClientNameInput from './ClientNameInput.js';

class DayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: {}
        };
        this.addRegister = this.addRegister.bind(this);
    }


    addRegister(registers) {
        this.setState({registers: registers});
    }

    render() {
        return (
            <div >
                <RegisterList registers={this.state.registers}/>
                <ClientNameInput addRegister={this.addRegister}/>

            </div>
        );
    }

}
export default DayList;
