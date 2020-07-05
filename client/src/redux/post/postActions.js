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


export const createPostStart = () => ({ type: PostActionTypes.NEW_POST_START })
export const createPostSuccess = post => ({
    type: PostActionTypes.NEW_POST_SUCCESS,
    payload: post
})
export const createPostFailure = errMessage => ({
    type: PostActionTypes.NEW_POST_FAILURE,
    payload: errMessage
})
export const createPostAsync = post => {
    return dispatch => {
        dispatch(createPostStart());
        Axios.post('/post', post)
            .then(response => {
                dispatch(createPostSuccess(post))
            }).catch(err => dispatch(createPostFailure(err.message)));
    }
}

export const initialPostsFetchStarted = () => ({
    type: PostActionTypes.INITIAL_FETCH_POSTS_START
})
export const initialPostsFetchSuccess = posts => ({
    type: PostActionTypes.INITIAL_FETCH_POSTS_SUCCESS,
    payload: posts
})
export const initialPostsFetchFailure = errMessage => ({
    type: PostActionTypes.INITIAL_FETCH_POSTS_FAILURE,
    payload: errMessage
})
export const initialPostsFetchAsync = () => {
    return dispatch => {
        dispatch(initialPostsFetchStarted());
        Axios.get('/post')
            .then(response => {
                dispatch(initialPostsFetchSuccess(response.data.posts.reverse()))
            }).catch(err => dispatch(initialPostsFetchFailure(err.message)));
    }
}


export const editPostStart = () => ({
    type: PostActionTypes.EDIT_POST_START,
});
export const editPostSuccess = post => ({
    type: PostActionTypes.EDIT_POST_SUCCESS,
    payload: post
});
export const editPostFailure = errMessage => ({
    type: PostActionTypes.EDIT_POST_FAILURE,
    payload: errMessage
});
export const editPostAsync = post => {
    console.log('Incoming edited post and its id:', post, post._id)
    return dispatch => {
        dispatch(editPostStart())
        Axios.post(`/post/${post._id}`, post)
            .then(response => {
                dispatch(editPostSuccess(post))
            }).catch(err => dispatch(editPostFailure(err.message)))
    }
}

export const deletePostStart = () => ({
    type: PostActionTypes.DELETE_POST_START,
});
export const deletePostSuccess = postid => ({
    type: PostActionTypes.DELETE_POST_SUCCESS,
    payload: postid
})
export const deletePostFailure = errMessage => ({
    type: PostActionTypes.DELETE_POST_FAILURE,
    payload: errMessage
})
export const deletePostAsync = postid => {
    return dispatch => {
        dispatch(deletePostStart())
        Axios.delete(`/post/${postid}`)
            .then(() => {
                dispatch(deletePostSuccess(postid))
            }).catch(err => dispatch(deletePostFailure(err.message)))
    }
}