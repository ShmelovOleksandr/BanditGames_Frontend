import useGameUUID from "@/hooks/useGameUUID.ts";
import {useWebSocket} from "@/hooks/useWebSocket.ts";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import {useEffect, useState} from "react";


export const Main = () => {
    const [isConnected, setIsConnected] = useState(false)
    const {isAuthenticated} = useKeycloak()
    const {connectWebSocket, isWebSocketReady} = useWebSocket()
    const gameUUID = useGameUUID();

    useEffect(() => {
        if (isAuthenticated() && !isConnected) {
            connectWebSocket();
            setIsConnected(true);
        }
    }, [isAuthenticated, isConnected, connectWebSocket]);

    useEffect(() => {
        if (isWebSocketReady && gameUUID) {

        }
    }, [isWebSocketReady])

    return (
        <div>HEllow</div>
    )
}