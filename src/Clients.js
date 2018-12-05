import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import ClientsCard from './ClientsCard.js';
import ClientsHistory from './ClientsHistory.js';
import ClientsList from './ClientsList.js';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            CLIENTS: []
        };
        this.switchClient = this.switchClient.bind(this);
        this.addClient = this.addClient.bind(this);
    }

    componentDidMount() {
        fetch('/getClients', {
            method: 'GET'
        }).then((response) => {
            response.json().then((data) => {
                this.setState({CLIENTS: data});
            })
        });
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

    addClient(clients) {
        clients = clients.concat(this.state.CLIENTS);
        this.setState({CLIENTS: clients});
    }

    render() {
        return (
            <div>
                <div className="col-sm-3"><ClientsList switchClient={this.switchClient} newClient={this.state.client}
                                                       CLIENTS={this.state.CLIENTS}/>

                </div>
                <div className="col-sm-6"><ClientsCard client={this.state.client}
                                                       addClient={this.addClient}
                                                       CLIENTS={this.state.CLIENTS}></ClientsCard></div>
                <div className="col-sm-3"><ClientsHistory client={this.state.client}></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;

//<Button bsStyle="success" type="submit" value="Add" onClick="">Add new</Button>