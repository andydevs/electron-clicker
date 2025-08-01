import { useDispatch } from 'react-redux'
import { update } from '../domain/electrons'
import { AppDispatch } from '../domain/store'
import StupidElectron from '../../assets/stupid-electron.svg'

export function ElectronButton() {
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => dispatch(update(1))

    return (
        <div className="electron-button-graphic">
            <button
                className="electron-button"
                onClick={handleElectronClick}>
                <StupidElectron />
            </button>
        </div>
    )
}
