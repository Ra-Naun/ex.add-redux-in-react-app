import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, SET_SEARCH_MID, RESTORE_DEFAULT_SEARCH_MID } from "./actionTypes";

const ActionsFactory = (type) => (payload) => (dispatch) => dispatch({ type, payload });
export const setSearchMID = ActionsFactory(SET_SEARCH_MID);
export const restoreDefaultSearchMID = ActionsFactory(RESTORE_DEFAULT_SEARCH_MID);

let photosArr = [];
let cached = false;
let chahed_mid = null;

export const getPhotos = (year, mid) => {
    return (dispatch) => {
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year,
        });

        if (chahed_mid !== mid) {
            //если запрос по данному пользователю/группе не повторный
            cached = false;
            photosArr = [];
        }
        if (cached) {
            let yearPhotos = makeYearPhotos(photosArr, year);
            dispatch({
                type: GET_PHOTOS_SUCCESS,
                payload: yearPhotos,
            });
        } else {
            chahed_mid = mid;
            getMorePhotos(0, 200, year, dispatch, mid);
        }
    };
};

const makeYearPhotos = (photos, selectedYear) => {
    let createdYear,
        yearPhotos = [];

    photos.forEach((item) => {
        createdYear = new Date(item.date * 1000).getFullYear();
        if (createdYear === selectedYear) {
            yearPhotos.push(item);
        }
    });

    yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

    return yearPhotos;
};

const getMorePhotos = (offset, count, year, dispatch, mid) => {
    //eslint-disable-next-line no-undef
    VK.Api.call("photos.getAll", { owner_id: mid, extended: 1, count: count, offset: offset, v: "5.80" }, (r) => {
        try {
            console.log("getMorePhotos response: ", r);
            photosArr = [...photosArr, ...r.response.items];
            if (offset <= r.response.count) {
                offset += 200; // максимальное количество фото которое можно получить за 1 запрос
                getMorePhotos(offset, count, year, dispatch, mid);
            } else {
                let photos = makeYearPhotos(photosArr, year);
                cached = true;
                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: photos,
                });
            }
        } catch (e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e),
            });
        }
    });
};
