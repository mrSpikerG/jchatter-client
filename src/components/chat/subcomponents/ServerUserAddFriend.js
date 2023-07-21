import axios from 'axios';
import React, { Component } from 'react';

class ServerUserAddFriend extends Component {

    sendAnswer = (answer)=>{
        axios.post('http://127.0.0.1:8080/api/server/auth/setFriendRequest', {
            username: this.props.user.username,
            operation: answer
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(function (response) {

            console.log(response.data);
        }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='friends-box'>
                <div className='user-box'>
                    <img className='message-user-icon' src={this.props.user.icon} />
                    <div className="text-container">
                        <p className='user-container-'>{this.props.user.username}</p>
                    </div>
                </div>
                <div>
                    <div onClick={()=>{this.sendAnswer("accept")}} className='friends-box-plus'>+</div> <div onClick={()=>{this.sendAnswer("decline")}} className='friends-box-minus'>-</div>
                </div>
            </div>
        );
    }
}

export default ServerUserAddFriend;