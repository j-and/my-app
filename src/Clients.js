import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
                <h2> Clients card</h2>
                <form onSubmit={this.handleSubmit} ref="registerForm" className="">
                    <label>Name</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <label>Desease</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <label>Date of Birth</label>
                    <input type="date" value={this.state.value} onChange={this.handleChange}/>
                    <label>Phone</label>
                    <input type="number" value={this.state.value} onChange={this.handleChange}/>
                    <label>Email</label>
                    <input type="email" value={this.state.value} onChange={this.handleChange}/>
                    <label>Description</label>
                    <textarea type="text" value={this.state.value} onChange={this.handleChange}/>
                    <label>Comments</label>
                    <textarea type="text" value={this.state.value} onChange={this.handleChange}/>
                    <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add"><Glyphicon
                        glyph="plus"/></Button>
                </form>
            </div>
        );
    }
}

export default Client;