import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL, SET_SEARCH_MID, RESTORE_DEFAULT_SEARCH_MID, SET_DEFAULT_SEARCH_MID } from "../actions/actionTypes";

const initialState = {
    search_mid: null,
    default_search_mid: null,
    year: null,
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
        case SET_SEARCH_MID:
            return { ...state, search_mid: action.payload };
        case SET_DEFAULT_SEARCH_MID:
            return { ...state, default_search_mid: action.payload };
        case RESTORE_DEFAULT_SEARCH_MID:
            return { ...state, search_mid: state.default_search_mid };
        default:
            return state;
    }
};
