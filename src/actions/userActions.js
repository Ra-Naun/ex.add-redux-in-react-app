import { SET_USER_NAME, SET_USER_AUTHORIZED } from "./actionTypes";

export const setUserName = (name) => {
    return {
        type: SET_USER_NAME,
        payload: name,
    };
};

export const setIsAuthorized = (isAuthorized) => {
    return {
        type: SET_USER_AUTHORIZED,
        payload: isAuthorized,
    };
};
