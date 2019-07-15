import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Help from './Help';
import MyClassification from "./MyClassification";


export default class Detection extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/classification" component={MyClassification} />
                    <Route exact path="/classification/help" component={Help} />
                </Switch>
            </div>
        )
    }
}
