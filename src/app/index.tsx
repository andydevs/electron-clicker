import { Container, createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './domain/store'
import { App } from './app'

const element = document.getElementById('root') as Container
const root = createRoot(element)
root.render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
)
