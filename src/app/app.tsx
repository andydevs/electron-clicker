import { ElectronGraphic } from './components/electron'
import { ElectronStats } from './components/stats'
import { AppFooter } from './components/footer'
import { ItemStore } from './components/item-store'

export function App() {
    return (
        <div className="app-container">
            <ElectronStats />
            <ElectronGraphic />
            <ItemStore />
            <AppFooter />
        </div>
    )
}
