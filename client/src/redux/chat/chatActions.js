import ChatActionTypes from './chatTypes';

// TRY export FOR EACH ACTION
export const newMessage = message => ({
    type: ChatActionTypes.NEW_MESSAGE,
    payload: message,
});

export const userOnline = username => ({
    type: ChatActionTypes.USER_ONLINE,
    payload: username,
});