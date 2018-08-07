import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FieldGroup from 'react-bootstrap/lib/FormControl';
import {sendClientData} from './methods.js';

class ClientsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientName: "",
            clientBirthDate: "",
            clientDesease: "",
            clientPhone: "",
            clientEmail: "",
            clientDescription: ""
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
        alert('An essay was submitted: ' + this.state.clientDescription);
        event.preventDefault();
        var newClient = {
            clientName: this.state.clientName,
            clientBirthDate: this.state.clientBirthDate,
            clientDesease: this.state.clientDesease,
            clientPhone: this.state.clientPhone,
            clientEmail: this.state.clientEmail,
            clientDescription: this.state.clientDescription
        };
        sendClientData(newClient);
        this.refs.registerForm.reset();
    }


    render() {

        return (
            <div>
                <h2> Clients card {this.state.clientName}</h2>

                <form ref="registerForm" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <FieldGroup type="text" label="Name" placeholder="Enter text" onChange={this.handleInputChange}
                                name="clientName"/>
                    <div className="col-xs-6 client_col_left">
                        <label>Desease</label>
                        <FieldGroup type="text" label="Desease" placeholder="Enter text"
                                    onChange={this.handleInputChange} name="clientDesease"/>
                        <label>Date of birth</label>
                        <FieldGroup type="date" label="Date of birth" placeholder="Enter text"
                                    onChange={this.handleInputChange} name="clientBirthDate"/>
                    </div>
                    <div className="col-xs-6 client_col_right">
                        <label>Phone</label>
                        <FieldGroup type="phone" label="Phone" placeholder="Enter phone"
                                    onChange={this.handleInputChange} name="clientPhone"/>
                        <label>Email</label>
                        <FieldGroup type="email" label="Email address" placeholder="Enter email"
                                    onChange={this.handleInputChange} name="clientEmail"/>
                    </div>
                    <label>Description</label>
                    <FieldGroup componentClass="textarea" placeholder="Enter description" rows="15"
                                onChange={this.handleInputChange} name="clientDescription"/>
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add">
                        <Glyphicon glyph="plus"/>Save changes
                    </Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;