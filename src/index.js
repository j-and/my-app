import React, {Component} from 'react';
import Client from './Clients.js';
import Calendar from './Calendar.js';
import {Route, Switch, NavLink}   from 'react-router-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import {addLocaleData, IntlProvider} from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ru from 'react-intl/locale-data/ru';


addLocaleData([...locale_en, ...locale_ru]);


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
            <IntlProvider locale="en">
                <div>

                    <h1 className="App-title">
                        <FormattedMessage id="app.title"
                                          defaultMessage="Welcome to {what}"
                                          description="Welcome header on app main page"
                                          values={{ what: 'react-intl' }}/>
                    </h1>

                    <FormattedHTMLMessage id="app.intro"
                                          defaultMessage="To get started, edit <code>src/App.js</code> and save to reload."
                                          description="Text on main page"/>

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
            </IntlProvider>
        );
    }
}

export default App;