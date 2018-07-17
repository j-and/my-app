import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './index';
import template from '../template';

const server = express();

server.use('/assets', express.static('assets'));
console.log('is done');
server.get('/', (req, res) => {
    const appString = renderToString(<App />);

    res.send(template({
        body: appString,
        title: 'Hello World from the server'
    }));
});

server.listen(3000);
