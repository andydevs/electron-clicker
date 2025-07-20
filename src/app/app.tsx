
import { useObservableNext } from './rxhooks';
import { electronCount$, emitElectronSubject$ } from './rxstate';


export function App() {
    const electronCount = useObservableNext(electronCount$)

    const handleClick = () => {
        emitElectronSubject$.next(1)
    }

    return (<div>
        <p>Electrons: {electronCount}</p>
        <p><button onClick={handleClick}>Electron</button></p>
    </div>)
}