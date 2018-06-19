import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class MonthTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trHead: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            monthStart: new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDay(),
            daysArray: [],
            firstWeekBeforeMonthStart: [],
            firstWeekAfterMonthStart: [],
            secondWeekInMonth: [],
            thirdWeekInMonth: [],
            forthWeekInMonth: [],
            fifthWeekInMonth: [],
            wholeWeekCount: 5//Math.floor(this.props.daysInmonth / 7)
        };
        //this.handleChange = this.handleChange.bind(this);

    }

    render() {
        /*Calendar*/
        var i, j;
        for (i = 0; i < this.state.wholeWeekCount; i++) {
            if (i = 1) {
                for (j = 0; j < this.state.monthStart; j++) {
                    if (j < 5) {
                        this.state.firstWeekBeforeMonthStart.push(<td className="ordinaryDay">0</td>);
                    }
                    else {
                        this.state.firstWeekBeforeMonthStart.push(<td className="weekendDay">0</td>);
                    }
                }

                for (j = this.state.monthStart ; j < 5; j++) {
                    this.state.firstWeekAfterMonthStart.push(<td className="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    this.state.firstWeekAfterMonthStart.push(<td className="weekendDay"><DayList/></td>);
                }

            }
            if (i = 2) {
                for (j = 0; j < 5; j++) {
                    this.state.secondWeekInMonth.push(<td className="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    this.state.secondWeekInMonth.push(<td className="weekendDay"><DayList/></td>);
                }
            }
            if (i = 3) {
                for (j = 0; j < 5; j++) {
                    this.state.thirdWeekInMonth.push(<td className="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    this.state.thirdWeekInMonth.push(<td className="weekendDay"><DayList/></td>);
                }
            }
            if (i = 4) {
                for (j = 0; j < 5; j++) {
                    this.state.forthWeekInMonth.push(<td className="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    this.state.forthWeekInMonth.push(<td className="weekendDay"><DayList/></td>);
                }
            }
            if (i = 5) {
                for (j = 0; j < 5; j++) {
                    this.state.fifthWeekInMonth.push(<td className="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    this.state.fifthWeekInMonth.push(<td className="weekendDay"><DayList/></td>);
                }
            }
        }

        return (
            <div>
                {this.props.daysInMonth}
                <h1>{(new Date().getMonth())}{(new Date().getDay())}</h1>
                <Table responsive>
                    <thead><tr>
                    <th>{this.state.trHead}</th></tr>
                    </thead>

                    <tbody>
                    <tr>{this.state.firstWeekBeforeMonthStart.map(function (i) {
                        return i;
                    })}
                        {this.state.firstWeekAfterMonthStart.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.state.secondWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.state.thirdWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.state.forthWeekInMonth.map(function (i) {
                            return i;
                        })}
                    </tr>
                    <tr>
                        {this.state.fifthWeekInMonth.map(function (i) {
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

// render() {
//     var i = 0, j = 0;
//     /*Thead*/
//     var daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     var trHead = [];
//     trHead.push(<tr></tr>);
//     for (var i = 0; i < daysOfWeek.length; i++) {
//         trHead.push(<td>{daysOfWeek[i]}</td>)
//     }
//
//     /*Month start*/
//     var monthStart = new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDay();
//
//     /*Calendar*/
//     var trArray = [];
//     var wholeWeekCount = Math.floor(this.props.daysInmonth / 7);
//     for (i = 0; i < wholeWeekCount; i++) {
//         var tr = [];
//         tr.push(<tr></tr>);
//         /*Fill the first string*/
//         if (i < 1) {
//             for (j = 0; j < monthStart - 1; j++) {
//                 if (j < 5) {
//                     tr.push(<td class="ordinaryDay">0</td>);
//                 }
//                 else {
//                     tr.push(<td class="weekendDay">0</td>);
//                 }
//             }
//
//             for (j = monthStart - 1; j < 5; j++) {
//                 tr.push(<td class="ordinaryDay"><DayList/></td>);
//             }
//             for (j = 5; j < 7; j++) {
//                 tr.push(<td class="weekendDay"><DayList/></td>);
//             }
//
//         }
//         else {
//             for (j = 0; j < 5; j++) {
//                 tr.push(<td class="ordinaryDay"><DayList/></td>);
//             }
//             for (j = 5; j < 7; j++) {
//                 tr.push(<td class="weekendDay"><DayList/></td>);
//             }
//         }
//
//         trArray.push(tr);
//     }
//
//     var tr = [];
//     tr.push(<tr></tr>);
//     for (i = 0; i < this.props.daysInmonth - wholeWeekCount * 7; i++) {
//         if (i < 5) {
//             tr.push(<td class="ordinaryDay"><DayList /></td>);
//         }
//         else {
//             tr.push(<td class="weekendDay"><DayList /></td>);
//         }
//
//     }
//     trArray.push(tr);
//
//     return (
//         <div>
//             <h1>{(new Date().getMonth())}{(new Date().getDay())}</h1>
//             <Table responsive>
//                 <thead>{trHead}</thead>
//                 <tbody>{trArray}</tbody>
//
//             </Table>
//         </div>
//     );
// }