import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './index';
import template from '../template';


var bodyParser = require('body-parser');

const express = require('express');
const server = express();
var mysql = require('mysql');

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

server.use('/assets', express.static('assets'));
server.get('/', (req, res) => {
    const appString = renderToString(<App />);
    res.send(template({
        body: appString,
        title: 'My-app'
    }));
});


server.post('/', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });

    con.connect(function (err) {
        if (err) {
            throw err;
        }

        var values = [[req.body.year, req.body.month, req.body.day, req.body.time, req.body.name, req.body.status]];
        con.query("INSERT INTO registers (year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });
    res.send('Response from server');
});

// server.post('/setMockData', function (req, res) {
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "my_db"
//     });
//
//         var values=[ {year: '2017', month: '07', day: '2', time: '08.00', name: 'John Doe', status: 'available'},
//             {year: '2017', month: '07', day: '2', time: '09.00', name: 'Ann Doe', status: 'busy'},
//             {year: '2017', month: '07', day: '2', time: '10.00', name: 'John Doe', status: 'available'},
//             {year: '2017', month: '07', day: '5', time: '10.00', name: 'Ann Doe', status: 'busy'},
//             {year: '2017', month: '07', day: '5', time: '12.00', name: 'John Doe', status: 'available'},
//             {year: '2017', month: '07', day: '5', time: '13.00', name: 'Ann Doe', status: 'available'},
//             {year: '2017', month: '07', day: '6', time: '12.00', name: 'John Doe', status: 'available'},
//             {year: '2017', month: '07', day: '6', time: '13.00', name: 'Ann Doe', status: 'available'},
//             {year: '2017', month: '07', day: '6', time: '14.00', name: 'John Doe', status: 'available'},
//             {year: '2017', month: '07', day: '6', time: '15.00', name: 'Ann Doe', status: 'available'}];
//         con.query("INSERT INTO registers (year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
//             if (err) throw err;
//             console.log("Mock data is set");
//         });
//     });

server.get('/getRegisters', function (req, res) {
    console.log("GET From SERVER");
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM registers", function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

});

server.listen(3000);
