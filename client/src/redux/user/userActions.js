import UserActionTypes from './userTypes';
import Axios from 'axios';

// LOGIN
export const serverCallStart = () => ({
    type: UserActionTypes.SERVER_CALL_START
});

export const loginUserSuccess = user => ({
    type: UserActionTypes.LOGIN_SUCCESS,
    payload: user, // username and validUntil
});

export const loginUserFailure = errMessage => ({
    type: UserActionTypes.LOGIN_FAILURE,
    payload: errMessage,
});

export const loginUserAsync = user => {
    return dispatch => {
        dispatch(serverCallStart());
        Axios.post('/auth/login', user)
            .then(response => {
                dispatch(loginUserSuccess({
                    username: user.username,
                    email: response.data.email,
                    validUntil: response.data.validUntil
                }))
            })
            .catch(err => dispatch(loginUserFailure(err.message)))
    }
}

// LOGOUT
export const logoutUser = username => ({
    type: UserActionTypes.LOGOUT,
    payload: username,
});


export const updateUserSuccess = user => ({
    type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
    payload: user,
});
export const updateUserFailure = errMessage => ({
    type: UserActionTypes.UPDATE_PROFILE_FAILURE,
    payload: errMessage,
});
export const updateUserAsync = user => {
    return dispatch => {
        dispatch(serverCallStart());
        Axios.post(`profile/${user.key}`, { [user.key]: user.value })
            .then(response => {
                dispatch(updateUserSuccess(user))
            }).catch(err => dispatch(updateUserFailure(err.message)))
    }
}