import React, {Component} from 'react';

import DayList from './DayList.js';

import Table from 'react-bootstrap/lib/Table';

class FruitForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            registers: {}
        };
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.counter = 1;
    }

    add() {
        return this.counter += 1;
    }

    handleChange(event) {
        this.state.registers['register-' + this.counter] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addRegister(this.state.registers);
        this.refs.registerForm.reset();
        this.add();
    }

    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit} ref="registerForm">


                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        )
    }
}

export default FruitForm;
