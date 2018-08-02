import React, {Component} from 'react';
import Client from './Clients.js';
import Calendar from './Calendar.js';
import {Route, Switch, NavLink}   from 'react-router-dom';
import LoginForm from './LoginForm.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: ''//,true
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {

        return (
            <div><PageHeader>My app
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/clients">Clients</NavLink>
                    </li>
                </ul>
            </PageHeader>
                <Switch>
                    <Route exact path="/" component={Calendar}/>
                    <Route path="/clients" component={Client}/>
                </Switch>
            </div>
        );
    }
}

export default App;