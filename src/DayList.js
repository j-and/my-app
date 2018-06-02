import React, {Component} from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Register from './Register.js';
import RegisterList from './RegisterList.js';
import FruitForm from './FruitForm.js';

class DayList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: {
                'fruit-1': 'orange',
                'fruit-2': 'apple'
            }
        };

        this.addRegister = this.addRegister.bind(this);

    }

    addRegister(registers, e) {
        this.setState({registers: registers});

    }

    render() {
        return (
            <div >

                <RegisterList registers={this.state.registers}/>
                <FruitForm addRegister={this.addRegister}/>
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <ListGroup>
    //                 <ListGroupItem><Register updateData={this.updateData}/></ListGroupItem>
    //                 <ListGroupItem><RegisterList time={this.state.time} value={this.state.value}/></ListGroupItem>
    //             </ListGroup>
    //         </div>
    //     );
    // }
}
export default DayList;
