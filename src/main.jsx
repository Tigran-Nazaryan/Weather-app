import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UnitProvider} from "./store/UnitContext.jsx";
import {CityProvider} from "./store/CityContext.jsx";
import {FavoritesProvider} from "./store/FavoritesContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UnitProvider>
            <CityProvider>
                <FavoritesProvider>
                    <App />
                </FavoritesProvider>
            </CityProvider>
        </UnitProvider>
    </StrictMode>,
)
