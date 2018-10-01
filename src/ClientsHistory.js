import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Visit from './Visit.js';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientInfo:{},
           clientName: this.props.client.name,
            VISITS: []
        }
    }

    componentDidMount() {
        var obj = {clientName: this.props.client.name};
        console.log('this.props.client.name='+this.props.client.name);
        fetch('/getVisits', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                this.setState({VISITS: data});
            })
        });
    }

    render() {

        var sortedArr = this.state.VISITS;
        //var client = this.props.client;

        return (
            <div>
                <h2> Clients history</h2>
                <label>Visits of {this.state.clientName}</label>
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