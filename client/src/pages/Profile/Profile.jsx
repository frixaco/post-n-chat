import React, { useState, useEffect } from 'react'

import { fetchPostsAsync } from '../../redux/post/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Profile({ username, isAuthenticated, email }) {
    const [myposts, setMyposts] = useState([])
    const [areMyFetching, setAreMyFetching] = useState(true)
    useEffect(() => {
        const fetchMyPosts = async () => {
            const response = await Axios.post('/post/my', { username })
            setMyposts(response.data.posts)
        }
        fetchMyPosts()
        setAreMyFetching(false)
    }, [username])
    return (
        <div>
            <Link to='/'>Go back Home</Link>
            <h2>Profile Page</h2>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>isAuthenticated: {isAuthenticated.toString()}</p>
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
    fetchPostsAsync: username => dispatch(fetchPostsAsync(username)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
