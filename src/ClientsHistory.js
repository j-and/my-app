import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Visit from './Visit.js';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        var arr = this.props.VISITS;
        var sortedArr = sortByKey(arr, 'datetime');
        var client = this.props.client;

        function sortByKey(array, key) {
            return array.sort(function (a, b) {
                var x = (a[key]);
                var y = (b[key]);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

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