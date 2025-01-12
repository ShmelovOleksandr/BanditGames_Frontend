import './App.css'
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "@/pages/Main";
import WebSocketContextProvider from "@/context/WebSocket/WebSocketContextProvider.tsx";


function App() {

    return (

        <SecurityContextProvider>
            <WebSocketContextProvider>
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
            </WebSocketContextProvider>
        </SecurityContextProvider>
    )
}

export default App
