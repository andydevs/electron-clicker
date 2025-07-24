import { configureStore } from "@reduxjs/toolkit";
import { electronCountReducer } from "./electrons";

export const store = configureStore({
    reducer: {
        electronCount: electronCountReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store