import React, {Component} from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import Table from 'react-bootstrap/lib/Table';
import {sortByKey} from './methods.js';
import {sendClientData} from './methods.js';
import moment from 'moment';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitComment: 'comment'
        };
    }

    render() {
        var sortedArr = sortByKey(this.props.VISITS, 'datetime');
        return (
            <div>
                <h2><FormattedMessage id="client.history" defaultMessage="Client history" description=""/></h2>
                <Table responsive className="client_history">
                    <thead>
                    <tr>
                        <th><FormattedMessage id="client.date" defaultMessage="Date" description=""/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(sortedArr).map(function (key) {
                        return <tr>
                            <td>{moment(sortedArr[key].datetime).format('YYYY-MM-DD')}</td>
                        </tr>
                    }) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ClientsHistory;