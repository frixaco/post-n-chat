import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { fetchPostsAsync } from '../../redux/posts/postsActions'
import NewPostModal from './NewPostModal';
import ListPosts from './ListPosts';
import Spinner from '../Spinner/Spinner';

function Posts({ username, areFetching, fetchPostsAsync, items }) {
    const [searchField, setSearchField] = useState('')

    useEffect(() => {
        if (username) {
            fetchPostsAsync()
        }
    }, [username, fetchPostsAsync])

    const filteredPosts = items.filter(post => post.title.toLowerCase().includes(searchField.toLowerCase()))
    return (
        <div className="posts">
            <div className="posts-menu">
                <div className="new-post btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">
                    <i className="fas fa-plus-circle fa-2x"></i>
                    <div>New Post</div>
                </div>

                <div className="input-group input-group-sm" style={{ flex: 4 }}>
                    <input
                        value={searchField}
                        onChange={e => setSearchField(e.target.value)}
                        placeholder='Search by title'
                        type="text"
                        className="form-control"
                        aria-label="Search field" />
                </div>
            </div>
            <NewPostModal />
            {areFetching ? <Spinner /> : <ListPosts filteredPosts={filteredPosts} />}
        </div>
    )
}

const mapStateToProps = ({ posts: { items, areFetching }, user: { username } }) => ({ items, username, areFetching })

export default connect(mapStateToProps, { fetchPostsAsync })(Posts);