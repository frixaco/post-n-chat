import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import ListPosts from './ListPosts';
import { connect } from 'react-redux';
import { createPostAsync, initialPostsFetchAsync } from '../../redux/post/postActions'

function Posts({ createPostAsync, username, initialPostsFetchAsync }) {
    const [postForm, setPostForm] = useState({
        title: '', content: '', keyword: '', imglink: ''
    })

    useEffect(() => {
        initialPostsFetchAsync()
    }, [initialPostsFetchAsync])

    const fillForm = e => {
        setPostForm({ ...postForm, [e.target.name]: e.target.value });
    }

    const pickPexel = async () => {
        try {
            const response = await Axios.get(`https://api.pexels.com/v1/search?query=${postForm.keyword}&per_page=1`, {
                headers: {
                    'Authorization': "563492ad6f9170000100000125fdd7dd0cbd4bada2257ce4d4c5b090"
                }
            })
            const link = response.data.photos[0].src.medium
            setPostForm({ ...postForm, imglink: link })
        } catch (err) {
            console.log(err.message)
        }
    }

    const cancel = () => {
        setPostForm({ title: '', content: '', keyword: '', imglink: '' })
    }

    const handlePostSubmit = () => {
        const newPost = {
            author: username,
            title: postForm.title,
            content: postForm.content,
            imglink: postForm.imglink,
            date: new Date().toLocaleString(),
        }
        createPostAsync(newPost)
    }

    return (
        <div className="posts">
            <div className="posts-menu">

                <div className="new-post btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">
                    <i className="fas fa-plus-circle fa-2x"></i>
                    <div>New Post</div>
                </div>

                <div className="input-group input-group-sm" style={{ flex: 4 }}>
                    <input type="text" className="form-control" aria-label="Search field" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button">Search in titles</button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create a new post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label forhtml="title">Title</label>
                                <input value={postForm.title} onChange={fillForm} name="title" type="text" className="form-control" id="title" placeholder="Give a title for your post" />
                            </div>
                            <div className="form-group">
                                <label forhtml="content">Main content</label>
                                <input value={postForm.content} onChange={fillForm} name='content' type="text" className="form-control" id="content" placeholder="What is your post about?" />
                            </div>
                            <label forhtml="image">Fetch an image from pexels.com:</label>
                            <div className="input-group">
                                <input value={postForm.keyword} onChange={fillForm} name='keyword' type="text" className="form-control" id="image" placeholder="Enter keyword" />
                                <div className="input-group-append">
                                    <button onClick={pickPexel} className="btn btn-outline-secondary" type="button">Pick random image</button>
                                </div>
                            </div>
                            {postForm.imglink === '' ? null : (
                                <img className='imglink' src={postForm.imglink} alt="pexel" width="465" height="300" />
                            )}
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button onClick={cancel} type="button" className="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
                            <button onClick={handlePostSubmit} type="button" className="btn btn-secondary">POST</button>
                        </div>
                    </div>
                </div>
            </div>
            <ListPosts />
        </div>
    )
}

const mapStateToProps = ({ user: { username } }) => ({ username })

const mapDispatchToProps = dispatch => ({
    createPostAsync: post => dispatch(createPostAsync(post)),
    initialPostsFetchAsync: () => dispatch(initialPostsFetchAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);