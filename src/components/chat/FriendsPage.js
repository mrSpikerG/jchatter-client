import React, { Component } from 'react';
import Message from './subcomponents/Message';
import ServerUser from './subcomponents/ServerUser';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ServerUserAddFriend from './subcomponents/ServerUserAddFriend';

class FriendsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: {},
            messages: [],
            friends: [],
            currentUser: "",
            curMessage: "",
            inviteInput: "",
            requestFrom: [],
            requestTo: []
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

        axios.post('http://127.0.0.1:8080/api/server/getFriends', {
            username: localStorage.getItem('username')
        })
            .then(function (response) {
                this.setState({ friends: response.data });

            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        axios.post('http://127.0.0.1:8080/api/server/getRequestFrom', {
            username: localStorage.getItem('username')
        })
            .then(function (response) {
                this.setState({ requestFrom: response.data });
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        axios.post('http://127.0.0.1:8080/api/server/getRequestTo', {
            username: localStorage.getItem('username')
        })
            .then(function (response) {
                this.setState({ requestTo: response.data });
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });



    }
    handleMessage = (e) => {

        if (e.target.id == 'current_message') {
            this.setState({ curMessage: e.target.value });
        }
        if (e.target.id == 'invite-nickname') {
            this.setState({ inviteInput: e.target.value })
        }
    }

    handleMessageChanel = (e) => {
        axios.post('http://127.0.0.1:8080/api/server/getFriendsMessages', {
            username: e
        })
            .then(function (response) {
                this.setState({ messages: response.data });
                this.setState({ currentUser: e });
            }.bind(this))
            .catch(function (error) {

                console.log(error);
            });
    }

    sendInvite = (e) => {
        axios.post('http://127.0.0.1:8080/api/server/auth/sendRequest', {
            username: this.state.inviteInput
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(function (response) {

            console.log(response.data);
        }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    sendMessage = (e) => {
        if (e.key === 'Enter') {

            if (this.state.curMessage == "") {
                return;
            }

            axios.post('http://127.0.0.1:8080/api/server/auth/sendFMsg', {
                message: this.state.curMessage,
                usernameTo: this.state.currentUser
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }
            )
                .then(function (response) {
                    axios.post('http://127.0.0.1:8080/api/server/getFriendsMessages', {
                        username: this.state.currentUser
                    })
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
                    <div className='server-block'>
                        <p className='server-block-friend'>F</p>
                    </div>
                    <Link style={{ textDecoration: "none" }} to="/main/chat">
                        <div className='server-block'>
                            <img alt='none' src={this.state.server.icon} className='server-block-image' />
                        </div>
                    </Link>
                </div>
                <div className='server-info'>


                    {
                        this.state.friends.map(x => {
                            return <div onClick={() => { this.handleMessageChanel(x.username); console.log(x.username); }}><ServerUser user={x} /> </div>;
                        })
                    }

                    <input id='invite-nickname' onChange={this.handleMessage} className='friends-info-input' placeholder='nickname' type="text" />
                    <div onClick={this.sendInvite} className='friends-info-invite'>Invite Friend</div>

                </div>
                <div className='server-chat'>
                    <div className='server-messages'>
                        {this.state.messages.map(x => {
                            return <Message key={x.id} message={x} />;
                        })}
                    </div>
                    <div className='server-input-container'>
                        <input id='current_message' placeholder='your message...' onChange={this.handleMessage} onKeyDown={this.sendMessage} type='text' className='server-input' />
                    </div>
                </div>
                <div className='server-users'>
                    <p className='server-user-title'>Request to you:</p>
                    {this.state.requestTo.map(x => {
                        return <ServerUserAddFriend key={x.id} user={x} />
                    })}
                    <p className='server-user-title'>Your request:</p>
                    {this.state.requestFrom.map(x => {
                        return <ServerUser key={x.id} user={x} />
                    })}
                </div>
            </div>
        );
    }
}

export default FriendsPage;