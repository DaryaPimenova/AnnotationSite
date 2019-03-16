import React, { Component } from 'react';

export default class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    render() {
        return (
          <div className="form-center">
              <form onSubmit={this.handleSubmit} className="form-fields" onSubmit={this.handleSubmit}>
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
