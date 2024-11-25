import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import {Home} from '@/pages/Home'
import {Catalog} from '@/pages/Catalog'
import './App.css'
import SecurityContextProvider from './context/SecurityContextProvider'
import GameDetails from '@/pages/Game'
import Lobby from '@/pages/Lobby'


function App() {
    return (
        <Router>
            <div>
                <SecurityContextProvider>

                    <main>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/game-library" element={<Catalog/>}/>
                            <Route path="/games" element={<GameDetails/>}/>
                            <Route path="/games/lobby" element={<Lobby/>}/>
                        </Routes>
                    </main>
                </SecurityContextProvider>
            </div>
        </Router>

    )
}

export default App
