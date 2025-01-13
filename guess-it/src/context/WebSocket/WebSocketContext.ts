
import { createContext } from 'react'

export interface IWebSocketContext {
    connectWebSocket: () => void,
    disconnectWebSocket: () => void,
    messages: Object[],
    isWebSocketReady: boolean
}

const WebSocketContext = createContext<IWebSocketContext>({
    isWebSocketReady: false,
    connectWebSocket: () => {},
    disconnectWebSocket: () => {},
    messages: [],
})

export default WebSocketContext
