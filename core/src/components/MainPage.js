import React from 'react';
import Menu from './Menu';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export default class MainPage extends React.Component {

    render() {

        return (
            <div>
                <Menu />
                <Row className="justify-content-md-center main-page-row">
                    <Col md={9}>
                        <p id='main-description'>
                            <b style={{ fontSize: '24px' }}>IdeaMining</b> - система добровольной разметки картин для 
                            решения задач искусственного интеллекта. Вы выделяете объекты на изображении и подписываете 
                            их. Это лёгкий способ релаксации с одной стороны и поддержки научных исследований с другой. 
                            Сейчас мы решаем две задачи: классификацию и детекцию изображений. Вы можете участвовать 
                            в любой из них. Чем быстрее мы соберём данные для каждой из них, тем раньше здесь появятся 
                            новые задачи для вас. Внутри каждой задачи есть краткая инструкция на всякий случай.
                        </p>
                    </Col>  
                </Row>
                <Row className="justify-content-md-center main-page-row">
                    <Col md={9}>
                        <div className="left">
                            <img id="image-classificaion" src="media/main_page/classification.png" />
                        </div>
                        <div className="right">
                            <h2 className='main-page-header'>Классификация</h2>
                            <div className="short-description">
                                Вы указываете, что за объект Вы видети на картине, выбрав соответстующий класс. 
                                Также, Вы можете указать технику и стиль, в котором выполнена картина. 
                            </div>
                            <NavLink to="/classification" activeClassName="nav-link" className="nav-link">
                                Присоединиться к классификации
                            </NavLink>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center  main-page-row">
                    <Col md={9}>
                        <div className="left">
                            <h2 className='main-page-header'>Детекция</h2>
                            <div className="short-description">
                                Вы выбираете объект на картине с помощью прямоугольника, затем указываете к какому 
                                классу он относится. Если Вы считаете, что на картине несколько объектов, то можете 
                                сразу все их отметить.
                            </div>
                            <NavLink to="/detection" activeClassName="nav-link" className="nav-link">
                                Присоединиться к детекции
                            </NavLink>
                        </div>
                        <div className="right">
                            <img id="image-detection" src="media/main_page/detection.png" />
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center  main-page-row" style={{ marginBottom: '100px' }}>
                    <Col md={9}>
                        <h2 className='main-page-header'>Исследование преследует три цели:</h2>
                        <ol className='goals'>
                            <li>
                                Искусствоведческая: начиная от автоматической классификации и аннотирования картин, 
                                заканчивая поиском новых смыслов и философий
                            </li>
                            <li>
                                Когнитивная: начиная от способа восприятия формы и цвета и заканчивая выявлением 
                                закономерностей влияния искусства на нас
                            </li>
                            <li>
                                Инновационная: начиная от создания открытых образовательных продуктов по искусству и 
                                заканчивая переходом на новый уровень абстракций для искусственного интеллекта
                            </li>
                        </ol>
                    </Col>
                </Row>
            </div>
        )
    }
}
