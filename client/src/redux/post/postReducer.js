import PostActionTypes from './postTypes';

const INITIAL_STATE = {
    posts: [],
    areFetching: false,
    errMessage: null
};

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostActionTypes.INITIAL_FETCH_POSTS_START:
            return {
                ...state,
                areFetching: true,
            }
        case PostActionTypes.INITIAL_FETCH_POSTS_SUCCESS:
            return {
                ...state,
                areFetching: false,
                posts: action.payload
            }
        case PostActionTypes.INITIAL_FETCH_POSTS_FAILURE:
            return {
                ...state,
                areFetching: false,
                errMessage: action.payload
            }
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
        case PostActionTypes.NEW_POST_START:
            return {
                ...state,
                areFetching: true,
            }
        case PostActionTypes.NEW_POST_SUCCESS:
            return {
                ...state,
                areFetching: false,
                posts: [...state.posts, action.payload]
            };
        case PostActionTypes.NEW_POST_FAILURE:
            return {
                ...state,
                areFetching: false,
                errMessage: action.payload
            };
        case PostActionTypes.EDIT_POST_START:
            return {
                ...state,
                areFetching: true,
            }
        case PostActionTypes.EDIT_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case PostActionTypes.EDIT_POST_FAILURE:
            return {
                ...state,
                errMessage: action.payload
            }
        case PostActionTypes.DELETE_POST_START:
            return {
                ...state,
                areFetching: true
            }
        case PostActionTypes.DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case PostActionTypes.DELETE_POST_FAILURE:
            return {
                ...state,
                errMessage: action.payload
            }
        default:
            return state;
    }
};

export default postReducer;