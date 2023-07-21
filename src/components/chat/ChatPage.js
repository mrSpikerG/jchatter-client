import React, { Component } from 'react';
import '../../style/main/chat.sass';
import axios from 'axios';
import Message from './subcomponents/Message';
import ServerUser from './subcomponents/ServerUser';
import { Link } from 'react-router-dom';

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: {},
            messages: [],
            users: [],
            curMessage: ""
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
            }.bind(this))
            .catch(function (error) {

                console.log(error);
            });

        axios.get('http://127.0.0.1:8080/api/server/getUsers')
            .then(function (response) {
                this.setState({ users: response.data });

            }.bind(this))
            .catch(function (error) {

                console.log(error);
            });
    }

    handleMessage = (e) => {

        if (e.target.id == 'current_message') {
            this.setState({ curMessage: e.target.value });
        }
    }

    sendMessage = (e) => {
        if (e.key === 'Enter') {

            if (this.state.curMessage == "") {
                return;
            }

            axios.post('http://127.0.0.1:8080/api/server/auth/sendMessage', {
                message: this.state.curMessage
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }
            )
                .then(function (response) {
                    axios.get('http://127.0.0.1:8080/api/server/getMessages')
                        .then(function (response) {
                            this.setState({ messages: response.data });
                        }.bind(this))
                        .catch(function (error) {

                            console.log(error);
                        });

                }.bind(this))
                .catch(function (error) {

                    console.log(error);
                });

        }
    }

    render() {
        return (
            <div className='main-chat-container'>
                <div className='server-list'>
                    <Link style={{textDecoration:"none"}} to="/main/friends">
                        <div className='server-block'>
                            <p className='server-block-friend'>F</p>
                        </div>
                    </Link>
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
                        <input id='current_message' placeholder='your message...' onChange={this.handleMessage} onKeyDown={this.sendMessage} type='text' className='server-input' />
                    </div>
                </div>
                <div className='server-users'>
                    {this.state.users.map(x => {
                        return <ServerUser key={x.id} user={x} />
                    })}
                </div>
            </div>
        );
    }
}

export default ChatPage;