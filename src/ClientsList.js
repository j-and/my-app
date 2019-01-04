import React, {Component} from 'react';
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
            <li key={client.name}><span
                onClick={() => {switchClient(client.name)}}>{client.name}</span>
            </li>
        );
        return (
            <div>
                <ul className=''>
                    {listItems}
                </ul>

            </div>

        );
    }
}

export default ClientsList;

// <LocaleContext.Consumer>
//     {localeVal => (
//         <li><span
//             onClick={() => { switchClient(client.name)}}>{client.name}</span>
//         </li>
//
//     )}
// </LocaleContext.Consumer>