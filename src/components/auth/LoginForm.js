import React, { Component } from 'react';
import '../../style/auth.sass';
import { Link, redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { login } from '../../slice/authSlice';
import { connect } from 'react-redux';
import axios from 'axios';
class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPass: "password",
            login: "",
            password: ""
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
    }

    handleLogin = (e) => {
        axios.post('http://127.0.0.1:8080/api/auth/login', {
            username: this.state.login,
            password: this.state.password
        })
            .then(function (response) {
             
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.name);
                window.location ="http://localhost:3000/main/chat";
            }.bind(this))

            .catch(function (error) {
                console.log(error);
            });




    }



    render() {
        return (
            <div className='auth-container'>
                <div className='auth-form'>
                    <div>
                        <p className='auth-title'>JChatter</p>
                        <p className='auth-description'>the app you want to uninstall</p>
                    </div>
                    <div className='auth-controllers'>
                        <input onChange={this.handleInput} id='login' className='auth-input' type='text' placeholder='Login' />
                        <input onChange={this.handleInput} id='password' className='auth-input' type={this.state.showPass} placeholder='Password' />
                    </div>
                    <label className="container auth-checkbox">Show password
                        <input type="checkbox" onClick={this.changeState} />
                        <span className="checkmark"></span>
                    </label>



                    <Link className="auth-link" to='/auth/register'>
                        Don't have an account?
                    </Link>


                    <button onClick={this.handleLogin} className='auth-button' >Sign in</button>
                </div>
            </div>
        );
    }
}


export default LoginForm;
//export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
