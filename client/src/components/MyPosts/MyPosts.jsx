import React from 'react'

function MyPosts({ myposts }) {
    console.log(myposts);
    return (
        <>
            <h3 className='text-center bg-light py-4'>MY POSTS</h3>
            <div className='myposts-container'>
                {
                    myposts.length !== 0 && myposts.map((post, idx) => (
                        <div key={idx} className="mypost">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-secondary">{post.author}</strong>
                                <h3 className="mb-0">{post.title}</h3>
                                <small className="mb-1 text-muted text-sm">{post.date}</small>
                                <p className="mb-auto">
                                    {post.content}
                                </p>
                            </div>
                            <div className="mypic col-auto d-flex d-lg-block"
                                style={{
                                    backgroundImage: `url(${post.imglink})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: 200, height: 300
                                }}>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MyPosts
