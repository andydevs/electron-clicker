import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import { electronCountReducer, update as updateElectrons, ElectonCountAction } from "./electrons";
import { gunReducer, electronGunParams, GunAction } from "./gun";
import { interval, map, tap, withLatestFrom } from "rxjs";

type AppRootState = {
    electronCount: number,
    items: {
        electronGun: number
    }
}
type AppAction = ElectonCountAction | GunAction

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppRootState>()

const msPerSec = 1000

const gameTickEpic: Epic<AppAction, AppAction, AppState> = (_action$, state$) => {
    const msPerInterval = 1000
    const dt = msPerInterval / msPerSec
    return interval(msPerInterval).pipe(
        withLatestFrom(state$),
        map(([, state]) => {
            const nGuns = state.items.electronGun
            const electronsFromGun = nGuns*electronGunParams.electronsPerSec
            const totalElectrons = electronsFromGun*dt
            return totalElectrons
        }),
        map((electrons) => updateElectrons(electrons)),
        tap((act) => { console.log('Generated from tick:', act)})
    )
}

export const store = configureStore({
    reducer: {
        electronCount: electronCountReducer,
        items: combineReducers({
            electronGun: gunReducer
        })
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(gameTickEpic)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

