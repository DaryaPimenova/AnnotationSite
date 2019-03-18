import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from './actions';


class SignInForm extends Component {

    onSignIn = (event) => {
        event.preventDefault();
        this.props.signIn(event.target);
    }

    render() {
        const { isFetching, signIn } = this.props;

        return (
          <div className="form-center">
              <form className="form-fields" method='post' onSubmit={this.onSignIn.bind(this)}>
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
                  <div className="form-field">
                      <button className="form-field-button mr-20">Войти</button> 
                  </div>
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
