import React, { Component } from 'react';
import '../../style/main/chat.sass';
import axios from 'axios';
import Message from './subcomponents/Message';

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: {},
            messages: []
        };
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8080/api/server/get')
            .then(function (response) {
                this.setState({ server: response.data });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://127.0.0.1:8080/api/server/getMessages')
            .then(function (response) {
                this.setState({ messages: response.data });
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {

                console.log(error);
            });
    }

    render() {
        return (
            <div className='main-chat-container'>
                <div className='server-list'>
                    <div className='server-block'>
                        <p className='server-block-friend'>F</p>
                    </div>
                    <div className='server-block'>
                        <img alt='none' src={this.state.server.icon} className='server-block-image' />
                    </div>
                </div>
                <div className='server-info'>
                    <img alt='none' src={this.state.server.icon} className='server-info-image' />
                    <p className='server-info-title'>{this.state.server.name}</p>
                    <p className='server-info-description'>{this.state.server.description}</p>
                    <div className='server-info-invite'>Invite link</div>

                </div>
                <div className='server-chat'>
                    <div className='server-messages'>
                        {this.state.messages.map(x => {
                            return <Message key={x.id} message={x} />
                        })}
                    </div>
                    <div className='server-input-container'>
                        <input placeholder='your message...' type='text' className='server-input' />
                    </div>
                </div>
                <div className='server-users'>

                </div>
            </div>
        );
    }
}

export default ChatPage;