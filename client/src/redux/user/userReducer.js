import UserActionTypes from './userTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    username: null,
    email: null,
    password: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            const { username, email, password } = action.payload
            return {
                isAuthenticated: true,
                username, email, password
            }
        case UserActionTypes.LOGOUT:
            return {
                isAuthenticated: false,
                username: null,
                email: null,
                password: null
            }
        case UserActionTypes.UPDATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};

export default userReducer;