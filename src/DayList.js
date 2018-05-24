import React, {Component} from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Register from './Register.js';
import RegisterList from './RegisterList.js';

class DayList extends Component {

    constructor(props) {
        super(props);

        this.state = {time: 'Time', value: ''};

        this.updateData = this.updateData.bind(this);


    }
    
    updateData(time, value) {
        this.setState({time: time, value: value});
    }

    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem><Register updateData={this.updateData}/></ListGroupItem>
                    <ListGroupItem><RegisterList time={this.state.time} value={this.state.value}/></ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default DayList;