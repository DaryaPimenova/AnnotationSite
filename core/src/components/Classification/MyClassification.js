import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu';
import {getStyleOptions, getTechniqueOptions} from 'utils';
import { Form, Row, Col, Radio, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import AsyncSelect from 'react-select/lib/Async';
import {annotation, auth} from "../../actions";


class MyClassification extends React.Component {

    state = {
        style: null,
        technique: null,
        image_class: null,
    }

    componentWillMount() {
        if (!this.props.image_for_classification_url) {
            this.props.loadImage(true);
        }
    }

    onLoadNextImage = (event) => {
        event.preventDefault();
        this.setState({style: null, technique: null, image_class: null});
        this.props.loadImage(true);
    }

    onSaveClassification = (event) => {
        event.preventDefault();
        let { style, technique, image_class } = this.state;

        if (!image_class || !style) {
            alert('Заполните поля "Класс" и "Стиль"')
        } else {
            this.setState({style: null, technique: null, image_class: null});
            this.props.saveClassification(
                this.props.image_for_classification, 
                style.value, 
                technique.value, 
                image_class
            );
        }
    }

    onDeleteImage = () => {
        let is_delete = confirm('Вы уверены, что хотите удалить эту картинку?');
        if (is_delete) {
            this.props.deleteImage(this.props.image_for_classification, true)
        }
    }

    render() {
        const { image_for_classification_url, classes, user } = this.props;

        return (
            <div>
                <Menu />
                <Row className="justify-content-md-center">
                    <Col md={5}>
                        <div className='image-for-classification'>
                            <img style={{witdh: '90%'}} src={image_for_classification_url} />
                        </div>
                    </Col>
                    <Col md={4}>
                        <form className='classification-form' onSubmit={::this.onSaveClassification}>
                        <h2>Классификация</h2>
                        <p style={{ fontSize: '14px' }}>
                            Укажите, что Вы видете на картине, а также стиль и технику. 
                            Если ничего не подходит, нажмите кнопку "Пропустить"
                        </p>
                        <div className="form-group row">
                            <label htmlFor='classification-style' className="col-sm-3 col-form-label">
                                Стиль
                            </label>
                            <AsyncSelect
                                id='classification-style'
                                className="col-sm-9"
                                cacheOptions
                                loadOptions={getStyleOptions}
                                defaultOptions
                                onChange={(style) => this.setState({style})}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor='classification-technique' className="col-sm-3 col-form-label">
                                Техника
                            </label>
                            <AsyncSelect
                                id='classification-technique'
                                className="col-sm-9"
                                cacheOptions
                                loadOptions={getTechniqueOptions}
                                defaultOptions
                                onChange={(technique) => this.setState({technique})}
                            />
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='classification-classes' className="col-sm-3 col-form-label">
                                Класс
                            </label>
                            <div id='classification-classes' className="col-sm-9">
                                {classes.map((el, i) => {
                                    return (
                                        <Radio
                                            key={`default-key-${i}`}
                                            name='image_class'
                                            value={el.pk}
                                            onClick={(e) => this.setState({image_class: e.target.value})}
                                            checked={this.state.image_class == el.pk}
                                        >
                                        {el.title}
                                        </Radio>
                                    )
                                })}
                            </div>
                        </div>
                        <Button type='submit' className='btn btn-primary btn-sm'>
                            Сохранить
                        </Button>
                        <Button type='button' className='btn btn-primary btn-sm' onClick={this.onLoadNextImage}>
                            Пропустить...
                        </Button>
                        {user && user.is_superuser
                            &&
                            <Button 
                                type='button' 
                                id="delete-image" 
                                className='btn btn-primary btn-sm' 
                                onClick={this.onDeleteImage}
                            >
                                Удалить
                            </Button>
                        }
                        {user && user.is_superuser
                            &&
                            <a className='btn btn-primary' href="/api/classifications/download/">Выгрузить отчёт</a>
                        }
                        <NavLink to="/classification/help" activeClassName="btn btn-primary" className="btn btn-primary btn-sm">
                            Помощь
                        </NavLink>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        classes: state.annotation.classes,
        image_for_classification_url: state.annotation.image_for_classification_url,
        image_for_classification: state.annotation.image_for_classification,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadImage: (is_classification) => dispatch(annotation.loadImage(is_classification)),
        saveClassification: (image_for_classification, style, technique, image_class) => dispatch(
            annotation.saveClassification(image_for_classification, style, technique, image_class)
        ),
        deleteImage: (image_id, is_classification) => dispatch(annotation.deleteImage(image_id, is_classification))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClassification);
