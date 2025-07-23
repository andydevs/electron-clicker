import { map, Observable, scan } from "rxjs"

// Operators
export const accumulate = scan((acc: number, val: number): number => acc + val, 0)
export const getitem = (index: number) => map(<T>(arr: T[]): T => arr[index])

// Helper function
export const expScale = (principal: number, base: number) => 
    (n: number) => Math.round(principal*Math.pow(base, n))

const MS_PER_SEC = 1000

// Game tick
export const frame$ = new Observable<number>((observer) => {
    const time = (since = 0) => Date.now()/MS_PER_SEC - since
    let start = time()
    const frameloop = () => {
        const delta = time(start)
        observer.next(delta)
        start = time()
        requestAnimationFrame(frameloop)
    }
    requestAnimationFrame(frameloop)
})