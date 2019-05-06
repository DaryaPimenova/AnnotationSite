import React from 'react';
import Menu from './Menu';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default class MainPage extends React.Component {

    render() {

        return (
            <div>
                <Menu />
                <Row className="justify-content-md-center">
                    <h1>Здесь должно быть описание нашего проекта</h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={5}>
                        <h2>Классификация</h2>
                        <div>Описание классификации</div>
                        <NavLink to="/classification" activeClassName="nav-link" className="nav-link">
                            Хочу помочь
                        </NavLink>
                    </Col>
                    <Col md={5}>
                        <h2>Детекция</h2>
                        <div>Описание детекции</div>
                        <NavLink to="/detection" activeClassName="nav-link" className="nav-link">
                            Хочу помочь
                        </NavLink>
                    </Col>
                </Row>
            </div>
        )
    }
}
