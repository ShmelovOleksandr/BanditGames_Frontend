import {useContext} from 'react'
import WebSocketContext from "@/context/WebSocket/WebSocketContext.ts";

export const useWebSocket = () => {
    const {connectWebSocket,
        disconnectWebSocket,
        sendGetGameStateRequest,
        sendGetPiecePossibleMoves,
        sendMovePieceRequest,
        messages,
        isWebSocketReady} = useContext(WebSocketContext);
    return {connectWebSocket,
        disconnectWebSocket,
        sendGetGameStateRequest,
        sendGetPiecePossibleMoves,
        sendMovePieceRequest,
        messages,
        isWebSocketReady}
}




