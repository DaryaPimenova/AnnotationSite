import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from './actions';


class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { isFetching, signIn } = this.props;

        return (
          <div className="form-center">
              <form onSubmit={this.handleSubmit} method='POST' className="form-fields" onSubmit={signIn}>
                  <div className="form-field">
                      <label className="form-field-label" htmlFor="email">Логин</label>
                      <input type="text" 
                             id="login" 
                             className="form-field-input" 
                             placeholder="логин" 
                             name="login" 
                             value={this.state.email} 
                             onChange={this.handleChange} 
                      />
                  </div>
                  <div className="form-field">
                      <label className="form-field-label" htmlFor="password">Пароль</label>
                      <input type="password" 
                             id="password" 
                             className="form-field-input" 
                             placeholder="пароль" 
                             name="password" 
                             value={this.state.password} 
                             onChange={this.handleChange} 
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
        signIn() {
            dispatch(signIn());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
