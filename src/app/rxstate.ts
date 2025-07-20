import { scan, BehaviorSubject } from "rxjs";


export const emitElectronSubject$ = new BehaviorSubject<number>(0)

export const electronCount$ = emitElectronSubject$.asObservable()
    .pipe(scan((total: number, n: number): number => total + n, 0))