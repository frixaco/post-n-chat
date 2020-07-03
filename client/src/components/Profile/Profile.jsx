import React from 'react'

import { fetchPostsAsync } from '../../redux/post/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile({ username, isAuthenticated, email, posts, areFetching, fetchPostsAsync }) {
    return (
        <div>
            <Link to='/'>Go back Home</Link>
            <h2>Profile Page</h2>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>isAuthenticated: {isAuthenticated.toString()}</p>
            <button
                onClick={() => fetchPostsAsync(username)}
                className='btn btn-primary'
                disabled={areFetching}
            >Fetch posts</button>
            <p>POSTS</p>
            {
                posts.length !== 0 && posts.map((post, idx) => (
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
