import React from 'react'

import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h2>HOME PAGE</h2>
            <Link to="/login">Go to Login</Link>
            <Link to="/profile">Go to Profile</Link>
        </div>
    )
}

export default Home
