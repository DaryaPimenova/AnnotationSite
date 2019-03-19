import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUp } from '../actions';

class SignUpForm extends Component {

    onSignUp = (event) => {
        event.preventDefault();
        this.props.signUp(event.target);
    }

    render() {
        return (
          <div className="signup">
              <h1>Регистрация</h1>
              <form method="post" onSubmit={this.onSignUp.bind(this)}>
                  <input
                      type="text"
                      name="username"
                      placeholder="Никнейм"
                      title="Пожалуйста, заполните это поле" 
                      required="required" 
                  />
                  <input 
                      type="password" 
                      name="password" 
                      placeholder="Пароль" 
                      title="Пожалуйста, заполните это поле" 
                      required="required" 
                  />
                  <input 
                      type="email" 
                      name="email" 
                      placeholder="e-mail" 
                      title="Пожалуйста, заполните это поле" 
                      required="required"
                    />
                  <button type="submit" className="btn btn-primary btn-block btn-large">Зарегистрироваться</button>
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
