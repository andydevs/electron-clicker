import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const electronCountSlice = createSlice({
    name: 'electronCount',
    initialState: 0,
    reducers: {
        update: (electrons: number, action: PayloadAction<number>) => {
            return electrons + action.payload
        }
    }
})

export const { update } = electronCountSlice.actions
export const electronCountReducer = electronCountSlice.reducer
export type ElectonCountAction = ReturnType<typeof electronCountSlice.actions[keyof typeof electronCountSlice.actions]>