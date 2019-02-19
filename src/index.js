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
import ruTranslations  from "./translations/ru.json";
import enTranslations  from "./translations/en.json";

addLocaleData([...locale_en, ...locale_ru]);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: '',
            locale: 'ru'
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setEnLocale = this.setEnLocale.bind(this);
        this.setRuLocale = this.setRuLocale.bind(this);
        this.messages = {
            en: enTranslations,
            ru: ruTranslations
        };

    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    setEnLocale() {
        this.setState({
            locale: 'en'
        });
    }

    setRuLocale() {
        this.setState({
            locale: 'ru'
        });
    }

    render() {
        return (
            <IntlProvider locale={this.state.locale} messages={this.messages[this.state.locale]}>
                <div>
                    <button onClick={this.setEnLocale}>EN</button>
                    <button onClick={this.setRuLocale}>RU</button>

                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="">My-app</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <NavItem href="/"> <FormattedMessage id="nav.home"
                                                                 defaultMessage="Home"
                                                                 description=""
                                                                 values={{ what: 'logo' }}/></NavItem>
                            <NavItem href="/clients"><FormattedMessage id="nav.clients"
                                                                       defaultMessage="Clients"
                                                                       description=""
                                                                       values={{ what: 'logo' }}/></NavItem>
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