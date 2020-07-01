import PostActionTypes from './postTypes';

const INITIAL_STATE = [];

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostActionTypes.NEW_POST:
            return [
                ...state,
                action.payload
            ];
        case PostActionTypes.EDIT_POST:
            return state.map(post => post.postId === action.payload.postId ? action.payload : post);
        case PostActionTypes.DELETE_POST:
            return state.filter(post => post.postId !== action.payload.postId)
        default:
            return state;
    }
};

export default postReducer;