import React, {Component} from 'react';

export const sendData = function(data) {
    var request = new XMLHttpRequest();
    request.open('POST', '/my/url', true);
    alert(data.name);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(data);
};