import UserActionTypes from "./userTypes";
import Axios from "axios";

// LOG IN
export const loginUserStart = () => ({ type: UserActionTypes.LOGIN_START });
export const loginUserSuccess = (user) => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  payload: user,
});
export const loginUserFailure = (errMessage) => ({
  type: UserActionTypes.LOGIN_FAILURE,
  payload: errMessage,
});
export const loginUserAsync = (user) => (dispatch) => {
  dispatch(loginUserStart());
  Axios.post("auth/login", {
    username: user.username,
    password: user.password,
  })
    .then((response) => dispatch(loginUserSuccess(response.data)))
    .catch((err) => dispatch(loginUserFailure(err.message)));
};

// UPDATE PROFILE
export const updateUserStart = () => ({
  type: UserActionTypes.UPDATE_PROFILE_START,
});
export const updateUserSuccess = (user) => ({
  type: UserActionTypes.UPDATE_PROFILE_SUCCESS,
  payload: user,
});
export const updateUserFailure = (errMessage) => ({
  type: UserActionTypes.UPDATE_PROFILE_FAILURE,
  payload: errMessage,
});
export const updateUserAsync = (user) => (dispatch) => {
  dispatch(updateUserStart());
  Axios.post(`profile/${user.key}`, { [user.key]: user.value })
    .then((response) => dispatch(updateUserSuccess(response.data)))
    .catch((err) => dispatch(updateUserFailure(err.message)));
};

// LOGOUT
export const logoutUser = () => ({ type: UserActionTypes.LOGOUT });
