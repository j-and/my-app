import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Table from 'react-bootstrap/lib/Table';


class ClientsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isOpen: '',//true,
        }
        // this.toggleModal = this.toggleModal.bind(this);
    }

    // toggleModal() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    render() {

        return (
            <div>
                <h2> Clients history</h2>
                <label>Visits</label>
                <Table striped bordered condensed hover className="client_history">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Comment</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>01.07.2018</td>
                        <td><input type="text"/></td>
                        <td><input type="checkbox"/></td>
                    </tr>
                    <tr>
                        <td>01.07.2018</td>
                        <td><input type="text"/></td>
                        <td><input type="checkbox"/></td>
                    </tr>
                    <tr>
                        <td>01.07.2018</td>
                        <td><input type="text"/></td>
                        <td><input type="checkbox"/></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ClientsHistory;