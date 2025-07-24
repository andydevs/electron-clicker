import { AppState, AppDispatch } from "./store";
import { ItemSlice } from "./items/createSlice";
import { itemSlices } from "./items/state";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./electrons";
import { useMemo } from "react";

const numFormatter = new Intl.NumberFormat("en-us", { notation: "compact" })
function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(Math.round(value))
    return <span>{numFormat}</span>
}

export function ItemRow({ item }: { item: ItemSlice }) {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const count = useSelector((s: AppState) => s.items[item.params.id])
    const nextCost = useMemo(() => item.nextCost(count), [count])
    const dispatch = useDispatch<AppDispatch>()

    const handleBuy = () =>
        dispatch(item.attemptBuy)

    return (<tr>
        <td>{item.params.displayName}</td>
        <td>{count}</td>
        <td><button 
            disabled={electronCount < nextCost}
            onClick={handleBuy}>
                Buy {nextCost}
            </button>
        </td>
    </tr>)
}

export function App() {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => 
        dispatch(update(1))

    return (<div>
        <p>Electrons: <Number value={electronCount}/></p>
        <p><button onClick={handleElectronClick}>Electron</button></p>
        <div>
            <p><b>Store</b></p>
            <table>
                <tbody>
                    {Object.values(itemSlices).map((item) => (
                        <ItemRow key={item.params.id} item={item}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>)
}