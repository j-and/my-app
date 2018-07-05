import React, {Component} from 'react';
import './styles/css/index.css';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import MonthTable from './MonthTable.js';
import LoginForm from './LoginForm.js';
import MonthNavigation from './MonthNavigation.js';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: '',//true,
            month: {
                monthCount: new Date().getMonth()+1,
                yearCount: new Date().getFullYear(),
                monthStart: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDay(),
                daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()
            },
            weeksObject: {
                nullWeekBeforeMonthStart: [],
                firstWeekBeforeMonthStart: [],
                firstWeekAfterMonthStart: [],
                secondWeekInMonth: [],
                thirdWeekInMonth: [],
                forthWeekInMonth: [],
                fifthWeekInMonth: [],
                sixthWeekInMonth:[]
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
        this.setState({
            weeksObject: {
                nullWeekBeforeMonthStart: [],
                firstWeekBeforeMonthStart: [],
                firstWeekAfterMonthStart: [],
                secondWeekInMonth: [],
                thirdWeekInMonth: [],
                forthWeekInMonth: [],
                fifthWeekInMonth: [],
                sixthWeekInMonth: []
            },
            month: {
                monthCount: month,
                yearCount: year,
                monthStart: new Date(year, month-1, 0).getDay() ,
                daysInMonth: new Date(year, month, 0).getDate()
            }
        })
    }

    render() {
        return (
            <div>
                <PageHeader>My-app</PageHeader>
                <MonthNavigation updateMonthCount={this.updateMonthCount} currentMonth={this.state.month.monthCount}
                                 currentYear={this.state.month.yearCount}/>
                <MonthTable month={this.state.month} weeksObject={this.state.weeksObject}/>
                <LoginForm show={this.state.isOpen}/>
            </div>
        );
    }
}

export default App;