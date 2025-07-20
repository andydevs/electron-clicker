import { useEffect, useState } from "react";
import * as rx from 'rxjs';


export function useSubscription<T>(observable$: rx.Observable<T>, observerOrNext: Partial<rx.Observer<T>> | ((value: T) => void)): void {
    useEffect(() => {
        const subscription = observable$.subscribe(observerOrNext)
        return () => subscription.unsubscribe()
    }, [])
}

export function useObservableNext<T>(observable$: rx.Observable<T>): T {
    const [state, setState] = useState<T>()
    useSubscription(observable$, (value) => { setState(value) })
    return state
}