import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Register from './Register.js';

class DayList extends Component {
  render() {
    return (
        <div>
          <ListGroup>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
            <ListGroupItem><Register /></ListGroupItem>
          </ListGroup>
      </div>
    );
  }
}

export default DayList;
