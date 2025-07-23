import { useState } from "react";

const numFormatter = new Intl.NumberFormat("en-us", { notation: "compact" })
function Number({ value }: { value: number }) {
    const numFormat = numFormatter.format(Math.round(value))
    return <span>{numFormat}</span>
}

export function App() {
    const [electronCount, setElectronCount] = useState(0)

    const handleElectronClick = () => 
        setElectronCount(electronCount + 1)

    return (<div>
        <p>Electrons: <Number value={electronCount}/></p>
        <p><button onClick={handleElectronClick}>Electron</button></p>
    </div>)
}