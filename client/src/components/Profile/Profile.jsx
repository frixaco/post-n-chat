import React from 'react'

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile({ username, email, password, isAuthenticated }) {
    return (
        <div>
            <Link to='/'>Go back Home</Link>
            <h2>Profile Page</h2>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <p>isAuthenticated: {isAuthenticated.toString()}</p>
        </div>
    )
}

const mapStateToProps = ({ user: { username, email, password, isAuthenticated } }) => ({
    username, email, password, isAuthenticated
});

export default connect(mapStateToProps)(Profile);
