import { useObservableNext } from './rxhooks';
import { electronCount$, emitElectronSubject$ } from './rxstate';

const numFormatter = new Intl.NumberFormat("en-us", { notation: "compact" })
function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(value)
    return <span>{numFormat}</span>
}

export function App() {
    const electronCount = useObservableNext(electronCount$)

    return (<div>
        <p>Electrons: <Number value={electronCount}/></p>
        <p><button onClick={() => emitElectronSubject$.next(1)}>Electron</button></p>
    </div>)
}