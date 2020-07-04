import React from 'react'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/user/userActions';
import Chat from '../../components/Chat/Chat';
import Posts from '../../components/Posts/Posts';

function Home({ username, logoutUser }) {
    return (
        <div className='home-container'>
            <nav className="home-nav">
                <Link className="link btn btn-sm btn-outline-secondary" to="/profile">
                    <i style={{ fontSize: 20, }} className="fas fa-user-edit fa-2x"></i>
                    <div>Edit Profile</div>
                </Link>
                <div className="nav-profile">
                    <img src="https://via.placeholder.com/40x40.jpg" width="35" height="35" alt='profile' />
                    {/* {username} */}
                    GuestUser
                </div>
                <div className="nav-logout btn btn-sm btn-outline-secondary">
                    <div onClick={() => logoutUser(username)}>Logout</div>
                    <i style={{ fontSize: 20, }} className="fas fa-sign-out-alt fa-2x"></i>
                </div>
            </nav>
            <div className='posts-chat-container'>
                <Posts />
                <Chat />
            </div>
        </div >
    )
}

const mapStateToProps = ({ user: { username } }) => ({
    username
})

const mapDispatchToProps = dispatch => ({
    logoutUser: username => dispatch(logoutUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
