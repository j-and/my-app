import React, {Component} from 'react';
import './App.css';

class RegisterList extends Component {

    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear(e) {
        e.preventDefault();
        alert('Delete registerObject');
    }

    render() {
        return (
            <div >
                <ul >
                    {
                        Object.keys(this.props.registers).map(function (key) {
                            return <li>{this.props.registers[key]}</li>
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }

}

export default RegisterList;
