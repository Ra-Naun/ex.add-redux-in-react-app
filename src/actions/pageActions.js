import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS } from "./actionTypes";

import logo from "../media/logo.svg"; //~dell

export const getPhotos = (year) => {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year,
        });

        setTimeout(() => {
            const _ex_arr_photos = [];
            for (let i = 0; i < Math.random() * 100; i++) _ex_arr_photos.push(logo);
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: _ex_arr_photos,
            });
        }, 1000);
    };
};
