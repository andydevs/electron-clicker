import { BehaviorSubject, map, withLatestFrom, filter, interval, skipWhile } from "rxjs"
import { accumulate, expScale, getitem } from "./rxhelper"
import { electronCount$, emitElectronSubject$ } from "./rxstate"

// Electron Gun
const addElectronGunSubject$ = new BehaviorSubject<number>(0)
export const electronGunCount$ = accumulate(addElectronGunSubject$.asObservable())
export const electronGunCost$ = map(expScale(14, 1.12))(electronGunCount$)

// Attempt buy
export const buyElectronGunSubject$ = new BehaviorSubject<number>(0)
buyElectronGunSubject$.asObservable()
    .pipe(
        withLatestFrom(electronGunCost$, electronCount$),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        filter(([_, cost, balance]) => cost < balance),
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    .subscribe(([inc, cost, _]) => {
        const total = -inc*cost
        addElectronGunSubject$.next(inc)
        emitElectronSubject$.next(total)
    })

// Emit electrons from gun at 1 electron per second per gun
interval(1000)
    .pipe(
        withLatestFrom(electronGunCount$),
        getitem(1),
        skipWhile(count => count === 0)
    )
    .subscribe(emitElectronSubject$)