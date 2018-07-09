import React, {Component} from 'react';

class RegisterObject extends Component {

    constructor(props) {
        super(props);
        this.date = props.date;
        this.time = props.time;
        this.name = props.name;
    }

    setDate(date) {
        alert('setDate' + date);
        this.date = date;
    };

    setTime(time) {
        alert('setTime' + time);
        this.time = time;
    };

    setName(name) {
        alert('name= ' + name);
        this.name = name;
    };
}

export default RegisterObject;