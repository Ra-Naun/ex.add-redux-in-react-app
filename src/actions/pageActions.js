import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, SET_SEARCH_MID, RESTORE_DEFAULT_SEARCH_MID } from "./actionTypes";

const ActionsFactory = (type) => (payload) => (dispatch) => dispatch({ type, payload });
export const setSearchMID = ActionsFactory(SET_SEARCH_MID);
export const restoreDefaultSearchMID = ActionsFactory(RESTORE_DEFAULT_SEARCH_MID);
const ActionGetPhotosSucces = ActionsFactory(GET_PHOTOS_SUCCESS);
const ActionGetPhotosFail = ActionsFactory(GET_PHOTOS_FAIL);
const ActionGetPhotosRequest = ActionsFactory(GET_PHOTOS_REQUEST);

let AllUserPhotos = [];
let cached = false;
let chahed_mid = null;

// filters.likes:
//     1 = descending sort
//     0 = not sort
//     -1 = ascending sort
export const getAllPhotos = (filters = { year: 0, likes: 0, mid: 0 }) => {
    return (dispatch) => {
        dispatch(ActionGetPhotosRequest(filters.year));

        if (chahed_mid !== filters.mid) {
            //если запрос по данному пользователю/группе не повторный
            cached = false;
            AllUserPhotos = [];
        }

        if (!cached) {
            //use revealing constructor pattern
            const promise = new Promise((resolve, reject) => {
                chahed_mid = filters.mid;
                fetchMorePhotos(0, 200, filters.mid, { resolve, reject });
            });

            // promise.then навешивает обработчики на успешный результат или ошибку
            promise.then(
                (result) => {
                    // первая функция-обработчик - запустится при вызове resolve
                    console.log("Fulfilled: ", result); // result - аргумент resolve
                    AllUserPhotos = result; //cached
                    cached = true;
                    SortPhotosAndDispatch();
                },
                (error) => {
                    // вторая функция - запустится при вызове reject
                    console.log("Rejected: ", error); // error - аргумент reject
                    dispatch(ActionGetPhotosFail(new Error(error)));
                    return;
                }
            );
        } else SortPhotosAndDispatch();

        function SortPhotosAndDispatch() {
            let photos = [...AllUserPhotos];
            if (filters.year) photos = selectByOneYear(photos, filters.year);
            photos = sortByLikes(photos, filters.likes);
            dispatch(ActionGetPhotosSucces(photos));
        }
    };
};

const selectByOneYear = (photos, selectedYear) => {
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

const sortByLikes = (photos, sort) => {
    let yearPhotos = [...photos];
    switch (sort) {
        case 1:
            return yearPhotos.sort((a, b) => a.likes.count - b.likes.count);
        case -1:
            return yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

        default:
            return yearPhotos;
    }
};

const fetchMorePhotos = (offset, count, mid, promise) => {
    let photosArr = [];
    const idTimeout = setTimeout(() => {
        promise.reject(new Error("Timeout Error"));
    }, 10000);

    (function downloadPart() {
        //eslint-disable-next-line no-undef
        VK.Api.call("photos.getAll", { owner_id: mid, extended: 1, count: count, offset: offset, v: "5.80" }, (r) => {
            try {
                photosArr = [...photosArr, ...r.response.items];
                if (offset <= r.response.count) {
                    offset += 200; // максимальное количество фото которое можно получить за 1 запрос
                    downloadPart();
                } else {
                    clearTimeout(idTimeout);
                    promise.resolve(photosArr);
                }
            } catch (e) {
                promise.reject(e);
            }
        });
    })();
};
