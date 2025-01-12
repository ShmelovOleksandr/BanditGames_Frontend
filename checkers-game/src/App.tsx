import './App.css'
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "@/pages/Main";


function App() {

    return (

        <SecurityContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/:game_uuid"
                        element={
                            <RouteGuard>
                                <Main/>
                            </RouteGuard>
                        }
                    />
                </Routes>
            </BrowserRouter>

        </SecurityContextProvider>
    )
}

export default App
