import { Epic } from 'redux-observable'
import { filter, interval, map, scan, withLatestFrom } from "rxjs";
import { update as updateElectrons } from "../electrons";
import { AppAction, RootState } from '../state';
import { itemSlices } from './state';
import { ItemName } from './config';

const msPerSec = 1000
type TickState = {
    publish: number,
    current: number
}
export const gameTickEpic: Epic<AppAction, AppAction, RootState> = (_action$, state$) => {
    const msPerInterval = 100
    const dt = msPerInterval / msPerSec
    return interval(msPerInterval).pipe(
        withLatestFrom(state$),
        map(([,state]) => {
            const electronRate = Object.entries(itemSlices)
                .map(([,slice]) => {
                    const number = state.items[slice.params.id as ItemName]
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
