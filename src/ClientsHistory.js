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
                <Table responsive>
                    <tr><td>aa</td></tr>
                    <tr><td>aa</td></tr>
                    <tr><td>aa</td></tr>
                </Table>
            </div>
        );
    }
}

export default ClientsHistory;