import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {Home} from '@/pages/Home'
import {Catalog} from '@/pages/Catalog'
import './App.css'
import SecurityContextProvider from './context/SecurityContextProvider'
import GameDetails from '@/pages/Game'
import Lobby from '@/pages/Lobby'
import {RouteGuard} from './components/RouteGuard'


function App() {
    return (
        <SecurityContextProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Home/>}/>
                    {/* Protected Route */}
                    <Route path="/game-library" element={<Catalog/>}/>
                    <Route path="/game-library/game" element={<GameDetails/>}/>
                    <Route path="/lobby" element={<Lobby/>}/>
                </Routes>
            </BrowserRouter>
        </SecurityContextProvider>
    )
}

export default App
