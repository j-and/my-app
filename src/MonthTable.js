import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class MonthTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trHead: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysArray: []
        };
        this.fillHeadArray = this.fillHeadArray.bind(this);
    }

    fillHeadArray() {
        var array = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        for (var i = 0; i < array.length; i++) {
            this.state.trHead.push(<td className="day_ordinary">array[i]</td>);
        }
        return this.state.trHead;
    }


    render() {

        const REGISTERS =
            [{time: '08.00', name: 'John Doe'},
                {time: '10.00', name: 'Ann Doe'},
                {time: '08.00', name: 'John Doe'},
                {time: '10.00', name: 'Ann Doe'},
                {time: '08.00', name: 'John Doe'},
                {time: '10.00', name: 'Ann Doe'},
                {time: '08.00', name: 'John Doe'},
                {time: '10.00', name: 'Ann Doe'}
            ];
        var counter = 1;

        function fillWeekArray(arrayName) {
            arrayName = [];
            var j;
            for (j = 0; j < 5; j++) {
                arrayName.push(<td className="day_ordinary"><DayList registersMock={REGISTERS} counter={counter}/>
                </td>);
                counter += 1;
            }
            for (j = 5; j < 7; j++) {
                arrayName.push(<td className="day_weekend"><DayList registersMock={REGISTERS} counter={counter}/></td>);
                counter += 1;
            }
            return arrayName;
        }

        /*Calendar*/
        var i, j;
        var wholeWeekCount = Math.floor(this.props.month.daysInMonth / 7) + 1;


        for (i = 1; i <= wholeWeekCount; i++) {
            switch (i) {
                case 1:
                    if (this.props.month.monthStart !== -1) {
                        for (j = 0; j < this.props.month.monthStart; j++) {
                            (j < 5) ? this.props.weeksObject.firstWeekBeforeMonthStart.push(<td
                                className="day_ordinary">
                                -</td>) :
                                this.props.weeksObject.firstWeekBeforeMonthStart.push(<td className="day_weekend">
                                    -</td>);

                        }
                        for (j = this.props.month.monthStart; j < 7; j++) {
                            if (j < 5) {
                                this.props.weeksObject.firstWeekBeforeMonthStart.push(<td className="day_ordinary">
                                    <DayList registersMock={REGISTERS} counter={counter}/>
                                </td>);
                                counter++;
                            }
                            else {
                                this.props.weeksObject.firstWeekBeforeMonthStart.push(<td className="day_weekend">
                                    <DayList registersMock={REGISTERS} counter={counter}/>
                                </td>);
                                counter++;
                            }


                        }
                    }
                    else {
                        for (j = 0; j < 5; j++) {
                            this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_ordinary">-</td>);
                        }
                        this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_weekend">-</td>);
                        this.props.weeksObject.nullWeekBeforeMonthStart.push(<td className="day_weekend"><DayList
                            registersMock={REGISTERS} counter={counter}/>
                        </td>);
                        counter += 1;
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
                    if ((this.props.month.daysInMonth - counter) < 7) {
                        for (j = 0; j < (this.props.month.daysInMonth - counter); j++) {
                            if (j < 5) {
                                this.props.weeksObject.fifthWeekInMonth.push(<td className="day_ordinary">
                                    <DayList registersMock={REGISTERS} counter={counter}/>
                                </td>);
                                counter += 1;
                            }
                            else {
                                this.props.weeksObject.fifthWeekInMonth.push(<td className="day_weekend"><DayList
                                    registersMock={REGISTERS}
                                    counter={counter}/>
                                </td>);
                                counter += 1;
                            }
                        }
                        for (j = this.props.month.daysInMonth - counter; j < 7; j++) {
                            if (j < 5) {
                                this.props.weeksObject.fifthWeekInMonth.push(<td className="day_ordinary">-</td>)
                            }
                            else {
                                this.props.weeksObject.fifthWeekInMonth.push(<td className="day_weekend">-</td>);
                            }
                        }
                    }
                    else {
                        this.props.weeksObject.fifthWeekInMonth = fillWeekArray('fifthWeekInMonth');

                        for (j = 0; j <= this.props.month.daysInMonth - counter + 1; j++) {
                            if (j < 5) {
                                this.props.weeksObject.sixthWeekInMonth.push(<td className="day_ordinary">
                                    <DayList registersMock={REGISTERS} counter={counter}/>
                                </td>);
                                counter += 1;
                            }
                            else {
                                this.props.weeksObject.sixthWeekInMonth.push(<td className="day_weekend"><DayList
                                    registersMock={REGISTERS}
                                    counter={counter}/></td>);
                                counter += 1;
                            }
                        }

                        for (j; j < 7; j++) {
                            (j < 5) ? this.props.weeksObject.sixthWeekInMonth.push(<td className="day_ordinary">
                                -</td>) :
                                this.props.weeksObject.sixthWeekInMonth.push(<td className="day_weekend">-</td>);
                        }
                    }
                    break;
                default:
                    alert('Error');
                    break;
            }
        }

        return (
            <div>
                <Table responsive>
                    <thead class="month-header">
                    <tr>
                        {this.state.trHead.map(function (day) {
                            return <td class="month-header">{day}</td>;
                        })}
                    </tr>
                    </thead>
                    <tbody>

                    <tr>{this.props.weeksObject.firstWeekBeforeMonthStart.map(function (i) {
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
                        {this.props.weeksObject.fifthWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.props.weeksObject.sixthWeekInMonth.map(function (i) {
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