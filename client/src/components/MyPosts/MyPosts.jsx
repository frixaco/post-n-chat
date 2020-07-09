import React from 'react'

function MyPosts({ loading, myposts }) {
    return (
        <div>
            <h3>MY POSTS</h3>
            {loading ? <h2>LOADING YOUR POSTS....</h2> : <h2>DONE</h2>}
            {
                myposts.length !== 0 && myposts.map((post, idx) => (
                    <p key={idx}>{`${post.author}: ${post.title}. ${post.content}`}</p>
                ))
            }
        </div>
    )
}

export default MyPosts
