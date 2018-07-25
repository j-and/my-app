import fetch from 'node-fetch';
export const sendData = function (dataObject) {
    fetch('/', {
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