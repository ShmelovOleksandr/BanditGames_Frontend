import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import {Home} from '@/pages/Home'
import {Catalog} from '@/pages/Catalog'

function App() {
    return (
        <Router>
            <div>

                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/game-library" element={<Catalog/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
