import React, { useState, useEffect } from 'react'

import { fetchPostsAsync } from '../../redux/post/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import { updateUserAsync } from '../../redux/user/userActions';

function Profile({ username, email, updateUserAsync }) {
    const [myposts, setMyposts] = useState([])
    const [areMyFetching, setAreMyFetching] = useState(true)
    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        const fetchMyPosts = async () => {
            const response = await Axios.post('/post/my', { username })
            setMyposts(response.data.posts)
        }
        fetchMyPosts()
        setAreMyFetching(false)
    }, [username])

    return (
        <div className="profile-page">
            <header className="header d-flex justify-content-between bg-light p-2">
                <Link className="ph-btn btn btn-sm btn-secondary" to="/">
                    <i style={{ fontSize: 20, marginRight: 10 }} className="fas fa-arrow-circle-left"></i>
                    <div>Back Home</div>
                </Link>
                <h2>{username}'s Profile</h2>
                <button className="ph-btn btn btn-sm btn-outline-secondary">
                    <i style={{ fontSize: 20, marginRight: 10 }} className="fas fa-user-slash"></i>
                    Delete Account
                </button>
                {/* <button className="btn btn-outline-secondary">Back Home</button>
            <button className="btn btn-secondary">Delete Account</button> */}
            </header>
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
                    {/* <div className="input-group">
                        <div className="input-field">
                            <div className="label">Current password:</div>
                            <div className="value">{}</div>
                        </div>
                    </div> */}
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
            <p>POSTS</p>
            <button>{areMyFetching ? 'Fetching your posts' : 'Done!'}</button>
            {
                myposts.length !== 0 && myposts.map((post, idx) => (
                    <p key={idx}>{`${post.author}: ${post.title}. ${post.content}`}</p>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        username: state.user.username,
        isAuthenticated: state.user.isAuthenticated,
        email: state.user.email,
        posts: state.post.posts,
        areFetching: state.post.areFetching,
    })
}

const mapDispatchToProps = (dispatch) => ({
    updateUserAsync: user => dispatch(updateUserAsync(user)),
    fetchPostsAsync: username => dispatch(fetchPostsAsync(username)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
