import React, {Component} from 'react';
import MonthTable from './MonthTable.js';
import LoginForm from './LoginForm.js';
import MonthNavigation from './MonthNavigation.js';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: '',//true,
            currentDate: {
                currentDay: new Date().getDate(),
                currentMonth: new Date().getMonth() + 1,
                currentYear: new Date().getFullYear(),
                monthStart: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDay(),
                daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
            },
            weeksObject: {
                nullWeekBeforeMonthStart: [],
                firstWeekBeforeMonthStart: [],
                firstWeekAfterMonthStart: [],
                secondWeekInMonth: [],
                thirdWeekInMonth: [],
                forthWeekInMonth: [],
                fifthWeekInMonth: [],
                sixthWeekInMonth: []
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

    updateMonthCount(month, year) {
        var weeksObjectCopy = Object.assign({}, this.state.weeksObject);
        Object.keys(weeksObjectCopy).map(function (key) {
            weeksObjectCopy[key] = [];
        });
        var currentDateCopy = Object.assign({}, this.state.currentDate);
        currentDateCopy.currentMonth = month;
        currentDateCopy.currentYear = year;
        currentDateCopy.monthStart = new Date(year, month - 1, 0).getDay();
        currentDateCopy.daysInMonth = new Date(year, month, 0).getDate();

        this.setState({weeksObject: weeksObjectCopy});
        this.setState({currentDate: currentDateCopy});
    }

    render() {

        return (
            <div>
                <FormattedMessage id="calendar.test"
                                  defaultMessage="Clients"
                                  description=""
                                  values={{ what: 'logo' }}/>
                <MonthNavigation updateMonthCount={this.updateMonthCount}
                                 currentMonth={this.state.currentDate.currentMonth}
                                 currentYear={this.state.currentDate.currentYear}/>
                <MonthTable currentDate={this.state.currentDate} weeksObject={this.state.weeksObject}/>
                <LoginForm show={this.state.isOpen}/>
            </div>
        );
    }
}

export default Calendar;
