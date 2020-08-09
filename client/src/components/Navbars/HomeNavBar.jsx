import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../redux/user/userActions";
import socket from "../../initSocket";

function HomeNavBar({ username, logoutUser }) {
  const handleLogout = () => {
    socket.emit("user_disconnected", username);
    logoutUser();
  };

  return (
    <nav>
      <div className="left-nav">
        <Link to={`/profile`}>
          <div className="icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </Link>
        <h4>Welcome, {username}!</h4>
      </div>
      <div className="right-nav">
        <a
          target="_blank"
          href="https://github.com/frixaco/post-n-chat"
          rel="noopener noreferrer"
        >
          <div className="icon">
            <i className="fab fa-github"></i>
          </div>
        </a>
        <div onClick={handleLogout} className="icon">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({ username: state.user.username });

export default connect(mapStateToProps, { logoutUser })(HomeNavBar);
