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
            editable: false
        };
        this.clearForm = this.clearForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.saveEditedClient = this.saveEditedClient.bind(this);
    }

    componentDidMount() {
        var birthdate = this.props.client.birthdate ? this.props.client.birthdate : this.state.clientBirthdate;
        birthdate = moment(birthdate).format('YYYY-MM-DD');
        this.setState({clientName: this.props.client.name});
        this.setState({clientBirthdate: birthdate});
        this.setState({clientDesease: this.props.client.desease});
        this.setState({clientPhone: this.props.client.phone});
        this.setState({clientEmail: this.props.client.email});
        this.setState({clientDescription: this.props.client.description});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    saveClient() {
        var name = this.state.clientName ? this.state.clientName : '';
        var birthdate = this.state.clientBirthdate ? this.state.clientBirthdate :new Date();
        var desease = this.state.clientDesease ? this.state.clientDesease : '';
        var phone = this.state.clientPhone ? this.state.clientPhone : '';
        var email = this.state.clientEmail ? this.state.clientEmail : '';
        var description = this.state.clientDescription ? this.state.clientDescription : '';
        var newClient = {
            /*client_id is auto generated in db*/
            //client_id:'idididi',
            name: name,
            birthdate: birthdate,
            desease: desease,
            phone: phone,
            email: email,
            description: description
        };
        var newArray = this.state.clients;
        newArray.push(newClient);
        this.setState({clients: newArray});
        sendData(newClient, '/addClient');
        this.clearForm();
    }


    saveEditedClient() {
        var name = this.state.clientName ? this.state.clientName : this.props.client.name;
        var birthdate = this.state.clientBirthdate ? this.state.clientBirthdate : this.props.client.birthdate;
        var desease = this.state.clientDesease ? this.state.clientDesease : this.props.client.desease;
        var phone = this.state.clientPhone ? this.state.clientPhone : this.props.client.phone;
        var email = this.state.clientEmail ? this.state.clientEmail : this.props.client.email;
        var description = this.state.clientDescription ? this.state.clientDescription : this.props.client.description;
        var newClient = {
            /*client_id is auto generated in db*/
            //client_id:'idididi',
            name: name,
            birthdate: birthdate,
            desease: desease,
            phone: phone,
            email: email,
            description: description
        };
        sendData(newClient, '/editClient');
        this.clearForm();
    }

    clearForm() {
        this.refs.registerForm.reset();
        this.setState({client: {}});
        this.setState({clients: []});
        this.setState({editable: false});
        this.setState({isAdded: false});
        this.props.addClient(this.state.clients, this.state.editable, this.state.isAdded);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.isAdded) {
            this.saveClient();
        }
        else {
            this.saveEditedClient();
        }
    }

    render() {
        var client = this.props.client;
        if (this.props.editable) {

            var className = '';
            var birthdateDateInput = '';
            var birthdateTextInput = 'disabled';
            var showSaveBtn = '';
        }
        else{
          if(this.state.editable&&this.props.isAdded){
              var className = '';
              var birthdateDateInput = '';
              var birthdateTextInput = 'disabled';
              var showSaveBtn = '';
          }  
            else{
              className = 'view-form';
              birthdateDateInput = 'disabled';
              birthdateTextInput = '';
              showSaveBtn = 'disabled';
          }
        }

        if (this.props.client.birthdate) {
            var birthdate = moment(this.props.client.birthdate).format('MM/DD/YYYY');
        }

        return (
            <div>
                <h2> Clients card {client.name}{client.client_id}</h2>

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
                        <FieldGroup type="text" label="Date of birth" className={birthdateTextInput}
                                    placeholder={birthdate}/>

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
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add" className={showSaveBtn}>
                        Save changes
                    </Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;