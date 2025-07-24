import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const electronCount = createSlice({
    name: 'electronCount',
    initialState: 0,
    reducers: {
        increment: (electrons: number, action: PayloadAction<number>) => {
            return electrons + action.payload
        }
    }
})

export const { increment } = electronCount.actions
export const electronCountReducer = electronCount.reducer