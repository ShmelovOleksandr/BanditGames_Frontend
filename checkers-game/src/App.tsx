import './App.css'
import GameBoard from "@/components/GameBoard/index.tsx";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";

function App() {

    return (

        <SecurityContextProvider>
            <RouteGuard>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <GameBoard/>
                </div>
            </RouteGuard>
        </SecurityContextProvider>
    )
}

export default App
