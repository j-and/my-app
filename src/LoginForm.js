import React, {Component} from 'react';


import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import {sendData} from './methods.js';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            servantData: {},
            isOpen:true

        };
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeLoginForm(){

    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.name && this.state.password) {
            var servantDataArray = this.state.servantData;//.slice();
            servantDataArray.name = this.state.name;
            servantDataArray.password = this.state.password;
            this.setState({servantData: servantDataArray});
            sendData(this.state.servantData);
            this.refs.registerForm.reset();
            this.setState({isOpen: false});
        }
        else {
            alert("Enter name");

        }
    }

    render() {

        if(!this.state.isOpen) {
            return null;
        }

        return (<div>
            <div className="overlay">
                <form className="loginform" onSubmit={this.handleSubmit} ref="registerForm">
                    <FormControl type="text" value={this.state.value} onChange={this.handleChange} placeholder="Name"/>
                    <FormControl type="password" value={this.state.value} onChange={this.handlePasswordChange}
                                 placeholder="Password"/>
                    <Button type="submit" onClick={this.handleSubmit}>Login</Button>
                </form>
            </div>
        </div>)
    }
}
export default LoginForm;

