import React, {Component} from 'react';
import Client from './Clients.js';
import Calendar from './Calendar.js';
import {Route, Switch, NavLink}   from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

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
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">My-app</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/clients">Clients</NavLink></li>
                    </Nav>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search"/>
                        </FormGroup>{' '}
                        <Button type="submit">Submit</Button>
                    </Navbar.Form>
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