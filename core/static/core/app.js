import 'app.less'
import React from 'react';
import {Base} from 'components';
import ReactDOM from 'react-dom'
import {Route} from 'react-router'
import {HashRouter} from 'react-router-dom'


ReactDOM.render(
    <HashRouter>
        <Route path='/' component={Base} />
    </HashRouter>,
    document.getElementById('app')
);
