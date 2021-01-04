import { SET_YEAR } from "./actionTypes";

export const setYear = (year) => {
    return {
        type: SET_YEAR,
        payload: year,
    };
};
