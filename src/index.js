import React, {Component} from 'react';
import Client from './Clients.js';
import Calendar from './Calendar.js';
import {Route, Switch, NavLink}   from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: '',//true
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
            <div>


                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="">My-app</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem href="/">Home</NavItem>
                        <NavItem href="/clients">Clients</NavItem>
                    </Nav>
                </Navbar>


                <Switch>
                    <Route exact path="/" component={Calendar}/>
                    <Route path="/clients" component={Client}/>
                </Switch>
            </div>
        );
    }
}

export default App;