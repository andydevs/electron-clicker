import { AppState, AppDispatch } from './domain/store'
import { useSelector, useDispatch } from 'react-redux'
import { update } from './domain/electrons'
import { Number } from './components/number'
import { ItemStore } from './components/item-store'

function AppFooter() {
    return (
        <div className="centering-container app-footer-container">
            <div className="app-footer">
                <div>
                    <i>Andydevs did this...</i>
                </div>
            </div>
        </div>
    )
}

export function App() {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => dispatch(update(1))

    return (
        <div className="app-container">
            <div className="stats-container centering-container">
                <div className="electron-count">
                    <Number value={electronCount} /> Electrons
                </div>
            </div>
            <div className="electron-button-graphic">
                <button
                    className="electron-button"
                    onClick={handleElectronClick}>
                    Electron
                </button>
            </div>
            <ItemStore />
            <AppFooter />
        </div>
    )
}
