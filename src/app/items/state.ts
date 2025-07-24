import { Reducer } from '@reduxjs/toolkit';
import { ItemParams, ItemName, itemConfig } from './config';
import { createItemSlice, ItemSlice } from './createSlice';


type ItemSlicesType = { [_K in ItemName]: ItemSlice }
type ItemReducersType = { [_K in ItemName]: Reducer<number> }

export type ItemAction = ReturnType<ItemSlicesType[ItemName]['slice']['actions']['increment']>

export const itemSlices: ItemSlicesType = Object.entries<ItemParams>(itemConfig)
    .map<[ItemName, ItemSlice]>(([key, config]) => {
        const iKey = key as ItemName
        return [ iKey, createItemSlice({ id: iKey, ...config }) ]
    })
    .reduce((obj, [key, slice]) => {
        obj[key as ItemName] = slice
        return obj
    }, {} as ItemSlicesType)

export const itemReducers = Object.entries(itemSlices)
    .map<[ItemName, Reducer<number>]>(([key, { reducer }]) => {
        return [key as ItemName, reducer]
    })
    .reduce<ItemReducersType>((acc, [key, reducer]) => {
        acc[key as ItemName] = reducer
        return acc
    }, {} as ItemReducersType)