import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class MonthTable extends Component {
    render() {

        /*Thead*/
        var daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        var trHead = [];
        trHead.push(<tr></tr>);
        for (var i = 0; i < daysOfWeek.length; i++) {
            trHead.push(<td>{daysOfWeek[i]}</td>)
        }

        /*Calendar*/
        var trArray = [];
        var wholeWeekCount = Math.floor(this.props.daysInmonth / 7);
        for (var i = 0; i < wholeWeekCount; i++) {
            var tr = [];
            tr.push(<tr></tr>);
            for (var j = 0; j < 7; j++) {
                tr.push(<td><DayList /></td>);
            }
            trArray.push(tr);
        }

        var tr = [];
        tr.push(<tr></tr>);
        for (var i = 0; i < this.props.daysInmonth - wholeWeekCount * 7; i++) {
            tr.push(<td><DayList /></td>);
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
