import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import {sortByKey} from './methods.js';


class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CLIENTS: []
        }
    }

    render() {
        var switchClient = this.props.switchClient;
        var arr = this.props.CLIENTS;
        var sortedArr = sortByKey(arr, 'name');

        var listItems = sortedArr.map((client) =>

            <li><a onClick={() => { switchClient(client.name)}}>{client.name}</a></li>
        );
        return (
            <div>
                <h2> Clients list</h2>
                <ul className='clients_list'>
                    {listItems}
                </ul>

            </div>

        );

    }
}

export default ClientsList;

