import React, {Component} from 'react';
import {sortByKey} from './methods.js';
import {LocaleContext}  from './Context';


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
            <LocaleContext.Consumer>
                {localeVal => (
                    <li key={localeVal.clientName}><a
                        onClick={() => { switchClient(client.name);localeVal.changeName(client.name)}}>{client.name}</a>
                    </li>

                )}
            </LocaleContext.Consumer>
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