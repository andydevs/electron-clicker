import { useDispatch } from 'react-redux'
import { update } from '../domain/electrons'
import { AppDispatch } from '../domain/store'
import StupidElectron from '../../assets/stupid-electron.svg'

function ElectronTooltip() {
    return <div className="electron-button-tooltip visible">Click anywhere near the electron!</div>
}

export function ElectronGraphic() {
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => dispatch(update(1))

    return (
        <div className="electron-button-graphic">
            <button
                id="electron-button"
                className="electron-button"
                onClick={handleElectronClick}>
                <StupidElectron />
            </button>
            <ElectronTooltip />
        </div>
    )
}
