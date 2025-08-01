import { useSelector } from 'react-redux'
import { AppState } from '../../domain/store'
import { Number } from '../number'

export function ElectronCount() {
    const electronCount = useSelector((s: AppState) => s.electronCount)

    return (
        <div className="electron-count">
            <Number value={electronCount} /> Electrons
        </div>
    )
}
