import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/landing.sass';

class Landing extends Component {
    render() {
        return (
            <div className='landing-container'>
                <nav>
                    <Link to="auth/login">t</Link>
                </nav>
            </div>
        );
    }
}

export default Landing;