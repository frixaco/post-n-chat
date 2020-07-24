import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState } from "react";

import { connect } from "react-redux";
import { editPostAsync, deletePostAsync } from "../../redux/posts/postsActions";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PostPage({ username, items, editPostAsync, deletePostAsync }) {
  const history = useHistory();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const post = items.find((item) => item._id === id);
  const [newPost, setNewPost] = useState({
    editTitle: "",
    editContent: "",
    editImgLink: "",
  });

  const handleEdit = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  const handlePostUpdate = () => {
    const editedPost = {
      ...post,
      title: newPost.editTitle,
      content: newPost.editContent,
      imglink: newPost.editImgLink,
      date: new Date().toLocaleString(),
    };
    editPostAsync(editedPost);
    setEditMode(false);
    setNewPost({ editTitle: "", editContent: "", editImgLink: "" });
  };

  const cancelEdit = () => {
    setEditMode(false);
    setNewPost({
      editTitle: post.title,
      editContent: post.content,
      editImgLink: post.imglink,
    });
  };

  const handlePostDelete = () => {
    deletePostAsync(post._id);
  };

  const pickRandomImage = () => {
    setNewPost({
      ...newPost,
      editImgLink: `https://picsum.photos/id/${getRandomInt(1, 200)}/500/600`,
    });
  };

  return (
    <div className="post-page-container">
      {/* <Link to="/"> */}
      <div onClick={() => history.goBack()} className="icon">
        <i className="fas fa-arrow-left"></i>
      </div>
      {/* </Link> */}

      {editMode ? (
        <input
          className="edit-input"
          value={newPost.newTitle}
          onChange={handleEdit}
          placeholder={post.title}
          name="editTitle"
        />
      ) : (
        <h4>{post.title}</h4>
      )}

      {username === post.author && (
        <div className="edit-delete-btns">
          <div onClick={() => setEditMode(true)} className="icon">
            <i className="fas fa-pen"></i>
          </div>
          <Link to="/">
            <div onClick={handlePostDelete} className="icon">
              <i className="fas fa-trash"></i>
            </div>
          </Link>
        </div>
      )}

      <span className="author">{post.author}</span>
      <span className="date">{post.date}</span>

      {editMode ? (
        <textarea
          cols="20"
          rows="5"
          className="edit-input"
          value={newPost.newContent}
          onChange={handleEdit}
          placeholder={post.content}
          name="editContent"
        />
      ) : (
        <p>{post.content}</p>
      )}

      {editMode ? (
        <>
          <button onClick={pickRandomImage} disabled={!editMode}>
            Pick random image
          </button>
          <img
            width="400"
            src={newPost.editImgLink}
            alt=""
            style={{ margin: "15px 0 20px" }}
          />
        </>
      ) : (
        <img src={post.imglink} alt="" />
      )}

      <div className="modal-btns">
        <Link to="/">
          <button className="btn-post" onClick={cancelEdit}>
            Cancel
          </button>
        </Link>
        <button className="btn-post" onClick={handlePostUpdate}>
          SAVE
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user: { username }, posts: { items } }) => ({
  username,
  items,
});

export default connect(mapStateToProps, { editPostAsync, deletePostAsync })(
  PostPage
);
