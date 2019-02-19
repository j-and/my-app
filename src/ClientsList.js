import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
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
            <li key={client.name}>
                <a onClick={() => {switchClient(client.name)}}>{client.name}</a>
            </li>
        );
        return (
            <div>
                <h2><FormattedMessage id="client.list" defaultMessage="Client list" description=""/></h2>
                <ul className='clients_list'>
                    {listItems}
                </ul>

            </div>

        );
    }
}

export default ClientsList;