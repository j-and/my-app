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