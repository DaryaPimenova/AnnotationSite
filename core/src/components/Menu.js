import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from "../actions";


class Menu extends React.Component {

    render() {
        const { isAuthenticated, isSuperUser, logout } = this.props;

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
                {isAuthenticated 
                    ?
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/detection" activeClassName="nav-link" className="nav-link">
                                Детекция
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/classification" activeClassName="nav-link" className="nav-link">
                                Классификация
                            </NavLink>
                        </li>
                        {isSuperUser
                            ?
                            <li className="nav-item">
                                <NavLink to="/statistics" activeClassName="nav-link" className="nav-link">
                                    Статистика
                                </NavLink>
                            </li>
                            :
                            null
                        }
                        <li className="nav-item nav-link logout-link">
                            <a onClick={logout} >Выйти</a>
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

const mapStateToProps = state => {
    const { user } = state.auth;
    return {
        isAuthenticated: user,
        isSuperUser: user && user.is_superuser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
