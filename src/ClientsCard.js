import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import FieldGroup from 'react-bootstrap/lib/FormControl';
import {sendClientData} from './methods.js';

class ClientsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            clients: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.clientName) {
            var newClient = {
                name: this.state.clientName,
                birthdate: this.state.clientBirthdate,
                desease: this.state.clientDesease,
                phone: this.state.clientPhone,
                email: this.state.clientEmail,
                description: this.state.clientDescription
            };

            var newArray = this.state.clients;
            newArray.push(newClient);
            this.setState({clients: newArray});
            this.props.addClient(this.state.clients);
            sendClientData(newClient);
            this.refs.registerForm.reset();
        }
        else {
            alert("Enter name");
        }
    }


    render() {
        var client = this.props.client;
        var a = new Date(client.birthdate);
        var month = a.getMonth() + '';
        if (month.length == 1) {
            month = '0' + month;
        }
        var day = a.getDate() + '';
        if (day.length == 1) {
            day = '0' + day;
        }
        a = a.getFullYear() + '-' + month + '-' + day;

        var birthdate = (a);

        return (
            <div>
                <h2> Clients card {client.name}</h2>

                <form ref="registerForm" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <FieldGroup type="text" label="Name" placeholder={client.name} onChange={this.handleInputChange}
                                name="clientName" required/>
                    <div className="col-xs-6 client_col_left">
                        <label>Desease</label>
                        <FieldGroup type="text" label="Desease" placeholder={client.desease}
                                    onChange={this.handleInputChange} name="clientDesease"/>
                        <label>Date of birth</label>
                        <FieldGroup type="date" label="Date of birth" value={birthdate}
                                    onChange={this.handleInputChange} name="clientBirthdate"/>
                    </div>
                    <div className="col-xs-6 client_col_right">
                        <label>Phone</label>
                        <FieldGroup type="phone" label="Phone" placeholder={client.phone}
                                    onChange={this.handleInputChange} name="clientPhone"/>
                        <label>Email</label>
                        <FieldGroup type="email" label="Email address" placeholder={client.email}
                                    onChange={this.handleInputChange} name="clientEmail"/>
                    </div>
                    <label>Description</label>
                    <FieldGroup componentClass="textarea" placeholder={client.description} rows="15"
                                onChange={this.handleInputChange} name="clientDescription"/>
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add">
                        Save changes
                    </Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;