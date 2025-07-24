

export type ItemState = {
    electronGun: number,
    betaDecayMaterial: number
}
export type ItemName = keyof ItemState

export type ItemParams = {
    displayName: string,
    initialCost: number,
    costGrowth: number,
    electronsPerSec: number
}

type ItemConfigType = {
    // eslint-disable-next-line no-unused-vars
    [_K in keyof ItemState]: ItemParams
}

export const itemConfig: ItemConfigType = {
    electronGun: {
        displayName: 'Electron Gun',
        initialCost: 14,
        costGrowth: 1.25,
        electronsPerSec: 1
    },
    betaDecayMaterial: {
        displayName: 'Beta Decay',
        initialCost: 72,
        costGrowth: 1.50,
        electronsPerSec: 8
    }
}