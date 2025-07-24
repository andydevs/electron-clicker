import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { increment as updateElectrons } from "./electrons";
import { AppDispatch, AppState } from "./store";


export const nextGunCost = (state: number): number => 
    Math.round(14 * Math.pow(1.25, state))

export const gunSlice = createSlice({
    name: 'electronGun',
    initialState: 0,
    reducers: {
        increment: (state, action: PayloadAction<number>) => state + action.payload
    }
})

export function attemptBuyGun(dispatch:AppDispatch, getState: () => AppState) {
    const state = getState()
    const nElectrons = state.electronCount
    const nGuns = state.items.electronGun
    const gunCost = nextGunCost(nGuns)

    if (nElectrons < gunCost) {
        console.error(`Sorry! No can do! You don't have enough `
            + `electrons (${nElectrons}) to purchase `
            + `Electron Gun (cost: ${gunCost})`)
        return
    }

    // If we have enough, let's go!
    dispatch(updateElectrons(-gunCost))
    dispatch(gunSlice.actions.increment(1))
}

export const gunReducer = gunSlice.reducer