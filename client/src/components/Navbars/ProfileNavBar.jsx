import React from 'react'
import { Link } from "react-router-dom";

function ProfileNavBar({ username }) {
    return (
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
        </header>
    )
}

export default ProfileNavBar
