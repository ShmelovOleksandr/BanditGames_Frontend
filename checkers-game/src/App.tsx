import './App.css'
import GameBoard from "@/components/GameBoard/index.tsx";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

    return (

        <SecurityContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/:game_uuid"
                        element={
                            <RouteGuard>
                                <GameBoard/>
                            </RouteGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>

        </SecurityContextProvider>
    )
}

export default App
