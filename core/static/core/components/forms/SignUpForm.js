import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp } from './actions';

class SignUpForm extends Component {

    onSignUp = (event) => {
        event.preventDefault();
        this.props.signUp(event.target);
    }

    render() {
        return (
        <div className="form-center">
            <h2>Создайте свой личный аккаунт:</h2>
            <form onSubmit={this.onSignUp} className="form-fields">
                <div className="form-field">
                    <label className="form-field-label" htmlFor="name">Имя</label>
                    <input type="text" 
                           id="name" 
                           className="form-field-input" 
                           placeholder="Имя" 
                           name="name" 
                    />
                </div>
                <div className="form-field">
                    <label className="form-field-label" htmlFor="email">Логин</label>
                    <input type="text" 
                           id="login" 
                           className="form-field-input" 
                           placeholder="логин" 
                           name="login" 
                    />
                </div>
                <div className="form-field">
                    <label className="form-field-label" htmlFor="password">Пароль</label>
                    <input type="password" 
                           id="password" 
                           className="form-field-input" 
                           placeholder="пароль" 
                           name="password" 
                    />
                </div>
                <div className="formfield">
                    <label className="form-field-label" htmlFor="email">E-Mail</label>
                    <input type="email" 
                           id="email" 
                           className="form-field-input" 
                           placeholder="e-mail" 
                           name="email"
                    />
                </div>
                <div className="form-field">
                    <button className="form-field-button mr-20">Зарегистрироваться</button> 
                </div>
            </form>
        </div>
        );
    }
}

SignUpForm.propTypes = {
    isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        isFetching: state.signing.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signUp(form) {
            dispatch(signUp(form));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
