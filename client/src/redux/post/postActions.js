import PostActionTypes from './postTypes';
import Axios from 'axios';


export const fetchPostsStart = () => ({ type: PostActionTypes.FETCH_POSTS_START })

export const fetchPostsSuccess = posts => ({
    type: PostActionTypes.FETCH_POSTS_SUCCESS,
    payload: posts
})

export const fetchPostsFailure = errMessage => ({
    type: PostActionTypes.FETCH_POSTS_FAILURE,
    payload: errMessage
})

export const fetchPostsAsync = username => {
    return dispatch => {
        dispatch(fetchPostsStart());
        Axios.post('/post/my', { username })
            .then(response => {
                dispatch(fetchPostsSuccess(response.data.posts))
            }).catch(err => dispatch(fetchPostsFailure(err.message)));
    }
}

export const createPost = post => ({
    type: PostActionTypes.NEW_POST,
    payload: post
});

export const updatePost = post => ({
    type: PostActionTypes.UPDATE_POST,
    payload: post
});

export const deletePost = postId => ({
    type: PostActionTypes.DELETE_POST,
    payload: postId
});