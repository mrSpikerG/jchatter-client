import React, { Component } from 'react';

class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className='message-box'>
                <img className='message-user-icon' src={this.props.message.user.icon? "https://www.asiamediajournal.com/wp-content/uploads/2022/10/Dog-Cool-PFP-1200x1200.jpg":this.props.message.user.icon} />
                <div  className="text-container">
                    <p className='text-container__title'>{this.props.message.user.username}</p>
                    <p className='text-container__text'>{this.props.message.textContent}</p>
                </div>
            </div>
        );
    }
}

export default Message;