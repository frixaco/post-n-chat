import PostActionTypes from './postsTypes';
import { saveErrorMessage } from './postUtils';

const INITIAL_STATE = {
    items: [],
    areFetching: false,
    errMessage: null
};

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS_START:
        case PostActionTypes.NEW_POST_START:
        case PostActionTypes.EDIT_POST_START:
        case PostActionTypes.DELETE_POST_START:
            return {
                ...state,
                areFetching: true
            }

        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state, areFetching: false,
                items: action.payload
            }
        case PostActionTypes.NEW_POST_SUCCESS:
            return {
                ...state, areFetching: false,
                items: [action.payload, ...state.items]
            };
        case PostActionTypes.EDIT_POST_SUCCESS:
            return {
                ...state, areFetching: false,
                items: state.items.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case PostActionTypes.DELETE_POST_SUCCESS:
            return {
                ...state, areFetching: false,
                items: state.items.filter(post => post._id !== action.payload)
            }

        case PostActionTypes.FETCH_POSTS_FAILURE:
        case PostActionTypes.DELETE_POST_FAILURE:
        case PostActionTypes.EDIT_POST_FAILURE:
        case PostActionTypes.NEW_POST_FAILURE:
            return saveErrorMessage(state, action)
        default:
            return state;
    }
};

export default postReducer;