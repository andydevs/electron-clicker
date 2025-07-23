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

const electronGun = new ItemType({
    interval: 1000,
    multiplier: 1,
    initialCost: 14,
    costGrowth: 1.25
})
electronGun.attach(emitElectronSubject$, electronCount$)

function ElectronGunRow() {
    const electronCount = useObservableNext(electronCount$)
    const electronGunCount = useObservableNext(electronGun.count$)
    const electronGunCost = useObservableNext(electronGun.cost$)

    const handleBuyGun = () =>
        electronGun.buySubject$.next(1)

    return (
        <tr>
            <td>Electron Gun</td>
            <td>{electronGunCount}</td>
            <td><button 
                disabled={electronCount < electronGunCost} 
                onClick={handleBuyGun}>Buy</button> 
                {electronGunCost}</td>
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
                    <ElectronGunRow/>
                </tbody>
            </table>
        </div>
    </div>)
}