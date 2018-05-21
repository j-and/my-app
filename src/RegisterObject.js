import React, {Component} from 'react';

export default class RegisterObject {
    constructor(first, last, date, time) {
        this.name = {
            'first': first,
            'last': last
        };
        this.date = date;
        this.time = time;

        this.fullName = function () {
            alert(this.name.first + ' ' + this.name.last);
        };
    }

    setTime(time) {
        alert('setTime' + time);
        this.time = time;
    };

    setFullName(name) {
        alert('name= ' + name);
        this.name = name;
    };
}