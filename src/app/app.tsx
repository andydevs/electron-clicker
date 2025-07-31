import { AppState, AppDispatch } from './domain/store'
import { useSelector, useDispatch } from 'react-redux'
import { update } from './domain/electrons'
import { Number } from './components/number'
import { ItemStore } from './components/item-store'

export function App() {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => dispatch(update(1))

    return (
        <div>
            <div>
                Electrons: <Number value={electronCount} />
            </div>
            <div>
                <button onClick={handleElectronClick}>Electron</button>
            </div>
            <ItemStore />
        </div>
    )
}
