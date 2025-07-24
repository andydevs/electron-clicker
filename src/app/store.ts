import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import { electronCountReducer, update as updateElectrons, ElectonCountAction } from "./electrons";
import { gunReducer, electronGunParams, GunAction } from "./gun";
import { betaDecayReducer, betaDecayParams, BetaDecayAction } from "./betadecaymaterial";
import { filter, interval, map, scan, withLatestFrom } from "rxjs";

type AppRootState = {
    electronCount: number,
    items: {
        electronGun: number,
        betaDecayMaterial: number,
    }
}
type AppAction = ElectonCountAction | GunAction | BetaDecayAction

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, AppRootState>()

const msPerSec = 1000

type TickState = {
    publish: number,
    current: number
}

const gameTickEpic: Epic<AppAction, AppAction, AppState> = (_action$, state$) => {
    const msPerInterval = 100
    const dt = msPerInterval / msPerSec
    return interval(msPerInterval).pipe(
        withLatestFrom(state$),
        map(([, state]) => {
            const nGuns = state.items.electronGun
            const electronsFromGun = nGuns*electronGunParams.electronsPerSec
            const newElectrons = electronsFromGun*dt
            return [state.electronCount, newElectrons]
        }),
        scan((ts: TickState, [,newElectrons]: [number, number]): TickState => {
            const next = { publish: 0, current: ts.current + newElectrons }
            next.publish = Math.floor(next.current)
            next.current -= next.publish
            return next
        }, { publish: 0, current: 0 }),
        filter((state) => state.publish > 0),
        map((state) => updateElectrons(state.publish))
    )
}

export const store = configureStore({
    reducer: {
        electronCount: electronCountReducer,
        items: combineReducers({
            electronGun: gunReducer,
            betaDecayMaterial: betaDecayReducer
        })
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
})

epicMiddleware.run(gameTickEpic)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

