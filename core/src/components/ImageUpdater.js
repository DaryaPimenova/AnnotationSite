import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";


class ImageUpdater extends React.Component {

    state = {
        style: '',
        classes: '',
    }

    componentWillMount() {
        this.props.loadImageForUpdate();
    }

    onLoadNextImage = (event) => {
        event.preventDefault();
        this.setState({style: '', classes: ''});
        this.props.loadImageForUpdate();
    }

    onSaveImageData = (event) => {
        event.preventDefault();
        let { style, classes } = this.state;
        classes = classes.trim();

        if (!classes) {
            alert('Заполните поле "Классы"')
        } else {
            this.setState({style: '', classes: ''});
            this.props.saveImageData(this.props.image_for_update_id, this.state.style, this.state.classes);
        }
    }

    render() {
        const { isAuthenticated, logout, image_for_update_url } = this.props;

        return (
            <div>
                <Menu isAuthenticated={isAuthenticated} logout={logout} />
                <Row>
                    <Col md={6}>
                        <div className='image-for-update'>
                            <img style={{witdh: '90%'}} src={image_for_update_url} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <form className='updater-form' onSubmit={::this.onSaveImageData}>
                        <div className="form-group row">
                            <label htmlFor='updater-style' className="col-sm-3 col-form-label">
                                Стиль
                            </label>
                            <input 
                                className="form-control"
                                id='updater-style'
                                type='text'
                                name='style'
                                value={this.state.style}
                                onChange={e => this.setState({style: e.target.value})}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor='updater-classes' className="col-sm-3 col-form-label">
                                Классы (указывать через запятую)
                            </label>
                            <input 
                                className="form-control"
                                id='updater-classes'
                                type='text' 
                                required="required"
                                name='classes'
                                value={this.state.classes}
                                onChange={e => this.setState({classes: e.target.value})}
                            />
                        </div>
                            <Button type='submit' className='btn btn-primary btn-sm'>
                                Сохранить
                            </Button>
                            <Button type='button' className='btn btn-primary btn-sm' onClick={this.onLoadNextImage}>
                                Пропустить...
                            </Button>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user,
        image_for_update_url: state.annotation.image_for_update_url,
        image_for_update_id: state.annotation.image_for_update_id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        loadImageForUpdate: () => dispatch(annotation.loadImageForUpdate()),
        saveImageData: (image_for_update_id, style, classes) => dispatch(annotation.saveImageData(image_for_update_id, style, classes))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpdater);
