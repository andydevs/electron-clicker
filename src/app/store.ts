import { RootState } from "./state";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import { filter, interval, map, scan, withLatestFrom } from "rxjs";
import { electronCountReducer, update as updateElectrons, ElectonCountAction } from "./electrons";
import { createItemSlice } from "./item";

export const items = {
    electronGun: createItemSlice({
        name: 'electronGun',
        displayName: 'Electron Gun',
        initialCost: 14,
        costGrowth: 1.25,
        electronsPerSec: 1
    }),
    betaDecayMaterial: createItemSlice({
        name: 'betaDecayMaterial',
        displayName: 'Beta Decay Material',
        initialCost: 72,
        costGrowth: 1.50,
        electronsPerSec: 8
    })
}

type ItemAction = ReturnType<typeof items[keyof typeof items]['slice']['actions']['increment']>
type AppAction = ElectonCountAction | ItemAction

const epicMiddleware = createEpicMiddleware<AppAction, AppAction, RootState>()

const msPerSec = 1000
type TickState = {
    publish: number,
    current: number
}
const gameTickEpic: Epic<AppAction, AppAction, RootState> = (_action$, state$) => {
    const msPerInterval = 100
    const dt = msPerInterval / msPerSec
    return interval(msPerInterval).pipe(
        withLatestFrom(state$),
        map(([, state]) => {
            const electronRate = Object.entries(items)
                .map(([,slice]) => {
                    const number = state.items[slice.params.name]
                    return number*slice.params.electronsPerSec
                })
                .reduce((total, electrons) => total + electrons, 0)
            const newElectrons = electronRate*dt
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

type ItemReducers = {
    // eslint-disable-next-line no-unused-vars
    [_K in keyof RootState['items']]: Reducer<number>
}
const itemReducers = Object.entries(items).reduce<ItemReducers>((acc, [key, { reducer }]) => {
    acc[key as keyof RootState['items']] = reducer
    return acc
}, {} as ItemReducers)

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

