import PostActionTypes from './postTypes';

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