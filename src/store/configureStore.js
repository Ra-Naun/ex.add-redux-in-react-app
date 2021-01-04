import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers/index";
import logger from "redux-logger";

export const store = createStore(rootReducer, applyMiddleware(logger));
