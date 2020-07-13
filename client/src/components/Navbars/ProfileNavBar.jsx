import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Axios from 'axios';

import { logoutUser } from '../../redux/user/userActions'
import socket from '../../initSocket'

function ProfileNavBar({ username, logoutUser }) {
    const handleUserDelete = async e => {
        try {
            await Axios.post('/profile', { username })
            socket.emit('user_disconnected', username)
            logoutUser()
        } catch (err) {
            console.log('Error when deleting account');
        }
    }

    return (
        <header className="header d-flex justify-content-between bg-light">
            <Link className="link btn btn-sm btn-secondary" to='/'>
                <i style={{ fontSize: 20, marginRight: 10 }} className="fas fa-arrow-circle-left"></i>
                <div>Back Home</div>
            </Link>
            <h2>{username}'s Profile</h2>
            <button onClick={handleUserDelete} className="link btn btn-sm btn-outline-secondary">
                <i style={{ fontSize: 20, marginRight: 10 }} className="fas fa-user-slash"></i>
                Delete Account
            </button>
        </header>
    )
}

export default connect(null, { logoutUser })(ProfileNavBar)
