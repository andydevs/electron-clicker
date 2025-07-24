import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { electronCountReducer } from "./electrons";
import { gunReducer } from "./gun";

export const store = configureStore({
    reducer: {
        electronCount: electronCountReducer,
        items: combineReducers({
            electronGun: gunReducer
        })
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store