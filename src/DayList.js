import React, {Component} from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Register from './Register.js';
import RegisterList from './RegisterList.js';
import FruitForm from './FruitForm.js';

class DayList extends Component {

    constructor(props) {
        super(props);
        this.state = {time: 'Time', value: ''};
        this.updateData = this.updateData.bind(this);
    }

    getInitialState () {
    return (
    {
        registers : {
            'time_1' : 'orange',
            'time_2' : 'apple'
        }
    }
    )
}
    addRegister (register) {
    //create a unike key for each new register item
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.registers['time_' + timestamp ] = register;
    // set the state
    this.setState({ registers : this.state.registers });
}

    updateData(time, value) {
        this.setState({time: time, value: value});
    }




    render() {
    return (
        <div >
            <RegisterList registers={this.state.registers} />
            <FruitForm addRegister={this.addRegister} />
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
