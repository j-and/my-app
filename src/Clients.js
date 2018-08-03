import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ClientsCard from './ClientsCard.js';
import ClientsHistory from './ClientsHistory.js';

class Client extends Component {
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
                <div className="col-md-6"><ClientsCard></ClientsCard></div>
                <div className="col-md-5"><ClientsHistory></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;