import { createSlice } from "@reduxjs/toolkit";
import { update as updateElectrons } from "./electrons";
import { AppDispatch, AppState } from "./store";


export const betaDecayParams = {
    initialCost: 72,
    costGrowth: 1.50,
    electronsPerSec: 8
}

export const nextBetaDecayCost = (state: number): number => 
    Math.round(betaDecayParams.initialCost 
        * Math.pow(betaDecayParams.costGrowth, state))

export const betaDecaySlice = createSlice({
    name: 'betaDecayMaterial',
    initialState: 0,
    reducers: {
        increment: state => state + 1
    }
})

export function attemptBuyBetaDecay(dispatch:AppDispatch, getState: () => AppState) {
    const state = getState()
    const nElectrons = state.electronCount
    const nBetaDecay = state.items.betaDecayMaterial
    const betaDecayCost = nextBetaDecayCost(nBetaDecay)

    if (nElectrons < betaDecayCost) {
        console.error(`Sorry! No can do! You don't have enough `
            + `electrons (${nElectrons}) to purchase `
            + `Beta Decay Material (cost: ${betaDecayCost})`)
        return
    }

    // If we have enough, let's go!
    dispatch(updateElectrons(-betaDecayCost))
    dispatch(betaDecaySlice.actions.increment())
}

export const betaDecayReducer = betaDecaySlice.reducer
export type BetaDecayAction = ReturnType<typeof betaDecaySlice.actions[keyof typeof betaDecaySlice.actions]>