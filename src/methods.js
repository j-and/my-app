import React, {Component} from 'react';

export const sendData = function(dataObject) {
    var request = new XMLHttpRequest();
    request.open('POST', '/my/url', true);
    //alert (Object.values(dataObject));
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(dataObject);
};