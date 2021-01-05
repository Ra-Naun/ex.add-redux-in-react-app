import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/actionTypes";

const initialState = {
    name: "$�anon�mous��_�",
    isFetching: false,
    isAuthorized: false,
    error: "",
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isAuthorized: false, isFetching: true, error: "" };
        case LOGIN_SUCCESS:
            return { ...state, isAuthorized: true, isFetching: false, name: action.payload };
        case LOGIN_FAIL:
            return { ...state, isFetching: false, error: action.payload.message };
        default:
            return state;
    }
};
