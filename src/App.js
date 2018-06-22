import React, {Component} from 'react';

import './App.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';
import LoginForm from './LoginForm.js';
import MonthNavigation from './MonthNavigation.js';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            month: {
                monthCount: new Date().getMonth() + 1,
                monthStart: new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDay(),
                daysInMonth: new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate()
            },
            weeksObject: {
                firstWeekBeforeMonthStart: [],
                firstWeekAfterMonthStart: [],
                secondWeekInMonth: [],
                thirdWeekInMonth: [],
                forthWeekInMonth: [],
                fifthWeekInMonth: []
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.updateMonthCount = this.updateMonthCount.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    updateMonthCount(value) {
        this.setState({
            weeksObject: {
                firstWeekBeforeMonthStart: [],
                firstWeekAfterMonthStart: [],
                secondWeekInMonth: [],
                thirdWeekInMonth: [],
                forthWeekInMonth: [],
                fifthWeekInMonth: []
            },
            month: {
                monthCount: value,
                monthStart: new Date(new Date().getYear(), value, 0).getDay() - 1,
                daysInMonth: new Date(new Date().getYear(), value, 0).getDate()
            }
        })
    }

    render() {

        return (

            <div>
                <PageHeader>My-app</PageHeader>
                <MonthTable month={this.state.month} weeksObject={this.state.weeksObject}/>
                <LoginForm show={this.state.isOpen}/>
                <MonthNavigation updateMonthCount={this.updateMonthCount}/>
            </div>
        );
    }
}

export default App;