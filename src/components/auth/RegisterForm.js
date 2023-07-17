import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: "password",
            login: "",
            password: "",
            email: ""
        };
    }

    changeState = (e) => {
        if (e.target.checked) {
            this.setState({ showPass: "text" })
            return;
        }
        this.setState({ showPass: "password" })
    }

    handleInput = (e) => {

        if (e.target.id === "login") {
            this.setState({ login: e.target.value });
        }
        if (e.target.id === "password") {
            this.setState({ password: e.target.value });
        }
        if (e.target.id === "email") {
            this.setState({ email: e.target.value });
        }
    };

    register = (state, action) => {
        axios.post('http://127.0.0.1:8080/api/auth/register', action.payload)
            .then(function (response) {
                alert("Регистрация прошла успешно, зайдите в аккаунт")
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div className='auth-container'>
                <div className='auth-form'>
                    <div>
                        <p className='auth-title'>JChatter</p>
                        <p className='auth-description'>the app you want to uninstall</p>
                    </div>
                    <div className='auth-controllers'>

                        <input onChange={this.handleInput} id='email' className='auth-input' type='text' placeholder='Email' />
                        <input onChange={this.handleInput} id='login' className='auth-input' type='text' placeholder='Login' />
                        <input onChange={this.handleInput} id='password' className='auth-input' type={this.state.showPass} placeholder='Password' />

                    </div>
                    <label className="container auth-checkbox">Show password
                        <input type="checkbox" onClick={this.changeState} />
                        <span className="checkmark"></span>
                    </label>

                    <Link className="auth-link" to='/auth/login'>
                        Already have an account?
                    </Link>
                    <button onClick={() => {
                        this.props.register({
                            username: this.state.login,
                            password: this.state.password,
                            email: this.state.email
                        })
                    }} className='auth-button' >Sign up</button>
                </div>
            </div>
        );
    }
}



export default RegisterForm;
//export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
