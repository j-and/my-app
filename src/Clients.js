import React, {Component} from 'react';
import ClientsCard from './ClientsCard.js';
import ClientsHistory from './ClientsHistory.js';
import ClientsList from './ClientsList.js';

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: {}
        }
        // this.toggleModal = this.toggleModal.bind(this);
        this.switchClient = this.switchClient.bind(this);
    }

    // toggleModal() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    switchClient(clientName) {
        console.log('switchClient');
        // var datetime = dateToTimestamp(register.datetime);
        var client = {
            name: clientName,
        //     name: register.name,
        //     status: 'available'
        };
        fetch('/switchClient', {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (response) => {
                response.json().then((data) => {
                    console.log('data='+data);
                    this.setState({client: data});
                    //this.setState({registers: []});
                })
        
            }
        );
    }

    render() {
        return (
            <div>
                <div className="col-sm-3"><ClientsList  switchClient={this.switchClient}/></div>
                <div className="col-sm-6"><ClientsCard client={this.state.client}></ClientsCard></div>
                <div className="col-sm-3"><ClientsHistory></ClientsHistory></div>
            </div>
        );
    }
}

export default Client;
// <div className="col-sm-8"><ClientsCard></ClientsCard></div>
// <div className="col-sm-4"><ClientsHistory></ClientsHistory></div>