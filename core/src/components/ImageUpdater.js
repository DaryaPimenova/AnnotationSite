import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';
import { Form, Row, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {annotation, auth} from "../actions";


class ImageUpdater extends React.Component {

    render() {
        const { isAuthenticated, logout } = this.props;

        return (
            <div>
                <Menu isAuthenticated={isAuthenticated} logout={logout} />
                <Row>
                    <Col>
                        <div className='image-for-update'>
                            <img />
                        </div>
                    </Col>
                    <Col>
                        <form>
                            <input 
                                className="form-control"
                                type='text'
                                name='style'
                            />
                            <input 
                                className="form-control"
                                type='text' 
                                required="required"
                                name='classes'
                            />
                            <Button type='submit' className='btn btn-primary btn-sm'>
                                Сохранить
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
        loadImageForUpdate: () => dispatch(annotation.loadImageForUpdate())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpdater);
