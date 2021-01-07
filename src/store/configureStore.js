import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers/index";
import logger from "redux-logger";
import thunk from "redux-thunk";
//eslint-disable-next-line
const mw = (store) => (next) => (action) => {
    console.log("mv store: ", store);
    console.log("mv next: ", next);
    console.log("mv action: ", action);
    const hz = next(action);
    console.log("mv hz: ", hz);
    console.log("mv store: ", store);
    return hz;
};

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
