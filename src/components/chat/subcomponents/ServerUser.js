import React, { Component } from 'react';

class ServerUser extends Component {
    render() {
        return (
            <div className='message-box'>
                <img className='message-user-icon' src={this.props.message.user.icon? "https://www.asiamediajournal.com/wp-content/uploads/2022/10/Dog-Cool-PFP-1200x1200.jpg":this.props.message.user.icon} />
                <div  className="text-container">
                    <p className='text-container__title'>{this.props.message.user.username}</p>
                    
                </div>
            </div>
        );
    }
}

export default ServerUser;