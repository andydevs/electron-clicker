export type ItemState = {
    electronGun: number,
    betaDecayMaterial: number,
    cathodeRayTube: number,
    particleAccelerator: number,
    magnetosphere: number
}

export type ItemName = keyof ItemState

export type ItemParams = {
    displayName: string,
    initialCost: number,
    costGrowth: number,
    electronsPerSec: number,
    initialCount?: number
}

type ItemConfigType = {
    [_K in keyof ItemState]: ItemParams
}

export const itemConfig: ItemConfigType = {
    electronGun: {
        displayName: 'Electron Gun',
        initialCost: 14,
        costGrowth: 1.25,
        electronsPerSec: 0.1
    },
    betaDecayMaterial: {
        displayName: 'Beta Decay',
        initialCost: 72,
        costGrowth: 1.50,
        electronsPerSec: 1
    },
    cathodeRayTube: {
        displayName: 'Cathode Ray Tube',
        initialCost: 138,
        costGrowth: 1.85,
        electronsPerSec: 8
    },
    particleAccelerator: {
        displayName: 'Particle Accelerator',
        initialCost: 512,
        costGrowth: 1.92,
        electronsPerSec: 42
    },
    magnetosphere: {
        displayName: 'Magnetosphere',
        initialCost: 1020,
        costGrowth: 2.00,
        electronsPerSec: 128
    }
}