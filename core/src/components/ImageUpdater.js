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

    onDeleteImage = () => {
        let is_delete = confirm('Вы уверены, что хотите удалить эту картинку?');
        if (is_delete) {
            this.props.deleteImage(this.props.image_for_update_id)
        }
    }

    render() {
        const { isAuthenticated, logout, image_for_update_url } = this.props;

        return (
            <div>
                <Menu isAuthenticated={isAuthenticated} logout={logout} />
                <Row className="justify-content-md-center">
                    <Col md={5}>
                        <div className='image-for-update'>
                            <img style={{witdh: '90%'}} src={image_for_update_url} />
                        </div>
                    </Col>
                    <Col md={4}>
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
                            <Button type='submit' className='btn btn-primary btn-sm' style={{marginRight: '10px'}}>
                                Сохранить
                            </Button>
                            <Button type='button' className='btn btn-primary btn-sm' onClick={this.onLoadNextImage}>
                                Пропустить...
                            </Button>
                            {this.props.user.is_superuser
                                ?
                                <Button type='button' id="delete-image" className='btn btn-primary btn-sm' onClick={this.onDeleteImage}>
                                    Удалить
                                </Button>
                                :
                                null
                            }
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
        user: state.auth.user,
        image_for_update_url: state.annotation.image_for_update_url,
        image_for_update_id: state.annotation.image_for_update_id,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        loadImageForUpdate: () => dispatch(annotation.loadImageForUpdate()),
        saveImageData: (image_for_update_id, style, classes) => dispatch(annotation.saveImageData(image_for_update_id, style, classes)),
        deleteImage: (image_id) => dispatch(annotation.deleteImage(image_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpdater);
