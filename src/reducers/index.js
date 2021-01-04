import { combineReducers } from "redux";
import { userReducer } from "./user";
import { pageReducer } from "./page";

export const rootReducer = combineReducers({ user: userReducer, page: pageReducer });
