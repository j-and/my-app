import React, {Component} from 'react';
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
                <div className="col-sm-8"><ClientsCard></ClientsCard></div>
                <div className="col-sm-4"><ClientsHistory></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;