import React, { Component } from 'react';


export default class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            login: '',
            password: '',
            name: '',
            hasAgreed: false
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
            <h2>Создайте свой личный аккаунт:</h2>
            <form onSubmit={this.handleSubmit} className="form-fields">
                <div className="form-field">
                    <label className="form-field-label" htmlFor="name">Имя</label>
                    <input type="text" 
                           id="name" 
                           className="form-field-input" 
                           placeholder="Имя" 
                           name="name" 
                           value={this.state.name} 
                           onChange={this.handleChange} 
                    />
                </div>
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
                <div className="formfield">
                    <label className="form-field-label" htmlFor="email">E-Mail</label>
                    <input type="email" 
                           id="email" 
                           className="form-field-input" 
                           placeholder="e-mail" 
                           name="email" 
                           value={this.state.email} 
                           onChange={this.handleChange} 
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
