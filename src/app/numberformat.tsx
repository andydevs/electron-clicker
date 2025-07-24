const numFormatter = new Intl.NumberFormat("en-us", { 
    notation: "compact", 
    maximumSignificantDigits: 3
})
const unitToIncrement: Record<string, number> = {
    '1': 0,
    'K': 3,
    'M': 6,
    'B': 9,
    'T': 12
}

export function unitFloorBasedOnState(state: number, newElectrons: number): number {
    if (state < 1000) { return Math.floor(newElectrons) }
    const parts = numFormatter.formatToParts(state)
    const frac = parts.find(o => o.type === 'fraction')?.value?.length || 2
    const unit = parts.find(o => o.type === 'compact')?.value || '1'
    const increment = Math.pow(10, unitToIncrement[unit] - frac)
    return Math.floor(newElectrons / increment) * increment
}

export function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(Math.round(value))
    return <span>{numFormat}</span>
}