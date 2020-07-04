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
                dispatch(initialPostsFetchSuccess(response.data.posts))
            }).catch(err => dispatch(initialPostsFetchFailure(err.message)));
    }
}


export const updatePost = post => ({
    type: PostActionTypes.UPDATE_POST,
    payload: post
});

export const deletePost = postId => ({
    type: PostActionTypes.DELETE_POST,
    payload: postId
});