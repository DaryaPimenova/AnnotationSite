import React from 'react';
import Menu from '../Menu';
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';


export default class Help extends React.Component {

    render() {
        return (
            <div>
                <Menu />
                <div>Помощь в клаccификации</div>
                <div>

                </div>
                <NavLink to="/classification" activeClassName="btn btn-primary" className="btn btn-primary">
                    Понятно
                </NavLink>
            </div>
        )
    }
}
