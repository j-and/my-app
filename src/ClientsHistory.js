import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Visit from './Visit.js';
import {sortByKey} from './methods.js';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        var arr = this.props.VISITS;
        var sortedArr = sortByKey(arr, 'datetime');
        var client = this.props.client;

        return (
            <div>
                <h2> Clients history</h2>
                <label>Visits of {client.name}</label>
                <ListGroup >
                    {Object.keys(sortedArr).map(function (key) {
                        return <Visit clientInfo={sortedArr[key]}> </Visit>;
                    }) }
                </ListGroup>
            </div>
        );
    }
}

export default ClientsHistory;