import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FieldGroup from 'react-bootstrap/lib/FormControl';

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

                <form>
                    <label>Name</label>
                    <FieldGroup type="text" label="Name" placeholder="Enter text"/>
                    <div className="col-xs-6 client_col_left">
                        <label>Desease</label>
                        <FieldGroup type="text" label="Desease" placeholder="Enter text"/>
                        <label>Date of birth</label>
                        <FieldGroup type="date" label="Date of birth" placeholder="Enter text"/>
                    </div>
                    <div className="col-xs-6 client_col_right">
                        <label>Phone</label>       
                        <FieldGroup type="phone" label="Phone" placeholder="Enter phone"/>
                        <label>Email</label>
                        <FieldGroup type="email" label="Email address" placeholder="Enter email"/>
                    </div>
                        <label>Description</label>
                        <FieldGroup componentClass="textarea" placeholder="textarea" rows="15" />
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add">
                        <Glyphicon glyph="plus"/>Save changes
                    </Button>
                </form>
            </div>
        );
    }
}

export default ClientsCard;