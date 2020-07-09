import React from 'react'

function Post({ username, post, onEdit, deletePost, id }) {
    return (
        <div className="post row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-secondary">{post.author}</strong>
                <h3 className="mb-0">{post.title}</h3>
                <small className="mb-1 text-muted text-sm">{post.date}</small>
                <p className="mb-auto">
                    {post.content}
                </p>
                {/* Implement showImage() ? */}
                <div className="continue text-secondary font-weight-light mt-2">Image hidden</div>
                {post.author === username ? (
                    <div className='d-flex justify-content-between'>
                        <button data-toggle="editmodal" data-target="#editmodal" onClick={() => onEdit({ show: true, id })} className='btn btn-outline-secondary' >Edit</button>
                        <button onClick={() => deletePost(post._id)} className='btn btn-secondary'>Delete</button>
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
    )
}

export default Post
