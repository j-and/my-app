import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import ClientsCard from './ClientsCard.js';
import ClientsHistory from './ClientsHistory.js';
import ClientsList from './ClientsList.js';
import moment from 'moment';
import {LocaleContext}  from './Context';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            CLIENTS: [],
            VISITS: [],
            editable: true,
            isAdded: true
        };
        this.changeClient = this.changeClient.bind(this);
        this.fillForm = this.fillForm.bind(this);
        this.switchClient = this.switchClient.bind(this);
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

    changeClient(clients) {
        var oldArray = this.state.CLIENTS;
        if (clients.length) {
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
        }
        clients = clients.concat(oldArray);
        this.setState({CLIENTS: clients});
        this.setState({editable: false});
        this.setState({isAdded: false});
        this.setState({client: false});
    }

    fillForm() {
        var birthdate = this.state.client.birthdate ? this.state.client.birthdate : new Date();
        birthdate = moment(birthdate).format('YYYY-MM-DD');
        document.getElementById('clientName').value = this.state.client.name;
        document.getElementById('clientDesease').value = this.state.client.desease;
        document.getElementById('clientBirthdate').value = birthdate;
        document.getElementById('clientPhone').value = this.state.client.phone;
        document.getElementById('clientEmail').value = this.state.client.email;
        document.getElementById('clientDescription').value = this.state.client.description;
    }

    render() {

        var showEditBtn = this.state.client.name ? '' : 'disabled';

        return (
            <div>
                <LocaleContext.Consumer>
                    {
                        localeVal =>
                            <h1>{localeVal.clientName}!</h1>
                    }
                </LocaleContext.Consumer>

                <div className="col-sm-3"><ClientsList switchClient={this.switchClient} CLIENTS={this.state.CLIENTS}/>
                    <Button bsStyle="success" value="Add" onClick={(()=>{this.setState({editable:true});
        this.setState({isAdded:true});this.setState({client:{}})})}>Add new</Button>
                    <Button bsSize="xsmall" bsStyle="success" className={showEditBtn} value="Edit" onClick={(()=>{ this.setState({isAdded: false});
        this.setState({editable: true});this.fillForm()})}>
                        Edit client
                    </Button>
                </div>

                <div className="col-sm-6"><ClientsCard client={this.state.client}
                                                       changeClient={this.changeClient}
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