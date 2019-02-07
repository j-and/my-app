import React from 'react';
import {ReactDOM,render, hydrate} from 'react-dom';
import  {BrowserRouter}  from 'react-router-dom'
import App from './index.js';
import {addLocaleData, IntlProvider} from 'react-intl';

import messages_ru from "./translations/ru.json";
import messages_en from "./translations/en.json";

const messages = {
    'ru': messages_ru,
    'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];//'ru';

hydrate(
    <IntlProvider locale={language} messages={messages[language]}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </IntlProvider>,
    document.getElementById('root')
);