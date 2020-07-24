import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

import { logoutUser } from "../../redux/user/userActions";
import socket from "../../initSocket";

function ProfileNavBar({ username, logoutUser }) {
  const handleUserDelete = async (e) => {
    try {
      await Axios.post("/profile", { username });
      socket.emit("user_disconnected", username);
      logoutUser();
    } catch (err) {
      console.log("Error when deleting account");
    }
  };

  return (
    <nav className="profile-nav">
      <Link to="/">
        <div className="icon">
          <i className="fas fa-arrow-left"></i>
        </div>
      </Link>
      <button
        disabled={username === "GuestUser" ? true : false}
        onClick={handleUserDelete}
        className="icon"
      >
        <i className="fas fa-user-slash"></i>
      </button>
    </nav>
  );
}

export default connect(null, { logoutUser })(ProfileNavBar);
