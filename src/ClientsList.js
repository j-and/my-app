import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Visit from './Visit.js';

class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CLIENTS: []
        }
    }

    componentDidMount() {
        fetch('/getClients', {
            method: 'GET'
        }).then((response) => {
            response.json().then((data) => {
                console.log('data= '+data.length);
                this.setState({CLIENTS: data});
            })
        });
    }

    render() {
        var switchClient = this.props.switchClient;
        var sortedArr = this.state.CLIENTS;
console.log('sortedArray='+sortedArr.length);
        var listItems = sortedArr.map((client) =>
       
            <li><button onClick={() => { switchClient(client.name)}}>{client.name}</button></li>
        );
        return (
            <div>
                <h2> Clients list</h2>
            <ul>
                {listItems}
            </ul>
            </div>
        );

    }
}

export default ClientsList;

