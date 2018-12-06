import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import FieldGroup from 'react-bootstrap/lib/FormControl';
import {sendData} from './methods.js';
import {dateToTimestamp} from './methods.js';

class ClientsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            clients: [],
            clientName:this.props.client.name,
            editable: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editClient = this.editClient.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleInputDateChange(event) {
        const target = event.target;
        const value = dateToTimestamp(target.value);
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
       // alert('this.props.client.name='+this.props.client.name)
        if (this.state.clientName) {
            var newClient = {
                /*client_id is auto generated in db*/
                client_id:'idididi',
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
            sendData(newClient, '/addClient');
            this.refs.registerForm.reset();
            this.setState({client: {}});
            this.setState({editable: false});
        }
        else {
            alert("Enter name");
        }
    }

    editClient() {
    this.setState({editable: true});
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
console.log('this.props.client.name='+this.props.client.name);
        var className = this.props.client.name ? (this.state.editable?'':'view-form'):'';
        //var nameValue = this.props.client.name ? this.props.client.name:'';
        return (
            <div>
                <h2> Clients card {client.name}{client.client_id}</h2>
                <Button bsSize="xsmall" bsStyle="success" value="Edit" onClick={this.editClient}>
                    Edit client
                </Button>
                <form ref="registerForm" className={className}  onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <FieldGroup type="text" label="Name" placeholder={client.name} onChange={this.handleInputChange}
                                name="clientName"/>
                    <div className="col-xs-6 client_col_left">
                        <label>Desease</label>
                        <FieldGroup type="text" label="Desease" placeholder={client.desease}
                                    onChange={this.handleInputChange} name="clientDesease"/>
                        <label>Date of birth</label>
                        <FieldGroup type="date" label="Date of birth" value={birthdate}
                                    onChange={this.handleInputDateChange} name="clientBirthdate"/>
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