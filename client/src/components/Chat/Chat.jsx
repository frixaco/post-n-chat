import React, { useEffect } from "react";
import { connect } from "react-redux";

import { newMessage, userOnline } from "../../redux/chat/chatActions";
import socket from "../../initSocket";

function Chat({ usersOnline, chatHistory, username, newMessage, userOnline }) {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef();

  const sendMsgOnEnter = (e) => {
    if (e.key === "Enter") {
      if (messageValue !== "") {
        socket.emit("new_message", {
          username,
          text: messageValue,
        });
      }
      setMessageValue("");
    }
  };

  const onSendMessage = () => {
    if (messageValue !== "") {
      socket.emit("new_message", {
        username,
        text: messageValue,
      });
    }
    setMessageValue("");
  };

  useEffect(() => {
    socket.on("update_users_online", (usersOnline) => {
      userOnline(usersOnline);
    });
    socket.on("update_chat_history", (message) => {
      newMessage(message);
    });
    return () => {
      socket.off("update_users_online");
      socket.off("update_chat_history");
    };
  }, [userOnline, newMessage]);

  useEffect(() => {
    if (username) {
      socket.emit("new_online_user", username);
    }
  }, [username]);

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [chatHistory]);

  return (
    <section class="chat-section">
      <h4>Live global chat</h4>
      {/* USERS ONLINE: WHO JOINED AND WHO LEFT */}
      <div ref={messagesRef} class="chat-history">
        {chatHistory.map((message, idx) => (
          <div
            key={idx}
            className={`message ${message.username === username ? "my" : ""}`}
          >
            <p
              style={{ fontSize: "0.8rem", color: "#6e93d6" }}
            >{`${message.username}`}</p>
            <p>{`${message.text}`}</p>
            <span>{new Date().toLocaleString}</span>
          </div>
        ))}
      </div>
      <div class="send-message">
        <input
          type="text"
          placeholder="Type your message"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={sendMsgOnEnter}
        />
        <i onClick={onSendMessage} class="fas fa-paper-plane"></i>
      </div>
    </section>
  );
}

const mapStateToProps = ({
  user: { username },
  chat: { usersOnline, chatHistory },
}) => ({
  usersOnline,
  chatHistory,
  username,
});

export default connect(mapStateToProps, { newMessage, userOnline })(Chat);
