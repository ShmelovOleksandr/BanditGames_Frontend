import './App.css'
import {Button} from "@nextui-org/react";
import SecurityContextProvider from "@/context/SecurityContextProvider.tsx";

function App() {

    return (
        <SecurityContextProvider>
            <Button className="bg-amber-500">Button</Button>
        </SecurityContextProvider>
    )
}

export default App
