import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../actions';


class SignInForm extends Component {

    onSignIn = (event) => {
        event.preventDefault();
        this.props.signIn(event.target);
    }

    render() {
        const { isFetching, signIn } = this.props;

        return (
          <div className="login">
              <h1>Вход</h1>
              <form method="post" onSubmit={this.onSignIn.bind(this)}>
                  <input 
                      type="text" 
                      name="username" 
                      placeholder="Логин" 
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
                  <button type="submit" className="btn btn-primary btn-block btn-large">Войти</button>
              </form>
          </div>
        );
    }
}

SignInForm.propTypes = {
    isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        isFetching: state.signing.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn(name) {
            dispatch(signIn(name));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
