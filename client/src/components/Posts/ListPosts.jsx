import React from 'react'
import { connect } from 'react-redux';

function ListPosts({ posts }) {
    return (
        <div className="posts-container">
            {
                posts.reverse().map((post, idx) => (
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
        </div>
    )
}

const mapStateToProps = ({ post: { posts } }) => ({ posts })

export default connect(mapStateToProps)(ListPosts);
