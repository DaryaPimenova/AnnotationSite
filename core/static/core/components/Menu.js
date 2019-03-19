import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Menu extends React.Component {

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
                            <NavLink to="/login" activeClassName="nav-link" className="nav-link">
                                Войти
                            </NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink exact to="/signup" activeClassName="nav-link" className="nav-link">
                                Зарегистрироваться
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}
