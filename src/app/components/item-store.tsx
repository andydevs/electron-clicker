import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { itemSlices } from '../domain/items/state'
import { ItemSlice } from '../domain/items/createSlice'
import { AppState, AppDispatch } from '../domain/store'
import { Number } from './number'

function ItemRow({ item }: { item: ItemSlice }) {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const count = useSelector((s: AppState) => s.items[item.params.id])
    const nextCost = useMemo(() => item.nextCost(count), [count])
    const dispatch = useDispatch<AppDispatch>()

    const handleBuy = () => dispatch(item.attemptBuy)

    return (
        <tr className="item-row">
            <td className="item-cell-display-name">{item.params.displayName}</td>
            <td className="item-cell-count">{count}</td>
            <td className="item-cell-buy">
                <button
                    className="item-buy-button"
                    disabled={electronCount < nextCost}
                    onClick={handleBuy}>
                    Buy <Number value={nextCost} />
                </button>
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
                    <tbody>
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
