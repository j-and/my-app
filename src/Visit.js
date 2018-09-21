import React, {Component} from 'react';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FieldGroup from 'react-bootstrap/lib/FormControl';
import {sendClientData} from './methods.js';

class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitComment: 'comment'
        }
        this.changeComment = this.changeComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeComment(event) {
        document.getElementsByClassName("visit_comment")[0].style.display = 'block';
        event.target.style.display = 'none';
        this.setState({visitComment: event.target.value});
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        document.getElementsByClassName("visit_label")[0].style.display = 'block';
        this.refs.registerForm.reset();
        event.target.style.display = 'none';
    }


    render() {
var time=new Date(this.props.clientInfo.datetime);
        time=time.toDateString();
        return (
            <div>
                <ListGroupItem>
                    <span>{time}</span>
                    <span onClick={this.changeComment} className="visit_label">{this.props.clientInfo.comment}</span>
                    <span className="visit_label">{this.props.clientInfo.status}</span>
                    <span>
                        <form className="visit_comment" onSubmit={this.handleSubmit} ref="registerForm">
                            <input type="text" value={this.state.value} onChange={this.handleInputChange}
                                   name="visitComment"/>
                            <Button bsSize="xsmall" bsStyle="success" type="submit" value="Add">
                                <Glyphicon glyph="plus"/>
                            </Button>
                        </form>
                    </span>
                    <input type="checkbox"/>
                </ListGroupItem>
            </div>
        );
    }
}

export default Visit;


