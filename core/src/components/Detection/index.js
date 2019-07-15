import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Help from './Help';
import Detect from "./Detect";


export default class Detection extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/detection" component={Detect} />
                    <Route exact path="/detection/help" component={Help} />
                </Switch>
            </div>
        )
    }
}
