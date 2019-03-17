import 'app.less';
import "jquery"
import React from 'react';
import {Base} from 'components';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {HashRouter} from 'react-router-dom';
import configureStore from './configureStore';


export const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Route path='/' component={Base} />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
