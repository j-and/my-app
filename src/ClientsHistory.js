import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Visit from './Visit.js';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientInfo:{},
           clientName: 'john doe',
            VISITS: []
        }
    }

    componentDidMount() {
        var obj = {clientName: 'ann doe'};
        fetch('/getVisits', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                this.setState({VISITS: data});
                var clientInfoCopy=this.state.clientInfo;
                clientInfoCopy.clientName=data[4].clientName;
                clientInfoCopy.date=data[4].date;
                clientInfoCopy.time=data[4].time;
                clientInfoCopy.comment=data[4].comment;
                clientInfoCopy.payment=data[4].payment;
                this.setState({clientInfo:clientInfoCopy});
            })
        });
    }

    render() {

        var sortedArr = this.state.VISITS;
        var clientInfo = this.state.clientInfo;

        return (
            <div>
                <h2> Clients history</h2>
                <label>Visits of {this.state.clientInfo.clientName}</label>
                <ListGroup >
                    {Object.keys(sortedArr).map(function (key) {
                        return <Visit clientInfo={clientInfo}> </Visit>;
                    }) }
                </ListGroup>
            </div>
        );
    }
}

export default ClientsHistory;