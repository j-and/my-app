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

var config = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_db"
};

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) throw err;//return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) throw err;//if (err) return reject(err);
                resolve();
            });
        });
    }
}

server.post('/addRegister', function (req, res) {
    const database = new Database(config);
    var client_id;
    database.query("SELECT * FROM my_db.clients WHERE name= " + mysql.escape(req.body.name))
        .then(function (result) {
            if (result.length != 0) {
                client_id = result[0].client_id;
            }
            return client_id;
        })
        .then(function (client_id) {
            if(!client_id){
                var valuesClient = [[req.body.name, null, req.body.datetime, null, null, null]];
                database.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [valuesClient])  
            }
        })
        .then(function (res) {
            return database.query("SELECT client_id FROM clients WHERE name= " + mysql.escape(req.body.name));
        })
        .then(function (rows) {
            client_id = rows[0].client_id;
            return client_id;
        })
        .then(function () {
            var valuesRegisters = [[req.body.datetime, req.body.name, 'busy', client_id]];
            database.query("INSERT INTO registers (dateTime, name, status,client_id) VALUES ?", [valuesRegisters]);
        })
        .then(function () {
            var valuesVisit = [[req.body.name, req.body.datetime, 'comment', 50, client_id]];
            database.query("INSERT INTO visits (name, datetime, comment, payment,client_id) VALUES ?", [valuesVisit]);
            return database.close();
        })
});

server.post('/addClient', function (req, res) {
    const database = new Database(config);
    var client_id;
    database.query("SELECT * FROM my_db.clients WHERE name= " + mysql.escape(req.body.name))
        .then(function (result) {
            if (result.length != 0) {
                client_id = result[0].client_id;
            }
            return client_id;
        })
        .then(function (client_id) {
            if(!client_id){
                var valuesClient = [[req.body.name, null, req.body.datetime, null, null, null]];
                database.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [valuesClient]);  
            }
        })
        .then(function (client_id) {
            return database.close();
        })
    res.send('Response from server');
});


server.post('/editClient', function (req, res) {
    // const database = new Database(config);
    // database.query("UPDATE my_db.clients SET desease = " + mysql.escape(req.body.desease) + ", birthdate=" + mysql.escape(req.body.birthdate) + ", phone=" + mysql.escape(req.body.phone) + ", email=" + mysql.escape(req.body.email) + ", description=" + mysql.escape(req.body.description) + " WHERE name = " + mysql.escape(req.body.name))
    //     .then(function () {
    //         return database.close();
    //     });
    // res.send('Response from server');

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
        var query = "UPDATE my_db.clients SET desease = " + mysql.escape(req.body.desease) + ", birthdate=" + mysql.escape(req.body.birthdate) + ", phone=" + mysql.escape(req.body.phone) + ", email=" + mysql.escape(req.body.email) + ", description=" + mysql.escape(req.body.description) + " WHERE name = " + mysql.escape(req.body.name);
        con.query(query, function (err, result) {
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
        con.query("DELETE FROM registers WHERE datetime=" + mysql.escape(req.body.datetime)+"AND name=" + mysql.escape(req.body.name),
            function (err, result) {
                if (err) throw err;
                con.query("SELECT * FROM registers", function (err, result) {
                    if (err) throw err;
                    res.send(result);
                });
            });
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
        con.query("SELECT * FROM visits WHERE name = " + mysql.escape(req.body.name), function (err, result) {
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