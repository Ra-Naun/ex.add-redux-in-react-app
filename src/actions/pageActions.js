import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from "./actionTypes";

let photosArr = [];

export const getPhotos = (year, mid) => {
    return (dispatch) => {
        photosArr = [];
        dispatch({
            type: GET_PHOTOS_REQUEST,
            payload: year,
        });

        getMorePhotos(0, 200, year, dispatch, mid);
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
    console.log("getMorePhotos mid: ", mid);
    //eslint-disable-next-line no-undef
    VK.Api.call("photos.getAll", { owner_id: mid, extended: 1, count: count, offset: offset, v: "5.80" }, (r) => {
        try {
            photosArr = [...photosArr, ...r.response.items];
            if (offset <= r.response.count) {
                offset += 200; // максимальное количество фото которое можно получить за 1 запрос
                getMorePhotos(offset, count, year, dispatch, mid);
            } else {
                let photos = makeYearPhotos(photosArr, year);
                //cached = true;
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
