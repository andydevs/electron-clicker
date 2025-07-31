import { Epic } from 'redux-observable'
import { bufferCount, filter, interval, map, scan, withLatestFrom } from 'rxjs'
import { update as updateElectrons } from '../electrons'
import { AppAction, RootState } from '../state'
import { itemSlices } from './state'
import { ItemName } from './config'
import { unitFloorBasedOnState } from '../number-format'

const msPerSec = 1000
const msPerInterval = 100

type TickState = {
    publish: number
    current: number
}
export const gameTickEpic: Epic<AppAction, AppAction, RootState> = (_action$, state$) => {
    return interval(msPerInterval).pipe(
        map((_interval): number => performance.now()),
        bufferCount(2, 1),
        map(([last, now]): number => (now - last) / msPerSec),
        withLatestFrom(state$),
        map(([dt, state]: [number, RootState]) => {
            const electronRate = Object.entries(itemSlices)
                .map(([, slice]) => {
                    const number = state.items[slice.params.id as ItemName]
                    return number * slice.params.electronsPerSec
                })
                .reduce((total, electrons) => total + electrons, 0)
            const newElectrons = electronRate * dt
            return [state.electronCount, newElectrons] as const
        }),
        scan(
            (ts: TickState, [currElectrons, newElectrons]: [number, number]): TickState => {
                const next = { publish: 0, current: ts.current + newElectrons }
                next.publish = unitFloorBasedOnState(currElectrons, next.current)
                next.current -= next.publish
                return next
            },
            { publish: 0, current: 0 } as TickState
        ),
        filter((state) => state.publish > 0),
        map((state): AppAction => updateElectrons(state.publish))
    )
}
