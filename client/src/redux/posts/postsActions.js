import PostActionTypes from "./postsTypes";
import Axios from "axios";

// CREATE POST
export const createPostStart = () => ({ type: PostActionTypes.NEW_POST_START });
export const createPostSuccess = (post) => ({
  type: PostActionTypes.NEW_POST_SUCCESS,
  payload: post,
});
export const createPostFailure = (errMessage) => ({
  type: PostActionTypes.NEW_POST_FAILURE,
  payload: errMessage,
});
export const createPostAsync = (post) => (dispatch) => {
  dispatch(createPostStart());
  Axios.post("/post", post)
    .then((response) => {
      dispatch(createPostSuccess(response.data.post));
    })
    .catch((err) => dispatch(createPostFailure(err.message)));
};

// FETCH ALL POSTS
export const fetchPostsStart = () => ({
  type: PostActionTypes.FETCH_POSTS_START,
});
export const fetchPostsSuccess = (posts) => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});
export const fetchPostsFailure = (errMessage) => ({
  type: PostActionTypes.FETCH_POSTS_FAILURE,
  payload: errMessage,
});
export const fetchPostsAsync = () => (dispatch) => {
  dispatch(fetchPostsStart());
  Axios.get("/post")
    .then((response) =>
      dispatch(fetchPostsSuccess(response.data.posts.reverse()))
    )
    .catch((err) => dispatch(fetchPostsFailure(err.message)));
};

// EDIT POST
export const editPostStart = () => ({ type: PostActionTypes.EDIT_POST_START });
export const editPostSuccess = (post) => ({
  type: PostActionTypes.EDIT_POST_SUCCESS,
  payload: post,
});
export const editPostFailure = (errMessage) => ({
  type: PostActionTypes.EDIT_POST_FAILURE,
  payload: errMessage,
});
export const editPostAsync = (post) => (dispatch) => {
  dispatch(editPostStart());
  Axios.post(`/post/${post._id}`, post)
    .then((response) => dispatch(editPostSuccess(response.data.post)))
    .catch((err) => dispatch(editPostFailure(err.message)));
};

// DELETE POST
export const deletePostStart = () => ({
  type: PostActionTypes.DELETE_POST_START,
});
export const deletePostSuccess = (postid) => ({
  type: PostActionTypes.DELETE_POST_SUCCESS,
  payload: postid,
});
export const deletePostFailure = (errMessage) => ({
  type: PostActionTypes.DELETE_POST_FAILURE,
  payload: errMessage,
});
export const deletePostAsync = (postid) => (dispatch) => {
  dispatch(deletePostStart());
  Axios.delete(`/post/${postid}`)
    .then(() => dispatch(deletePostSuccess(postid)))
    .catch((err) => dispatch(deletePostFailure(err.message)));
};
