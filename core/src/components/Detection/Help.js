import React from 'react';
import Menu from '../Menu';
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';


export default class Help extends React.Component {

    render() {
        return (
            <div>
                <Menu />
                <div>Помощь в детекции</div>

                <NavLink to="/detection" activeClassName="btn btn-primary" className="btn btn-primary">
                    Понятно
                </NavLink>
            </div>
        )
    }
}
