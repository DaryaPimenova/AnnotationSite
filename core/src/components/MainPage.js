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
                            <b>Idea-mining</b> - система добровольной разметки картин для решения задач искусственного интеллекта. 
                            Вы выделяете объекты на изображении и подписываете их. Это лёгкий способ релаксации с одной 
                            стороны и поддержки научных исследований с другой. Сейчас мы решаем две задачи: классификацию 
                            и детекцию изображений. Вы можете участвовать в любой из них. Чем быстрее мы соберём данные для 
                            каждой из них, тем раньше здесь появятся новые задачи для вас. Внутри каждой задачи есть 
                            краткая инструкция на всякий случай.
                        </p>
                    </Col>  
                </Row>
                <Row className="justify-content-md-center  main-page-row">
                    <Col md={9}>
                        <h2 className='main-page-header'>Классификация</h2>
                        <img id="image-classificaion" src="media/main_page/classification.png" />
                        <div id="short-classification-desc">
                            Вы называете объект, который видите на изображении, можете подписать также, с чем он у вас 
                            ассоциируется. Например, вы видите молодое дерево, которое, на ваш взгляд, связано с 
                            юностью или старое дерево, поросшее побегами, которое связано с зарождением новой жизни. 
                            Если такой ассоциации нет - не страшно, для нас это тоже информация.
                        </div>
                        <NavLink to="/classification" activeClassName="nav-link" className="nav-link">
                            Присоединиться к классификации
                        </NavLink>
                    </Col>
                </Row>
                <Row className="justify-content-md-center  main-page-row">
                    <Col md={9}>
                        <h2 className='main-page-header'>Детекция</h2>
                        <img id="image-detection" src="media/main_page/detection.png" />
                        <div>
                            Вы выбираете объект на картине с помощью прямоугольника, затем подписываете его называние. 
                            Если вас кажется, что объект имеет какое-то дополнительное значение - вы пишите под 
                            названием, что это за значение. Например, женщина с весами в руках может ассоциироваться 
                            с Фемидой, а голубь в небе - с символом мира. Если такой ассоциации нет - не страшно, 
                            для нас это тоже информация.
                        </div>
                        <NavLink to="/detection" activeClassName="nav-link" className="nav-link">
                            Присоединиться к детекции
                        </NavLink>
                    </Col>
                </Row>
                <Row className="justify-content-md-center  main-page-row">
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
