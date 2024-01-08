"use client"
import { persistStore, persistReducer } from "redux-persist"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slice"
import storage from "./storage"


const rootReducer = combineReducers({
    counter: counterReducer,
})

// const reducer = {
//     counter: counterReducer
// }

const persistConfig = {
    key: "root",
    storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer: persistedReducer});
// export const store = configureStore({reducer: rootReducer})

export const persistor = persistStore(store);
