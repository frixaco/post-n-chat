import ChatActionTypes from './chatTypes';

const INITIAL_STATE = {
    chatHistory: [],
    usersOnline: [],
};

const chatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ChatActionTypes.NEW_MESSAGE:
            return {
                ...state,
                chatHistory: [...state.chatHistory, action.payload]
            }
        case ChatActionTypes.USER_ONLINE:
            return {
                ...state,
                usersOnline: action.payload
            }
        default:
            return state
    }
};

export default chatReducer;