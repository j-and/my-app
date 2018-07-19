import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './index';
import template from '../template';


var bodyParser = require('body-parser');

const express = require('express');
const server = express();

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

var mysql = require('mysql');
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


server.listen(3000);
