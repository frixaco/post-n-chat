import React, { useState } from 'react'
import { connect } from 'react-redux';
import Axios from 'axios'

import { createPostAsync } from '../../redux/posts/postsActions'

function NewPostModal({ username, createPostAsync }) {
    const [postForm, setPostForm] = useState({
        title: '', content: '', keyword: '', imglink: ''
    });

    const fillForm = e => setPostForm({ ...postForm, [e.target.name]: e.target.value })
    const pickPexel = async () => {
        try {
            // LOADER ?
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
    const cancel = () => setPostForm({ title: '', content: '', keyword: '', imglink: '' })
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
                        <button onClick={handlePostSubmit} type="button" className="btn btn-secondary" data-dismiss="modal">POST</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user: { username } }) => ({ username })

export default connect(mapStateToProps, { createPostAsync })(NewPostModal)
