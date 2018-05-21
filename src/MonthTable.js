import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class MonthTable extends Component {
    render() {
        var i = 0, j = 0;
        /*Thead*/
        var daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var trHead = [];
        trHead.push(<tr></tr>);
        for (var i = 0; i < daysOfWeek.length; i++) {
            trHead.push(<td>{daysOfWeek[i]}</td>)
        }

        /*Month start*/
        var monthStart = new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDay();
        // alert('monthStart='+monthStart);

        /*Calendar*/
        var trArray = [];
        var wholeWeekCount = Math.floor(this.props.daysInmonth / 7);
        for (i = 0; i < wholeWeekCount; i++) {
            var tr = [];
            tr.push(<tr></tr>);
            /*Fill the first string*/
            if (i < 1) {
                for (j = 0; j < monthStart - 1; j++) {
                    if (j < 5) {
                        tr.push(<td class="ordinaryDay">0</td>);
                    }
                    else {
                        tr.push(<td class="weekendDay">0</td>);
                    }
                }

                for (j = monthStart - 1; j < 5; j++) {
                    tr.push(<td class="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    tr.push(<td class="weekendDay"><DayList/></td>);
                }


            }
            else {
                for (j = 0; j < 5; j++) {
                    tr.push(<td class="ordinaryDay"><DayList/></td>);
                }
                for (j = 5; j < 7; j++) {
                    tr.push(<td class="weekendDay"><DayList/></td>);
                }
            }

            trArray.push(tr);
        }

        var tr = [];
        tr.push(<tr></tr>);
        for (i = 0; i < this.props.daysInmonth - wholeWeekCount * 7; i++) {
            if (i < 5) {
                tr.push(<td class="ordinaryDay"><DayList /></td>);
            }
            else {
                tr.push(<td class="weekendDay"><DayList /></td>);
            }

        }
        trArray.push(tr);

        return (
            <div>
                <h1>{(new Date().getMonth())}{(new Date().getDay())}</h1>
                <Table responsive>
                    <thead>{trHead}</thead>
                    <tbody>{trArray}</tbody>

                </Table>
            </div>
        );
    }
}

export default MonthTable;
