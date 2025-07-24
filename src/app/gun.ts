import { createSlice } from "@reduxjs/toolkit";
import { update as updateElectrons } from "./electrons";
import { AppDispatch, AppState } from "./store";


export const electronGunParams = {
    initialCost: 14,
    costGrowth: 1.25,
    electronsPerSec: 1
}


export const nextGunCost = (state: number): number => 
    Math.round(electronGunParams.initialCost 
        * Math.pow(electronGunParams.costGrowth, state))

export const gunSlice = createSlice({
    name: 'electronGun',
    initialState: 0,
    reducers: {
        increment: state => state + 1
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
    dispatch(gunSlice.actions.increment())
}

export const gunReducer = gunSlice.reducer
export type GunAction = ReturnType<typeof gunSlice.actions[keyof typeof gunSlice.actions]>