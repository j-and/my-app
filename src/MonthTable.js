import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';

class MonthTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trHead: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysArray: [],
            showWeekends: true,
            elements: []
        };
        this.toggleWeekend = this.toggleWeekend.bind(this);
    }

    toggleWeekend() {
        this.setState({elements: []});
        this.setState({elements: document.getElementsByClassName('day_weekend')});
        this.setState({showWeekends: !this.state.showWeekends});
    }

    render() {

        if (this.state.showWeekends) {
            for (i = 0; i < this.state.elements.length; i++) {
                this.state.elements[i].classList.remove("disabled");
            }
        }
        else {
            for (i = 0; i < this.state.elements.length; i++) {
                this.state.elements[i].classList.add("disabled");
            }
        }


        var currentDay = 1;
        var month = this.props.currentDate.currentMonth;
        var year = this.props.currentDate.currentYear;

        function fillWeekArray(arrayName) {
            arrayName = [];

            var j;
            for (j = 0; j < 5; j++) {
                arrayName.push(<td className="day_ordinary"><DayList currentMonth={month} currentYear={year}
                                                                     currentDay={currentDay}/>
                </td>);
                currentDay += 1;
            }
            for (j = 5; j < 7; j++) {
                arrayName.push(<td className="day_weekend"><DayList currentMonth={month} currentYear={year}
                                                                    currentDay={currentDay}/></td>);
                currentDay += 1;
            }
            return arrayName;
        }

        /*Calendar*/
        var i, j;
        var wholeWeekCount = Math.floor(this.props.currentDate.daysInMonth / 7) + 1;
        var firstWeek = [];
        var lastWeek = [];
        var latestWeek = [];
        for (i = 1; i <= wholeWeekCount; i++) {
            switch (i) {
                case 1:

                    if (this.props.currentDate.monthStart !== -1) {
                        for (j = 0; j < this.props.currentDate.monthStart; j++) {
                            (j < 5) ? firstWeek.push(<td
                                className="day_ordinary">
                                -</td>) :
                                firstWeek.push(<td
                                    className="day_weekend">
                                    -</td>);

                        }
                        for (j = this.props.currentDate.monthStart; j < 7; j++) {
                            if (j < 5) {
                                firstWeek.push(<td
                                    className="day_ordinary">
                                    <DayList currentMonth={this.props.currentDate.currentMonth}
                                             currentYear={this.props.currentDate.currentYear} currentDay={currentDay}/>
                                </td>);
                                currentDay += 1;
                            }
                            else {
                                firstWeek.push(<td
                                    className="day_weekend">
                                    <DayList currentMonth={this.props.currentDate.currentMonth}
                                             currentYear={this.props.currentDate.currentYear} currentDay={currentDay}/>
                                </td>);
                                currentDay += 1;
                            }
                        }
                    }
                    else {
                        for (j = 0; j < 5; j++) {
                            this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_ordinary">
                                -</td>);
                        }
                        this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_weekend">
                            -</td>);
                        this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_weekend">
                            <DayList
                                currentDay={currentDay}/>
                        </td>);
                        currentDay += 1;
                        this.props.weeksObject.firstWeekBeforeMonthStart = fillWeekArray('firstWeekBeforeMonthStart');
                    }
                    break;
                case 2:
                    this.props.weeksObject.secondWeekInMonth = fillWeekArray('secondWeekInMonth');
                    break;
                case 3:
                    this.props.weeksObject.thirdWeekInMonth = fillWeekArray('thirdWeekInMonth');
                    break;
                case 4:
                    this.props.weeksObject.forthWeekInMonth = fillWeekArray('forthWeekInMonth');
                    break;
                case 5:
                    if ((this.props.currentDate.daysInMonth - currentDay) < 7) {
                        var a = this.props.currentDate.daysInMonth - currentDay;
                        for (j = 0; j <= a; j++) {
                            if (j < 5) {
                                lastWeek.push(<td className="day_ordinary">
                                    <DayList currentMonth={this.props.currentDate.currentMonth}
                                             currentYear={this.props.currentDate.currentYear} currentDay={currentDay}/>
                                </td>);
                                currentDay += 1;
                            }
                            else {
                                lastWeek.push(<td className="day_weekend">
                                    <DayList
                                        currentDay={currentDay}/>
                                </td>);
                                currentDay += 1;
                            }
                        }
                        for (j = a + 1; j < 7; j++) {
                            if (j < 5) {
                                lastWeek.push(<td className="day_ordinary">
                                    -</td>)
                            }
                            else {
                                lastWeek.push(<td className="day_weekend">
                                    -</td>);
                            }
                        }
                    }
                    else {
                        lastWeek = fillWeekArray('fifthWeekInMonth');

                        for (j = 0; j <= this.props.currentDate.daysInMonth - currentDay + 1; j++) {
                            if (j < 5) {
                                latestWeek.push(<td className="day_ordinary">
                                    <DayList currentMonth={this.props.currentDate.currentMonth}
                                             currentYear={this.props.currentDate.currentYear} currentDay={currentDay}/>
                                </td>);
                                currentDay += 1;
                            }
                            else {
                                latestWeek.push(<td className="day_weekend">
                                    <DayList
                                        currentDay={currentDay}/></td>);
                                currentDay += 1;
                            }
                        }

                        for (j; j < 7; j++) {
                            (j < 5) ? latestWeek.push(<td className="day_ordinary">
                                -</td>) :
                                latestWeek.push(<td className="day_weekend">
                                    -</td>);
                        }
                    }
                    break;
                default:
                    alert('Error');
                    break;
            }
        }

        return (
            <div><Button className="btn btn-info" onClick={this.toggleWeekend}>Hide weekends</Button>
                <Table responsive className="calendar">
                    <thead>
                    <tr>
                        {
                            this.state.trHead.map(function (day, index) {
                                return (index < 5) ? <th>{day}</th> : <th className="day_weekend">{day}</th>;
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>

                    <tr>{firstWeek.map(function (i) {
                        return i;
                    })}
                        {this.props.weeksObject.firstWeekAfterMonthStart.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.props.weeksObject.secondWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.props.weeksObject.thirdWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.props.weeksObject.forthWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {lastWeek.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {latestWeek.map(function (i) {
                            return i;
                        })}
                    </tr>
                    </tbody>
                </Table>

            </div>
        );
    }
}

export default MonthTable;