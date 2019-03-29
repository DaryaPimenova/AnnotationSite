import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Menu extends React.Component {

    render() {
        return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light">
                <button className="navbar-toggler"
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                {this.props.isAuthenticated ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-link logout-link">
                            <a onClick={this.props.logout} >Выйти</a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/login" activeClassName="nav-link" className="nav-link">
                                Войти
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/register" activeClassName="nav-link" className="nav-link">
                                Зарегистрироваться
                            </NavLink>
                        </li>
                    </ul>
                }
                </div>
            </nav>
        </div>
        )
    }
}
