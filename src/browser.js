import React from 'react';
import {ReactDOM, render, hydrate} from 'react-dom';
import  {BrowserRouter}  from 'react-router-dom'
import App from './index.js';

hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);