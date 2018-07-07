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
        alert('updateMonthCount');
        var weeksObjectCopy=Object.assign({},this.state.weeksObject);
        Object.keys(weeksObjectCopy).map(function (key) {
            weeksObjectCopy[key]=[];
        });
        var monthCopy=Object.assign({},this.state.month);
        monthCopy.monthCount=month;
        monthCopy.yearCount=year;
        monthCopy.monthStart= new Date(year, month-1, 0).getDay();
        monthCopy.daysInMonth=new Date(year, month, 0).getDate();

         this.setState({weeksObject: weeksObjectCopy});
        this.setState({month: monthCopy});
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

// <MonthTable month={this.state.month} weeksObject={this.state.weeksObject}/>