import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from "../actions/actionTypes";

const initialState = {
    year: 2021,
    photos: [],
    isFetching: false,
    error: "",
};

export const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            return { ...state, year: action.payload, isFetching: true, photos: [] };

        case GET_PHOTOS_SUCCESS:
            return { ...state, photos: action.payload, isFetching: false };
        case GET_PHOTOS_FAIL:
            return { ...state, isFetching: false, error: action.payload.message };
        default:
            return state;
    }
};
