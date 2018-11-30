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
        var values = [[req.body.datetime, req.body.name, 'busy']];
        var valuesClient = [[ req.body.name, 'desease', null, 'phone', 'email', 'description']];
        con.query("INSERT INTO registers (dateTime, name, status) VALUES ?", [values], function (err, result) {
            if (err) throw err;
        });
        con.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [valuesClient], function (err, result) {
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

        var values = [[req.body.name, req.body.desease, req.body.birthdate, req.body.phone, req.body.email, req.body.description]];
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

        var values = [[req.body.datetime, req.body.name, req.body.status]];

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
        con.query("DELETE FROM `my_db`.`registers` WHERE `datetime`=" + mysql.escape(req.body.datetime),
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
        ['2018-08-02 08.00', 'John Doe', 'busy'],
        ['2018-08-02 09.00', 'John Doe', 'busy'],
        ['2018-08-06 10.00', 'John Doe', 'busy'],
        ['2018-08-06 11.00', 'John Doe', 'busy'],
        ['2018-08-06 12.00', 'John Doe', 'busy'],
        ['2018-08-07 13.00', 'John Doe', 'busy'],
        ['2018-08-07 14.00', 'John Doe', 'busy']
    ];

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });

    con.query("INSERT INTO registers (dateTime, name, status) VALUES ?", [values], function (err, result) {
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
        con.query("SELECT * FROM visits WHERE name = " + mysql.escape(req.body.clientName), function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

});

server.get('/getClients', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM clients", function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

});

server.post('/switchClient', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "my_db"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM `my_db`.`clients` WHERE `name`=" + mysql.escape(req.body.name),
            function (err, result) {
                if (err) throw err;
                    res.send(result);
            });
    });
});

server.listen(3000);
