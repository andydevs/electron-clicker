import { AppAction, RootState } from './state'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { electronCountReducer } from './electrons'
import { itemReducers } from './items/state'
import { gameTickEpic } from './items/generate'

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, RootState>()

export const store = configureStore({
    reducer: {
        electronCount: electronCountReducer,
        items: combineReducers(itemReducers)
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(gameTickEpic)

export type AppState = RootState
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
