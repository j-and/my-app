import React, { Component } from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';



class MonthTable extends Component {
  render() {
    return (
        <div>
          <Table responsive>
            <thead>

            </thead>
            <tbody>
            <tr>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
            </tr>
            <tr>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
            </tr>
            <tr>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
            </tr>
            <tr>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>
            </tr>
            <tr>
              <td><DayList /></td>
              <td><DayList /></td>
              <td><DayList /></td>

            </tr>

            </tbody>
          </Table>
      </div>
    );
  }
}

export default MonthTable;
