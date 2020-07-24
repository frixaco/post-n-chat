import React from "react";
import { Link } from "react-router-dom";

function MyPosts({ myposts }) {
  return (
    <>
      <h3 className="text-center bg-light py-4">MY POSTS</h3>
      <div className="myposts-container">
        {myposts.length !== 0 &&
          myposts.map((post, idx) => (
            <div key={idx} className="post">
              <div className="left">
                <div className="top">
                  <div className="userdata">
                    <p>{post.author}</p>
                    <h4>{post.title}</h4>
                    <span>{post.date}</span>
                  </div>
                  <div className="icon">
                    <Link to={`/${post._id}`}>
                      <i className="fas fa-eye"></i>
                    </Link>
                  </div>
                </div>
                <div className="bottom">
                  <p>{post.content}</p>
                </div>
              </div>
              <img src={post.imglink} alt="" />
            </div>
          ))}
      </div>
    </>
  );
}

export default MyPosts;
