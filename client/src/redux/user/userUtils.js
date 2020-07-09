export function saveErrorMessage(state, action) {
    return {
        ...state,
        loading: false,
        errMessage: action.payload
    }
}