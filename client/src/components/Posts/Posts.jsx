import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import {
  createPostAsync,
  fetchPostsAsync,
} from "../../redux/posts/postsActions";
import Spinner from "../Spinner/Spinner";

const ListPosts = React.lazy(() => import("./ListPosts"));

Modal.setAppElement("#root");

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    backgroundColor: "transparent",
  },
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Posts({ username, createPostAsync, fetchPostsAsync, items }) {
  const [searchField, setSearchField] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    imglink: "",
  });
  const [pexelLoading, setPexelLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setPostForm({ title: "", content: "", imglink: "" });
    setIsOpen(false);
  }
  const handleSave = () => {
    const newPost = {
      author: username,
      title: postForm.title,
      content: postForm.content,
      imglink: postForm.imglink,
      date: new Date().toLocaleString(),
    };
    createPostAsync(newPost);
    setPostForm({ title: "", content: "", imglink: "" });
    setIsOpen(false);
  };

  const fillForm = (e) =>
    setPostForm({ ...postForm, [e.target.name]: e.target.value });

  const pickRandomImage = async () => {
    try {
      setPexelLoading(true);
      setPostForm({
        ...postForm,
        imglink: `https://picsum.photos/id/${getRandomInt(1, 200)}/500/600`,
      });
      setPexelLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (username) {
      fetchPostsAsync();
    }
  }, [username, fetchPostsAsync]);

  const filteredPosts = items.filter((post) =>
    post.title.toLowerCase().includes(searchField.toLowerCase())
  );
  return (
    <section className="posts-section">
      <div className="menu">
        <div className="new-post">
          <button onClick={openModal}>NEW POST</button>
        </div>
        <div className="search-post">
          <input
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            type="text"
            placeholder="Search posts by title"
          />
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <ListPosts filteredPosts={filteredPosts} />
      </Suspense>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="modal"
        style={modalStyles}
      >
        <div id="modal">
          <label htmlFor="new-title">Title</label>
          <input
            value={postForm.title}
            onChange={fillForm}
            name="title"
            placeholder="Title of your post"
            id="new-title"
            type="text"
          />
          <label htmlFor="new-title">Main body</label>
          <textarea
            value={postForm.content}
            onChange={fillForm}
            name="content"
            placeholder="Content of your post"
            id="post-content"
            cols="20"
            rows="4"
          ></textarea>
          <button onClick={pickRandomImage}>Pick random image</button>
          {pexelLoading ? (
            <Spinner />
          ) : !postForm.imglink ? null : (
            <img
              width="300"
              className="imglink"
              src={postForm.imglink}
              alt=""
            />
          )}
          <div class="modal-btns" style={{ marginTop: 15 }}>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleSave}>SAVE</button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

const mapStateToProps = ({
  posts: { items, areFetching },
  user: { username },
}) => ({ items, username, areFetching });

export default connect(mapStateToProps, { fetchPostsAsync, createPostAsync })(
  Posts
);
