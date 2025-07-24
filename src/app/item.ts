import { createSlice } from "@reduxjs/toolkit";
import { update as updateElectrons } from "./electrons";
import { RootState } from "./state";
import { AppDispatch } from "./store";

export type ItemSliceParams = {
    name: keyof RootState['items'],
    displayName: string,
    initialCost: number,
    costGrowth: number,
    electronsPerSec: number
}

export function createItemSlice(params: ItemSliceParams) {
    // Cost for next item
    const nextCost = (state: number): number => 
        Math.round(params.initialCost*Math.pow(params.costGrowth, state))

    // Slice
    const slice = createSlice({
        name: params.name,
        initialState: 0,
        reducers: {
            increment: state => state + 1
        }
    })

    // Attempt buy function
    function attemptBuy(dispatch: AppDispatch, getState: () => RootState) {
        const state = getState()
        const nElectrons = state.electronCount
        const number = state.items[params.name]
        const cost = nextCost(number)
    
        if (nElectrons < cost) {
            console.error(`Sorry! No can do! You don't have enough `
                + `electrons (${nElectrons}) to purchase `
                + `${params.displayName} (cost: ${cost})`)
            return
        }
    
        // If we have enough, let's go!
        dispatch(updateElectrons(-cost))
        dispatch(slice.actions.increment())
    }

    return {
        params,
        slice,
        reducer: slice.reducer,
        attemptBuy,
        nextCost
    }
}

export type ItemType = ReturnType<typeof createItemSlice>