import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { bookReducer } from "./reducer/bookReducer";
import { authReducer } from "./reducer/authReducer";
import { thunk } from "redux-thunk";

const rootReducer=combineReducers({
    auth:authReducer,
    books:bookReducer
})

 export const store=createStore(rootReducer,applyMiddleware(thunk))