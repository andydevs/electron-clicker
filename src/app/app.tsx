import React, {useState} from 'react';


export function App() {
    const [counter, setCounter] = useState(0)

    const handleClick = () => {
        setCounter(counter + 1)
    }

    return (<div>
        <p>Electrons: {counter}</p>
        <p><button onClick={handleClick}>Electron</button></p>
    </div>)
}