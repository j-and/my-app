import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class ClientsCard extends Component {
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
                <h2> Clients card</h2>
                <form class="">
                    <div>
                        <label>Name</label>
                        <input type="text"/>
                    </div>
                    <div className="client_col">
                        <label>Desease</label>
                        <input type="text"/>
                            <label>Date of Birth</label>
                            <input type="date"/>
                    </div>
                    <div className="client_col">
                        <label>Phone</label>
                        <input type="phone"/>
                            <label>Email</label>
                            <input type="email"/>
                    </div>
                    <div>
                        <label>Description</label>
                        <div>
                            <textarea rows="20" cols="47">uu</textarea>
                        </div>
                    </div>
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add">
                        <Glyphicon glyph="plus"/>Save changes</Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;