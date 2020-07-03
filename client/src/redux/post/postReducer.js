import PostActionTypes from './postTypes';

const INITIAL_STATE = {
    posts: [],
    areFetching: false,
    errMessage: null
};

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS_START:
            return {
                ...state,
                areFetching: true
            }
        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                areFetching: false,
                posts: action.payload
            }
        case PostActionTypes.FETCH_POSTS_FAILURE:
            return {
                ...state,
                areFetching: false,
                errMessage: action.payload
            }
        case PostActionTypes.NEW_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case PostActionTypes.EDIT_POST:
            return {
                ...state,
                posts: state.posts.map(post => post.postId === action.payload.postId ? action.payload : post)
            }
        case PostActionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.postId !== action.payload.postId)
            }
        default:
            return state;
    }
};

export default postReducer;