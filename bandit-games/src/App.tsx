import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {Home} from '@/pages/Home'
import {Catalog} from '@/pages/Catalog'
import {RouteGuard} from './components/RouteGuard'
import SecurityContextProvider from '@/context/SecurityContextProvider.tsx'


function App() {
    return (
        <SecurityContextProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Home/>}/>
                    {/* Protected Route */}
                    <Route
                        path="/game-library"
                        element={
                            <RouteGuard>
                                <Catalog/>
                            </RouteGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </SecurityContextProvider>
    )
}

export default App
