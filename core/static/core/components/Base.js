import React from 'react';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';


export default class Base extends React.Component {

    render() {
        return (
        <div>
            <Router basename="/">
                <div className="app">
                    <div className="app-form">
                        <div className="page-switcher">
                            <NavLink to="/sign-in" activeClassName="page-switcher-item-active" className="page-switcher-item">
                                Войти
                            </NavLink>
                            <NavLink exact to="/" activeClassName="page-switcher-item-active" className="page-switcher-item">
                                Зарегистрироваться
                            </NavLink>
                        </div>

                        <Route exact path="/" component={SignUpForm} />
                        <Route path="/sign-in" component={SignInForm} />
                    </div>
                </div>
            </Router>
        </div>
        )
    }
}
