import 'app.less';
import 'jquery';
import "bootstrap/dist/css/bootstrap.css"
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';


export const store = configureStore();


ReactDOM.render(<App />, document.getElementById('root'));