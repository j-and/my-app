import React from 'react';
import {renderToString} from 'react-dom/server';
import {ReactDOMServe} from 'react-dom/server';
import  {StaticRouter}  from 'react-router'
import App from './index.js';
import template from '../template';

var bodyParser = require('body-parser');

const express = require('express');
const server = express();
var mysql = require('mysql');

server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
    const context = {};
    const appString = renderToString(<StaticRouter location={req.url} context={context}><App /></StaticRouter>);

    res.send(template({
        body: appString,
        title: 'My-app'
    }));
});
server.get('/clients', (req, res) => {
    const context = {};
    const appString = renderToString(<StaticRouter location={req.url} context={context}><App /></StaticRouter>);

    res.send(template({
        body: appString,
        title: 'My-app'
    }));
});

server.post('/addRegister', function (req, res) {
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

        var values = [[req.body.id, req.body.year, req.body.month, req.body.day, req.body.time, req.body.name, req.body.status]];
        con.query("INSERT INTO registers (id, year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
            if (err) throw err;
        });
    });
    res.send('Response from server');
});

server.post('/addClient', function (req, res) {
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

        var values = [[req.body.clientName, req.body.clientDesease, req.body.clientBirthDate, req.body.clientPhone, req.body.clientEmail, req.body.clientDescription]];
        con.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [values], function (err, result) {
            if (err) throw err;
        });
    });
    res.send('Response from server');
});

server.get('/clearRegistersDB', function (req, res) {
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

        var values = [[req.body.id, req.body.year, req.body.month, req.body.day, req.body.time, req.body.name, req.body.status]];

        con.query("DELETE FROM `my_db`.`registers` ", function (err, result) {
            if (err) throw err;
        });
    });
    res.send('Response from server');
});

server.post('/removeRegister', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query("DELETE FROM `my_db`.`registers` WHERE `id`=" + mysql.escape(req.body.id),
            function (err, result) {
                if (err) throw err;
                con.query("SELECT * FROM registers", function (err, result) {
                    if (err) throw err;
                    res.send(result);
                });
            });
    });
});

server.get('/setMockRegistersData', function (req, res) {

    var values = [
        ['id1', '2018', '7', '2', '08.00', 'John Doe', 'busy'],
        ['id2', '2018', '7', '3', '09.00', 'John Doe', 'busy'],
        ['id3', '2018', '7', '4', '10.00', 'John Doe', 'busy'],
        ['id4', '2018', '7', '5', '11.00', 'John Doe', 'busy'],
        ['id5', '2018', '7', '6', '12.00', 'John Doe', 'busy'],
        ['id6', '2018', '7', '7', '13.00', 'John Doe', 'busy'],
        ['id7', '2018', '7', '8', '14.00', 'John Doe', 'busy']
    ];

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });

    con.query("INSERT INTO registers (id,year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
        if (err) throw err;
    });
});

server.get('/getRegisters', function (req, res) {
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

server.post('/getVisits', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM visits WHERE clientName = " + mysql.escape(req.body.clientName), function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

});

server.listen(3000);
