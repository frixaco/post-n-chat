import React, { useState } from 'react'
import { connect } from 'react-redux';
import { editPostAsync, deletePostAsync } from '../../redux/post/postActions';

function ListPosts({ posts, username, editPostAsync, deletePostAsync }) {
    const [showModal, setShowModal] = useState({ show: false, id: null })
    const [newPost, setNewPost] = useState({ editTitle: '', editContent: '' })

    const handleEdit = e => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value })
    }

    const handlePostUpdate = () => {
        console.log('Original post:', posts[showModal.id])
        console.log('Edited info:', newPost)
        const editedPost = {
            ...posts[showModal.id],
            title: newPost.editTitle,
            content: newPost.editContent,
            date: new Date().toLocaleString(),
        }
        editPostAsync(editedPost);
        setShowModal({ show: false, id: null })
        setNewPost({ editTitle: '', editContent: '' })
    }

    const cancelEdit = () => {
        setShowModal({ show: false, id: null })
        setNewPost({ editTitle: '', editContent: '' })
    }

    return (
        <div className="posts-container">
            {
                showModal.show && (
                    <div className='edit-container'>
                        <div className="edit-inputs">
                            <input className='edit-input' value={newPost.newTitle} onChange={handleEdit} placeholder={`Previous title: ${posts[showModal.id].title}`} name='editTitle' id='editTitle' />
                            <input className='edit-input' value={newPost.newContent} onChange={handleEdit} placeholder={`Previous title: ${posts[showModal.id].content}`} name='editContent' id='editContent' />
                        </div>
                        <div className='edit-buttons d-flex justify-content-between'>
                            <button className='btn btn-outline-secondary' onClick={cancelEdit}>Cancel</button>
                            <button className='btn btn-secondary' onClick={handlePostUpdate}>SAVE</button>
                        </div>
                    </div>
                )
            }
            {
                posts.map((post, idx) => (
                    <div key={idx} className="post row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-secondary">{post.author}</strong>
                            <h3 className="mb-0">{post.title}</h3>
                            <small className="mb-1 text-muted text-sm">{post.date}</small>
                            <p className="mb-auto">
                                {post.content}
                            </p>
                            {/* onClick={showImage} */}
                            <div className="continue text-secondary font-weight-light mt-2">Display image</div>
                            {post.author === username ? (
                                <div className='d-flex justify-content-between'>
                                    <button onClick={() => setShowModal({ show: true, id: idx })} className='btn btn-outline-secondary' >Edit</button>
                                    <button onClick={() => deletePostAsync(post._id)} className='btn btn-secondary'>Delete</button>
                                </div>
                            ) : null}
                        </div>
                        <div className="col-auto d-flex d-lg-block"
                            style={{
                                backgroundImage: `url('${post.imglink}')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                width: 200, height: 300
                            }}>
                        </div>

                    </div>
                ))
            }
        </div >
    )
}

const mapStateToProps = ({ post: { posts }, user: { username } }) => ({ posts, username })

const mapDispatchToProps = dispatch => ({
    editPostAsync: post => dispatch(editPostAsync(post)),
    deletePostAsync: postid => dispatch(deletePostAsync(postid))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
