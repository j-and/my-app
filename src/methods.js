export const sendData = function (dataObject) {
    fetch('/', {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }).then(function (response) {
    }, function (error) {
        console.log('error= ' + error);
    })
};