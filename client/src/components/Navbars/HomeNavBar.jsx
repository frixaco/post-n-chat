import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/user/userActions';
import socket from '../../initSocket';

function HomeNavBar({ username, logoutUser }) {

    const handleLogout = () => {
        socket.emit('user_disconnected', username)
        logoutUser()
    }

    return (
        <nav className="home-nav">
            <Link className="link btn btn-sm btn-outline-secondary" to={`/${username}`}>
                <i style={{ fontSize: 20, }} className="fas fa-user-edit fa-2x"></i>
                <div>Edit Profile</div>
            </Link>
            <div className="nav-profile">
                <img src="https://via.placeholder.com/40x40.jpg" width="35" height="35" alt='profile' />
                {username}
            </div>
            <div onClick={handleLogout} className="nav-logout btn btn-sm btn-outline-secondary">
                <div>Logout</div>
                <i style={{ fontSize: 20, }} className="fas fa-sign-out-alt fa-2x"></i>
            </div>
        </nav>
    )
}

const mapStateToProps = ({ user: { username } }) => ({
    username
})

export default connect(mapStateToProps, { logoutUser })(HomeNavBar)