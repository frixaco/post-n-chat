import React from 'react';
import { connect } from 'react-redux'

import { newMessage, userOnline } from '../../redux/chat/chatActions'
import socket from '../../initSocket'

function Chat({ usersOnline, chatHistory, username, newMessage, userOnline }) {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef();

    const onSendMessage = () => {
        if (messageValue !== '') {
            socket.emit('new_message', {
                username,
                text: messageValue,
            });
        }
        setMessageValue('');
    };

    React.useEffect(() => {
        socket.on('update_users_online', usersOnline => {
            userOnline(usersOnline)
        })
        socket.on('update_chat_history', message => {
            newMessage(message)
        })
        return () => {
            socket.off('update_users_online')
            socket.off('update_chat_history')
        }
    }, [])

    React.useEffect(() => {
        if (username) {
            socket.emit('new_online_user', username)
        }
    }, [username]);

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [chatHistory]);

    return (
        <div className="chat">
            <h4 className="chat-header">Welcome to our Chat!</h4>
            <span className="divider"></span>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {chatHistory.map((message, idx) => (
                        <div key={idx} className={`message ${message.username === username ? 'my' : ''}`}>
                            <span className='btn-secondary rounded px-1'>{message.username}</span>
                            <p>{message.text}</p>
                        </div>
                    ))}
                </div>
                <div className="myform">
                    <input
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        className="myinput"
                    />
                    <button onClick={onSendMessage} type="button" className="btn btn-secondary">
                        Send
                </button>
                </div>
                <div className="chat-users">
                    <p>Online ({usersOnline.length}):</p>
                    {usersOnline.map((name, index) => (
                        <span key={name + index} className="badge badge-success mx-1">{name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ user: { username }, chat: { usersOnline, chatHistory } }) => ({
    usersOnline, chatHistory, username
})

export default connect(mapStateToProps, { newMessage, userOnline })(Chat);