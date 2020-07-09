import UserActionTypes from './userTypes';
import { saveErrorMessage } from './userUtils';

const INITIAL_STATE = {
    isLoggedIn: false,
    username: null,
    email: null,
    loading: false,
    validUntil: null,
    errMessage: null,
    guest: {
        username: 'GuestUser',
        password: '123456'
    }
};

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UserActionTypes.LOGIN_START:
        case UserActionTypes.UPDATE_PROFILE_START:
            return { ...state, loading: true }

        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                errMessage: null,
                loading: false,
                isLoggedIn: true,
                ...action.payload,
            }
        case UserActionTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                errMessage: null,
                loading: false,
                ...action.payload
            }

        case UserActionTypes.LOGIN_FAILURE:
        case UserActionTypes.UPDATE_PROFILE_FAILURE:
            return saveErrorMessage(state, action)
        case UserActionTypes.LOGOUT:
            console.log('Logging out..\nuser state:', state, '\nDisconnecting from chat...')
            // SOCKET SHOULD EMIT USER DISCONNECTED AFTER LOGOUT
            return state
        default:
            return state
    }
};

export default userReducer;