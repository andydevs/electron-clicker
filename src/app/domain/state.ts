import { ElectonCountAction } from './electrons'
import { ItemState } from './items/config'
import { ItemAction } from './items/state'

export type RootState = {
    electronCount: number
    items: ItemState
}

export type AppAction = ElectonCountAction | ItemAction
