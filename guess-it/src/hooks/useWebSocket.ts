import {useContext} from 'react'
import WebSocketContext from "@/context/WebSocket/WebSocketContext.ts";



export const useWebSocket = () => {
    const {connectWebSocket,
        disconnectWebSocket,
        messages,
        isWebSocketReady} = useContext(WebSocketContext);
    return {connectWebSocket,
        disconnectWebSocket,
        messages,
        isWebSocketReady}
}




