import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from "./actionTypes";

export const login = () => {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
        //eslint-disable-next-line no-undef
        VK.Auth.login((r) => {
            if (r.session) {
                const username = r.session.user.first_name;
                const mid = r.session.mid;
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        username: username,
                        mid: mid,
                    },
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    error: true,
                    payload: new Error("Ошибка авторизации"),
                });
            }
        }, 4); // запрос прав на доступ к photo
    };
};

export const logout = () => {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        //eslint-disable-next-line no-undef
        VK.Auth.logout((r) => {
            console.log("~ r: ", r);
            if (r) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                });
            } else {
                dispatch({
                    type: LOGOUT_FAIL,
                    error: true,
                    payload: new Error("LogOut ERROR"),
                });
            }
        });
    };
};
