import { SET_USER_NAME, SET_USER_AUTHORIZED } from "../actions/actionTypes";

const initialState = {
    name: "$�anon�mous��_�",
    isAuthorized: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_USER_AUTHORIZED:
            return { ...state, isAuthorized: action.payload };
        default:
            return state;
    }
};
