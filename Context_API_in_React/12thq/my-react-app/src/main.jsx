import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './DataProvider.jsx'
import Child1 from './childs/child1.jsx'
import Child2 from './childs/child2.jsx'

createRoot(document.getElementById('root')).render(
    <DataProvider>
        <App />
    </DataProvider>
)
