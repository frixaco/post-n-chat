import React, { useState } from "react";
import { connect } from "react-redux";

import { updateUserAsync } from "../../redux/user/userActions";
import MyPosts from "../../components/MyPosts/MyPosts";
import ProfileNavBar from "../../components/Navbars/ProfileNavBar";

function Profile({ username, email, areFetching, myposts, updateUserAsync }) {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <main className="profile-page-container">
      <ProfileNavBar username={username} />
      <div className="profile-username">
        <h3>{username}</h3>
      </div>
      {username === "GuestUser" ? (
        <div className="alert">GuestUsers cannot edit profile details</div>
      ) : null}
      <div className="profile-details-card">
        <div className="details-edit">
          <p>{username}</p>
          <input
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            disabled={username === "GuestUser" ? true : false}
            type="text"
          />
          <button
            onClick={() =>
              updateUserAsync({
                key: "username",
                value: newUsername,
              })
            }
          >
            Save
          </button>
        </div>
        <div className="detail">
          <p>Username</p>
        </div>
      </div>
      <div className="profile-details-card">
        <div className="details-edit">
          <p>{email}</p>
          <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={username === "GuestUser" ? true : false}
            type="email"
          />
          <button
            onClick={() =>
              updateUserAsync({
                key: "email",
                value: newEmail,
              })
            }
          >
            Save
          </button>
        </div>
        <div className="detail">
          <p>Email</p>
        </div>
      </div>
      <div className="profile-details-card">
        <div className="details-edit">
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={username === "GuestUser" ? true : false}
            type="password"
          />
          <button
            onClick={() =>
              updateUserAsync({
                key: "password",
                value: newPassword,
              })
            }
          >
            Save
          </button>
        </div>
        <div className="detail">
          <p>Password</p>
        </div>
      </div>
      <MyPosts loading={areFetching} myposts={myposts} />
    </main>
  );
}

const mapStateToProps = ({
  user: { username, email },
  posts: { items, areFetching },
}) => ({
  myposts: items.filter((post) => post.author === username),
  username,
  email,
  areFetching,
});

export default connect(mapStateToProps, { updateUserAsync })(Profile);
