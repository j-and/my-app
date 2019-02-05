import React, {Component} from 'react';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import {sortByKey} from './methods.js';
import {sendClientData} from './methods.js';
import moment from 'moment';

class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitComment: 'comment'
        };
        this.changeComment = this.changeComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeComment() {
        // document.getElementsByClassName("visit_comment")[0].style.display = 'block';
        // event.target.style.display = 'none';
        // this.setState({visitComment: event.target.value});
    }


    handleInputChange(event) {
        // const target = event.target;
        // const value = target.value;
        // const name = target.name;
        // this.setState({
        //     [name]: value
        // });
    }

    handleSubmit(event) {
        // event.preventDefault();
        // document.getElementsByClassName("visit_label")[0].style.display = 'block';
        // this.refs.registerForm.reset();
        // event.target.style.display = 'none';
    }

    render() {
        var sortedArr = sortByKey(this.props.VISITS, 'datetime');
        return (
            <div>
                <h2> Clients history</h2>
                <label>Visits of {this.props.client.name}</label>
                <Table responsive>
                    <thead>
                    <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Is Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(sortedArr).map(function (key) {
                        return <tr>
                            <td>{moment(sortedArr[key].datetime).format('YYYY-MM-DD')}</td>
                            <td>{sortedArr[key].status}</td>
                            <td>{sortedArr[key].payment}</td>
                        </tr>
                    }) }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ClientsHistory;