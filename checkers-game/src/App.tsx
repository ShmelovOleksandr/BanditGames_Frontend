import './App.css'
import GameBoard from "@/components/GameBoard/index.tsx";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";


function App() {

    return (

        <SecurityContextProvider>
            <RouteGuard>
                <GameBoard/>
            </RouteGuard>
        </SecurityContextProvider>
    )
}

export default App
