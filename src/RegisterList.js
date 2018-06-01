import React, {Component} from 'react';
import './App.css';


import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class RegisterList extends Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
    }

    render () {
    return (
        <div >
            <ul >
                {
                    Object.keys(this.props.registers).map(function(key) {
                        return <li >{this.props.registers[key]}</li>
                    }.bind(this))
                }
            </ul>
        </div>
    );
}

    // render() {
    //     return (
    //         <div>
    //             <div>
    //                 <ListGroup>
    //                     <ListGroupItem>{this.props.time} {this.props.value}
    //                         <Button bsSize="xsmall" bsStyle="danger" className="btn-close" onClick={this.clear}>
    //                             <Glyphicon
    //                                 glyph="remove"/>
    //                         </Button>
    //                     </ListGroupItem>
    //                 </ListGroup>
    //             </div>
    //         </div>
    //     );
    // }


}

export default RegisterList;
