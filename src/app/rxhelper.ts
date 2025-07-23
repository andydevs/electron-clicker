import { map, scan } from "rxjs"

// Operators
export const accumulate = scan((acc: number, val: number): number => acc + val, 0)
export const getitem = (index: number) => map(<T>(arr: T[]): T => arr[index])

// Helper function
export const expScale = (principal: number, base: number) => 
    (n: number) => Math.round(principal*Math.pow(base, n))