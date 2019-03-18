import React from 'react';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';


export default class Base extends React.Component {

    render() {
        return (
        <div>
            <nav class="navbar navbar-dark bg-dark navbar-expand-lg navbar-light">
                <button class="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <NavLink to="/sign-in" activeClassName="nav-link" className="nav-link">
                                Войти
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink exact to="/" activeClassName="nav-link" className="nav-link">
                                Зарегистрироваться
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <Router basename="/">
                <div className="app">
                    <div className="app-form">
                        <Route exact path="/" component={SignUpForm} />
                        <Route path="/sign-in" component={SignInForm} />
                    </div>
                </div>
            </Router>
        </div>
        )
    }
}
