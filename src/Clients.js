import React, {Component} from 'react';
import ClientsCard from './ClientsCard.js';
import ClientsHistory from './ClientsHistory.js';
import ClientsList from './ClientsList.js';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {}
        };
        this.switchClient = this.switchClient.bind(this);
    }

    switchClient(clientName) {
        var client = {
            name: clientName
        };
        fetch('/switchClient', {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (response) => {
                response.json().then((data) => {
                    this.setState({client: data[0]});
                })

            }
        );
    }

    render() {
        return (
            <div>
                <div className="col-sm-3"><ClientsList switchClient={this.switchClient}/></div>
                <div className="col-sm-6"><ClientsCard client={this.state.client}></ClientsCard></div>
                <div className="col-sm-3"><ClientsHistory></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;