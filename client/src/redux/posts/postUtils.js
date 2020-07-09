export function saveErrorMessage(state, action) {
    return {
        ...state,
        areFetching: false,
        errMessage: action.payload
    }
}