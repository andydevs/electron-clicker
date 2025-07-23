import { ItemType } from './item'
import { useObservableNext } from './rxhooks';
import { electronCount$, emitElectronSubject$ } from './rxstate';

const numFormatter = new Intl.NumberFormat("en-us", { notation: "compact" })
function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(Math.round(value))
    return <span>{numFormat}</span>
}

function ElectronButton() {
    const handleElectronClick = () => emitElectronSubject$.next(1)
    return (<button onClick={handleElectronClick}>Electron</button>)
}

const itemTypes = [
    new ItemType({
        name: 'Electron Gun',
        perSec: 1,
        initialCost: 14,
        costGrowth: 1.25
    }),
    new ItemType({
        name: 'Beta Decay Material',
        perSec: 8,
        initialCost: 72,
        costGrowth: 1.50
    }),
    new ItemType({
        name: 'Cathode Ray Tube',
        perSec: 42,
        initialCost: 1123,
        costGrowth: 1.80
    })
]
itemTypes.sort((a,b) => a.perSec - b.perSec)

itemTypes.forEach(item => {
    item.attach(emitElectronSubject$, electronCount$)
})

function ItemRow({ item }: { item: ItemType }) {
    const electronCount = useObservableNext(electronCount$)
    const itemCount = useObservableNext(item.count$)
    const itemCost = useObservableNext(item.cost$)

    const handleBuy = () =>
        item.buySubject$.next(1)

    return (
        <tr>
            <td>{item.name}</td>
            <td>{itemCount}</td>
            <td><button 
                disabled={electronCount < itemCost} 
                onClick={handleBuy}>Buy {itemCost}</button> 
            </td>
        </tr>
    )
}

export function App() {
    const electronCount = useObservableNext(electronCount$)

    return (<div>
        <p>Electrons: <Number value={electronCount}/></p>
        <p><ElectronButton/></p>
        <div>
            <p><b>Store</b></p>
            <table>
                <tbody>
                    {itemTypes.map(item => (
                        <ItemRow key={item.name} item={item}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>)
}