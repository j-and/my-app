import React, {Component} from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';


class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CLIENTS: []
        }
    }

    componentDidMount() {
        fetch('/getClients', {
            method: 'GET'
        }).then((response) => {
            response.json().then((data) => {
                console.log('data= '+data.length);
                this.setState({CLIENTS: data});
            })
        });
    }

    render() {
        var switchClient = this.props.switchClient;
        var sortedArr = this.state.CLIENTS;
console.log('sortedArray='+sortedArr.length);
        var listItems = sortedArr.map((client) =>
       
            <li><a onClick={() => { switchClient(client.name)}}>{client.name}</a></li>
        );
        return (
            <div>
                <h2> Clients list</h2>
            <ul className='clients_list'>
                {listItems}
            </ul>
               
            </div>
           
        );

    }
}

export default ClientsList;

