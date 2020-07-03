import UserActionTypes from './userTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    username: null,
    email: null,
    isFetching: false,
    validUntil: null,
    errMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SERVER_CALL_START:
            return {
                ...state,
                isFetching: true,
            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                ...action.payload,
            }
        case UserActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                errMessage: action.payload
            }
        case UserActionTypes.LOGOUT:
            return {
                isAuthenticated: false,
                username: null,
                email: null,
                validUntil: null,
                errMessage: null,
            }
        case UserActionTypes.UPDATE_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};

export default userReducer;