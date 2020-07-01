import UserActionTypes from './userTypes';

// TRY export FOR EACH ACTION
export const loginUser = user => ({
    type: UserActionTypes.LOGIN,
    payload: user,
});

export const logoutUser = username => ({
    type: UserActionTypes.LOGOUT,
    payload: username,
});

export const updateUser = user => ({
    type: UserActionTypes.LOGIN,
    payload: user,
});