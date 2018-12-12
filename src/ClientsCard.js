import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import FieldGroup from 'react-bootstrap/lib/FormControl';
import {sendData} from './methods.js';
import {dateToTimestamp} from './methods.js';
import moment from 'moment';

class ClientsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {},
            clients: [],
            clientName:'',
            editable: this.props.editable,
            isChanged: false
        };
        this.clearForm = this.clearForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editClient = this.editClient.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.saveEditedClient = this.saveEditedClient.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
       
        this.setState({isChanged: true});
    }

    saveClient() {
        var birthDate = this.state.clientBirthdate ? this.state.clientBirthdate : dateToTimestamp(new Date().toISOString());
        var newClient = {
            /*client_id is auto generated in db*/
            //client_id:'idididi',
            name: this.state.clientName,
            birthdate: birthDate,
            desease: this.state.clientDesease,
            phone: this.state.clientPhone,
            email: this.state.clientEmail,
            description: this.state.clientDescription
        };
        var newArray = this.state.clients;
        newArray.push(newClient);
        this.setState({clients: newArray});
        sendData(newClient, '/addClient');
    }


    saveEditedClient() {
        var newClient = {
            /*client_id is auto generated in db*/
            //client_id:'idididi',
            name: this.state.clientName,
            birthdate: this.state.clientBirthdate,
            desease: this.state.clientDesease,
            phone: this.state.clientPhone,
            email: this.state.clientEmail,
            description: this.state.clientDescription
        };
        sendData(newClient, '/editClient');
    }

    clearForm() {
        this.refs.registerForm.reset();
        this.setState({client: {}});
        this.setState({clients: []});
        this.setState({editable: false});
        this.props.addClient(this.state.clients);
        this.setState({isChanged: false});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if (this.props.isAdded) {
            this.saveClient();
        }
        else {
            this.saveEditedClient();
        }
        this.clearForm();
    }

    editClient() {
        this.setState({editable: true});
        var birthdate = this.props.client.birthdate ? this.props.client.birthdate : this.state.clientBirthdate;
        birthdate = moment(birthdate).format('YYYY-MM-DD');
        this.setState({clientName: this.props.client.name});
        this.setState({clientBirthdate: birthdate});
        this.setState({clientDesease: this.props.client.desease});
        this.setState({clientPhone: this.props.client.phone});
        this.setState({clientEmail: this.props.client.email});
        this.setState({clientDescription: this.props.client.description});
        document.getElementById('clientName').value = this.props.client.name;
        document.getElementById('clientDesease').value = this.props.client.desease;
        document.getElementById('clientBirthdate').value = birthdate;
        document.getElementById('clientPhone').value = this.props.client.phone;
        document.getElementById('clientEmail').value = this.props.client.email;
        document.getElementById('clientDescription').value = this.props.client.description;
    }

    render() {
        var client = this.props.client;
        var className = this.props.client.name ? (this.state.editable ? '' : 'view-form') : '';
        var showBtn = this.props.client.name ? '' : 'disabled';

        if(this.state.editable){
            var showSaveBtn=this.state.isChanged ? '' : 'disabled';
            var birthdateDateInput='';
            var birthdateTextInput='disabled';
        }
        else{
             showSaveBtn='disabled';
             birthdateDateInput='disabled';
             birthdateTextInput='';
        }
        
       if(this.props.client.birthdate){
          var birthdate=moment(this.props.client.birthdate).format('MM/DD/YYYY');
       }
        
        return (
            <div>
                <h2> Clients card {client.name}{client.client_id}</h2>
                <Button bsSize="xsmall" bsStyle="success" className={showBtn} value="Edit" onClick={this.editClient}>
                    Edit client
                </Button>
                <form ref="registerForm" className={className} onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <FieldGroup type="text" label="Name" placeholder={client.name} onChange={this.handleInputChange}
                                id="clientName" name="clientName"/>
                    <div className="col-xs-6 client_col_left">
                        <label>Desease</label>
                        <FieldGroup type="text" label="Desease" placeholder={client.desease}
                                    onChange={this.handleInputChange} id="clientDesease" name="clientDesease"/>

                        <label>Date of birth</label>
                        <FieldGroup type="date" label="Date of birth" className={birthdateDateInput}
                                    onChange={this.handleInputChange} id="clientBirthdate" name="clientBirthdate"/>
                            <FieldGroup type="text" label="Date of birth"  className={birthdateTextInput}  placeholder={birthdate}/>

                    </div>
                    <div className="col-xs-6 client_col_right">
                        <label>Phone</label>
                        <FieldGroup type="phone" label="Phone" placeholder={client.phone}
                                    onChange={this.handleInputChange} id="clientPhone" name="clientPhone"/>
                        <label>Email</label>
                        <FieldGroup type="email" label="Email address" placeholder={client.email}
                                    onChange={this.handleInputChange} id="clientEmail" name="clientEmail"/>
                    </div>
                    <label>Description</label>
                    <FieldGroup componentClass="textarea" placeholder={client.description} rows="15"
                                onChange={this.handleInputChange} id="clientDescription" name="clientDescription"/>
                    <Button bsSize="xsmall" bsStyle="success" className={showSaveBtn} type="submit" value="Add"
                            onClick={this.handleSubmit}>
                        Save changes
                    </Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;