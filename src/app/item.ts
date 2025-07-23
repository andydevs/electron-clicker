import { 
    Subject,
    BehaviorSubject,
    Observable,
    Subscription,
    interval,
    map,
    withLatestFrom,
    filter,
    skipWhile
} from "rxjs"
import { 
    accumulate,
    expScale,
    getitem
} from "./rxhelper"


export type ItemTypeParams = {
    interval: number,
    multiplier: number,
    initialCost: number,
    costGrowth: number
}

export class ItemType {
    buySubject$: Subject<number>
    count$: Observable<number>
    cost$: Observable<number>

    private addSubject$: Subject<number>
    private emitter$: Observable<number>
    private emitterSubscription: Subscription
    private buySubscription: Subscription

    constructor(params: ItemTypeParams) {
        this.buySubject$ = new BehaviorSubject<number>(0)
        this.addSubject$ = new BehaviorSubject<number>(0)
        this.count$ = accumulate(this.addSubject$.asObservable())
        this.cost$ = map(expScale(params.initialCost, params.costGrowth))(this.count$)
        this.emitter$ = interval(params.interval)
            .pipe(
                withLatestFrom(this.count$),
                getitem(1),
                skipWhile(count => count === 0),
                map((count) => count*params.multiplier)
            )
    }

    attach(emitElectronSubject$: Subject<number>, electronCount$: Observable<number>) {
        this.emitterSubscription = this.emitter$.subscribe(emitElectronSubject$)
        this.buySubscription = this.buySubject$.asObservable()
            .pipe(
                withLatestFrom(this.cost$, electronCount$),
                // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
                filter(([_, cost, balance]) => cost < balance),
            )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
            .subscribe(([inc, cost, _]) => {
                this.addSubject$.next(inc)
                emitElectronSubject$.next(-inc*cost)
            })
    }

    detach() {
        this.emitterSubscription.unsubscribe()
        this.buySubscription.unsubscribe()
    }
}