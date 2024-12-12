import './App.css'
import {Button} from "@nextui-org/react";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";
import {RouteGuard} from "@/context/RouteGuard.tsx";

function App() {

    return (
        <SecurityContextProvider>
            <RouteGuard>
                <Button className="bg-amber-500">Button</Button>
            </RouteGuard>
        </SecurityContextProvider>
    )
}

export default App
