import React, { Component } from 'react';

class ServerUser extends Component {
    render() {
        return (
            <div className='user-box'>
                <img className='message-user-icon' src={this.props.user.icon} />
                <div  className="text-container">
                    <p className='user-container-'>{this.props.user.username}</p>
                </div>
            </div>
        );
    }
}

export default ServerUser;