
import { createContext } from 'react'
import {Move} from "@/model/Move.ts";

export interface IWebSocketContext {
    connectWebSocket: () => void,
    disconnectWebSocket: () => void,
    sendGetGameStateRequest: (gameId: string) => void,
    sendGetPiecePossibleMoves: (gameId: string, x: number, y: number) => void,
    sendMovePieceRequest: (move: Move, gameId: string) => void,
    messages: Object[],
    isWebSocketReady: boolean
}

const WebSocketContext = createContext<IWebSocketContext>({
    isWebSocketReady: false,
    connectWebSocket: () => {},
    disconnectWebSocket: () => {},
    messages: [],
    sendGetGameStateRequest: () => {},
    sendGetPiecePossibleMoves: () => {},
    sendMovePieceRequest: () => {}
})

export default WebSocketContext
