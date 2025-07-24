import { AppState, AppDispatch } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./electrons";
import { attemptBuyGun, nextGunCost } from "./gun";
import { attemptBuyBetaDecay, nextBetaDecayCost } from "./betadecaymaterial";
import { useMemo } from "react";

const numFormatter = new Intl.NumberFormat("en-us", { notation: "compact" })
function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(Math.round(value))
    return <span>{numFormat}</span>
}

export function App() {
    const electronCount = useSelector((s: AppState) => s.electronCount)
    const electronGunCount = useSelector((s: AppState) => s.items.electronGun)
    const nxtGunCost = useMemo(() => nextGunCost(electronGunCount), [electronGunCount])
    const betaDecayMaterialCount = useSelector((s: AppState) => s.items.betaDecayMaterial)
    const nxtBetaDecayCost = useMemo(() => nextBetaDecayCost(betaDecayMaterialCount), [betaDecayMaterialCount])
    const dispatch = useDispatch<AppDispatch>()

    const handleElectronClick = () => 
        dispatch(update(1))

    const handleBuyGun = () =>
        dispatch(attemptBuyGun)

    const handleBuyBetaDecay = () =>
        dispatch(attemptBuyBetaDecay)

    return (<div>
        <p>Electrons: <Number value={electronCount}/></p>
        <p><button onClick={handleElectronClick}>Electron</button></p>
        <div>
            <p><b>Store</b></p>
            <table>
                <tbody>
                    <tr>
                        <td>Electron Gun</td>
                        <td>{electronGunCount}</td>
                        <td><button 
                            disabled={electronCount < nxtGunCost}
                            onClick={handleBuyGun}>
                                Buy {nxtGunCost}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Beta Decay Material</td>
                        <td>{betaDecayMaterialCount}</td>
                        <td><button 
                            disabled={electronCount < nxtBetaDecayCost}
                            onClick={handleBuyBetaDecay}>
                                Buy {nxtBetaDecayCost}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}