export const sendData = function(dataObject) {
    var request = new XMLHttpRequest();
    // request.onreadystatechange = (e) => {
    //     //alert(request.readyState);
    //     // if (request.readyState !== 4) {
    //     //     return;
    //     // }
    //
    //     if (request.status === 200) {
    //         console.log('success');//, request.responseText);
    //     } else {
    //         console.warn('error');
    //     }
    // };

    request.open('POST', 'http://localhost:3000');
    request.send(dataObject);
};