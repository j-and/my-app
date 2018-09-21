import fetch from 'node-fetch';
export const sendData = function (dataObject) {
    fetch('/addRegister', {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
    }, function (error) {
        console.log('error= ' + error);
    })
};
export const sendClientData = function (dataObject) {
    fetch('/addClient', {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
    }, function (error) {
        console.log('error= ' + error);
    })
};

export const dateToTimestamp = function (dateString) {
    var date = new Date(dateString);
    var utc = date.getTime() + (-date.getTimezoneOffset() * 60000);
    var datetime = (new Date(utc)).toISOString();
    datetime = datetime.slice(0, 10) + ' ' + datetime.slice(11, datetime.length);
    datetime = datetime.slice(0, datetime.length - 2);
    return datetime;
}