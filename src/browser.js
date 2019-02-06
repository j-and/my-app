import React from 'react';
import {render} from 'react-dom';
import  {BrowserRouter}  from 'react-router-dom'
import App from './index.js';
import {addLocaleData, IntlProvider} from 'react-intl';

import messages_ru from "./translations/ru.json";
import messages_en from "./translations/en.json";

const messages = {
    'ru': messages_ru,
    'en': messages_en
};
const language = navigator.language.split(/[-_]/)[0];

render(
    <IntlProvider locale={language} messages={messages[language]}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </IntlProvider>,
    document.getElementById('root')
);