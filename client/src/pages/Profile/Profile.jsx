import React, { useState } from 'react'
import { connect } from 'react-redux';

import { updateUserAsync } from '../../redux/user/userActions';
import ProfileNavBar from '../../components/Navbars/ProfileNavBar';
import MyPosts from '../../components/MyPosts/MyPosts';

function Profile({ username, email, areFetching, myposts, updateUserAsync }) {
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    return (
        <div className="profile-page">
            <ProfileNavBar username={username} />

            <div className="profile-pic">
                <div className="edit-pic btn btn-sm btn-secondary">Edit</div>
            </div>

            <section className="profile-section">
                <div className="section-title">
                    <h2 className="title">Username</h2>
                </div>
                <div className="input-groups">
                    <div className="input-group">
                        <div className="input-field">
                            <div className="label">Current username:</div>
                            <div className="value">{username}</div>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <div className="label">New username:</div>
                            <input value={newUsername} onChange={e => setNewUsername(e.target.value)} className="value" type="text" />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <button onClick={() => updateUserAsync({
                                key: 'username',
                                value: newUsername
                            })} className="save-btn btn btn-secondary">Save</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profile-section">
                <div className="section-title">
                    <h2 className="title">Email</h2>
                </div>
                <div className="input-groups">
                    <div className="input-group">
                        <div className="input-field">
                            <div className="label">Current email:</div>
                            <div className="value">{email}</div>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <div className="label">New email:</div>
                            <input value={newEmail} onChange={e => setNewEmail(e.target.value)} className="value" type="text" />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <button onClick={() => updateUserAsync({
                                key: 'email',
                                value: newEmail
                            })} className="save-btn btn btn-secondary">Save</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profile-section">
                <div className="section-title">
                    <h2 className="title">Password</h2>
                </div>
                <div className="input-groups">
                    <div className="input-group">
                        <div className="input-field">
                            <div className="label">New password:</div>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} className="value" type="text" />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-field">
                            <button onClick={() => updateUserAsync({
                                key: 'password',
                                value: newPassword
                            })} className="save-btn btn btn-secondary">Save</button>
                        </div>
                    </div>
                </div>
            </section>

            <MyPosts loading={areFetching} myposts={myposts} />
        </div>
    )
}

const mapStateToProps = ({ user: { username, email }, posts: { items, areFetching } }) => ({
    myposts: items.filter(post => post.author === username),
    username,
    email,
    areFetching
})

// const mapDispatchToProps = (dispatch) => ({
//     updateUserAsync: user => dispatch(updateUserAsync(user)),
//     fetchPostsAsync: username => dispatch(fetchPostsAsync(username)),
// })

export default connect(mapStateToProps, { updateUserAsync })(Profile);
