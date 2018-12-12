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
            CLIENTS: [],
            VISITS: [],
            editable: false,
            isAdded: false
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
                    this.setState({editable: false});
                })

            }
        );
        fetch('/getVisits', {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                this.setState({VISITS: data});
            })
        });
    }

    addClient(clients, editable) {
        var oldArray = this.state.CLIENTS;
        for (var i = 0; i < oldArray.length; i++) {
            if (oldArray[i]) {
                if (oldArray[i].name == clients[0].name) {
                    delete oldArray[i];
                }
            }
            else {
                i++;
            }
        }
        clients = clients.concat(oldArray);
        this.setState({CLIENTS: clients});
        this.setState({editable: editable});
        this.setState({isAdded: true});
    }

    render() {
        return (
            <div>
                <div className="col-sm-3"><ClientsList switchClient={this.switchClient} newClient={this.state.client}
                                                       CLIENTS={this.state.CLIENTS}/>
                    <Button bsStyle="success" type="submit" value="Add" onClick={() => {this.setState({client:{}})}}>Add
                        new</Button>
                </div>
                <div className="col-sm-6"><ClientsCard client={this.state.client}
                                                       addClient={this.addClient}
                                                       CLIENTS={this.state.CLIENTS}
                                                       editable={this.state.editable}
                                                       isAdded={this.state.isAdded}></ClientsCard></div>
                <div className="col-sm-3"><ClientsHistory client={this.state.client}
                                                          VISITS={this.state.VISITS}></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;