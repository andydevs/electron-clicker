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
    const totalGenerating = useMemo(() => count * item.params.electronsPerSec, [count])
    const dispatch = useDispatch<AppDispatch>()

    const handleBuy = () => dispatch(item.attemptBuy)

    return (
        <div className="item-row">
            <div className="item-cell item-count">{count}</div>
            <div className="item-cell item-display-name">{item.params.displayName}</div>
            <div className="item-cell item-info">
                Generates <Number value={item.params.electronsPerSec} />
                /s each{', '}
                Currently{' '}
                <Number
                    bold
                    value={totalGenerating}
                />
                /s total
            </div>
            <div className="item-cell item-cost">
                <Number value={nextCost} />
            </div>
            <div className="item-cell item-buy">
                <Button
                    expand
                    size="sm"
                    disabled={electronCount < nextCost}
                    onClick={handleBuy}>
                    Buy
                </Button>
            </div>
        </div>
    )
}

export function ItemStore() {
    return (
        <div className="item-store-container">
            <h2 className="item-store-title">Items</h2>
            <div className="item-store-table-container">
                <div className="item-store-table">
                    <div className="item-header-row">
                        <div className="item-header-cell item-header-item">Item</div>
                        <div className="item-header-cell item-header-info">Info</div>
                        <div className="item-header-cell item-header-buy">Buy</div>
                    </div>
                    {Object.values(itemSlices).map((item) => (
                        <ItemRow
                            key={item.params.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
