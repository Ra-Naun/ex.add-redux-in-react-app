import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL, SET_SEARCH_MID } from "../actions/actionTypes";

const initialState = {
    name: "$�anon�mous��_�",
    mid: null,
    search_mid: null,
    isFetching: false,
    isAuthorized: false,
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isAuthorized: false, isFetching: true, error: "" };
        case LOGIN_SUCCESS:
            return { ...state, isAuthorized: true, isFetching: false, name: action.payload.username, mid: action.payload.mid };
        case LOGIN_FAIL:
            return { ...state, isFetching: false, error: action.payload.message };
        case LOGOUT_REQUEST:
            return { ...state, isFetching: true, error: "" };
        case LOGOUT_SUCCESS:
            return { ...initialState };
        case LOGOUT_FAIL:
            return { ...state, isFetching: false, error: action.payload.message };
        default:
            return state;
    }
};
