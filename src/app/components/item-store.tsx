import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { itemSlices } from '../domain/items/state'
import { ItemSlice } from '../domain/items/createSlice'
import { AppState, AppDispatch } from '../domain/store'
import { Number } from './number'
import { Button } from './styled-button'

function ItemRow({ item }: { item: ItemSlice }) {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const count = useSelector((s: AppState) => s.items[item.params.id])
    const nextCost = useMemo(() => item.nextCost(count), [count])
    const dispatch = useDispatch<AppDispatch>()

    const handleBuy = () => dispatch(item.attemptBuy)

    return (
        <tr className="item-row">
            <td className="item-count">{count}</td>
            <td className="item-display-name">{item.params.displayName}</td>
            <td className="item-electrons-per-sec">
                <Number value={item.params.electronsPerSec} /> electrons/sec each
            </td>
            <td className="item-cost">
                <Number value={nextCost} />
            </td>
            <td className="item-buy">
                <Button
                    expand
                    size="sm"
                    disabled={electronCount < nextCost}
                    onClick={handleBuy}>
                    Buy
                </Button>
            </td>
        </tr>
    )
}

export function ItemStore() {
    return (
        <div className="item-store-container">
            <h2 className="item-store-title">Items</h2>
            <div className="item-store-table-container">
                <table className="item-store-table">
                    <thead className="item-store-table-head">
                        <tr className="item-store-header-row">
                            <th colSpan={2}>Item</th>
                            <th>Generating</th>
                            <th colSpan={2}>Buy</th>
                        </tr>
                    </thead>
                    <tbody className="item-store-table-body">
                        {Object.values(itemSlices).map((item) => (
                            <ItemRow
                                key={item.params.id}
                                item={item}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
