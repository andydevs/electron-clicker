import { numFormatter } from '../domain/number-format'

export interface NumberParams {
    value: number
    bold?: boolean
}

export function Number(params: NumberParams) {
    const numFormat = numFormatter.format(Math.round(params.value))
    const style: React.CSSProperties = {
        fontWeight: params.bold ? 'bold' : 'normal'
    }
    return <span style={style}>{numFormat}</span>
}
