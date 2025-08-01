import { ElectronButton } from './components/button'
import { ElectronStats } from './components/stats'
import { AppFooter } from './components/footer'
import { ItemStore } from './components/item-store'

export function App() {
    return (
        <div className="app-container">
            <ElectronStats />
            <ElectronButton />
            <ItemStore />
            <AppFooter />
        </div>
    )
}
