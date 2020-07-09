import React, { useState } from 'react'
import { connect } from 'react-redux';
import { editPostAsync, deletePostAsync } from '../../redux/posts/postsActions';
import Post from './Post';

function ListPosts({ username, filteredPosts, editPostAsync, deletePostAsync }) {
    const [editMode, setEditMode] = useState({ show: false, id: null })
    const [newPost, setNewPost] = useState({ editTitle: '', editContent: '' })

    const handleEdit = e => setNewPost({ ...newPost, [e.target.name]: e.target.value })
    const handlePostUpdate = () => {
        const editedPost = {
            ...filteredPosts[editMode.id],
            title: newPost.editTitle,
            content: newPost.editContent,
            date: new Date().toLocaleString(),
        }
        editPostAsync(editedPost);
        setEditMode({ show: false, id: null })
        setNewPost({ editTitle: '', editContent: '' })
    }

    const cancelEdit = () => {
        setEditMode({ show: false, id: null })
        setNewPost({ editTitle: '', editContent: '' })
    }

    return (
        <div className="posts-container">
            {editMode.show && (
                <div className='edit-container bg-light'>
                    <div className="edit-inputs">
                        <input className='edit-input' value={newPost.newTitle} onChange={handleEdit} placeholder={`Previous title: ${filteredPosts[editMode.id].title}`} name='editTitle' id='editTitle' />
                        <input className='edit-input' value={newPost.newContent} onChange={handleEdit} placeholder={`Previous title: ${filteredPosts[editMode.id].content}`} name='editContent' id='editContent' />
                    </div>
                    <div className='edit-buttons d-flex justify-content-between'>
                        <button className='btn btn-outline-secondary' onClick={cancelEdit}>Cancel</button>
                        <button className='btn btn-secondary' onClick={handlePostUpdate}>SAVE</button>
                    </div>
                </div>
            )}
            {filteredPosts.map((post, idx) => (
                <Post
                    username={username}
                    post={post}
                    deletePost={deletePostAsync}
                    onEdit={setEditMode}
                    id={idx}
                    key={idx}
                />
            ))}
        </div >
    )
}
const mapStateToProps = ({ user: { username } }) => ({ username })

export default connect(mapStateToProps, { editPostAsync, deletePostAsync })(ListPosts);