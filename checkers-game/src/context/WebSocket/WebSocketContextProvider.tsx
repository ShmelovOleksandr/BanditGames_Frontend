import {ReactNode, useState} from "react";
import WebSocketContext from "@/context/WebSocket/WebSocketContext.ts";
import {Client} from "@stomp/stompjs";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import {Move} from "@/model/Move.ts";


interface IWithChildren {
    children: ReactNode;
}
export default function WebSocketContextProvider({children}: IWithChildren) {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<any[]>([])
    const {keycloak, userId, isAuthenticated} = useKeycloak()
    const [isWebSocketReady, setIsWebSocketReady] = useState(false)

    const connectWebSocket = () => {
        if (!isAuthenticated()) {
            console.log('User is not authenticated.')
            return
        }

        const token = keycloak?.token
        const playerId = userId

        const client = new Client({
            brokerURL: 'ws://localhost:8042/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),
            onConnect: () => {
                client.subscribe(`/queue/user/${playerId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body)
                    setMessages(prev => [...prev, receivedMessage])
                });
                setIsWebSocketReady(true)
                console.log('WebSocket connected!')
            },
            onStompError: (frame) => {
                console.error('Broker reported error:', frame.headers['message'])
                console.error('Additional details:', frame.body)
            },
            onWebSocketError: (error) => {
                console.error('WebSocket error:', error)
            },
        })
        client.activate()
        setStompClient(client)
    }

    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.deactivate()
            console.log('WebSocket disconnected!')
        }
    }

    const sendGetGameStateRequest = (gameId: string) => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!');
            return;
        }
        const playerId = userId;
        const payload = { gameId, playerId };
        stompClient.publish({
            destination: '/app/get-state',
            body: JSON.stringify(payload),
        });
    }

    const sendGetPiecePossibleMoves = (gameId: string, x: number, y: number) => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!');
            return;
        }
        const payload = {gameId, x, y};
        stompClient.publish({
            destination: '/app/get-moves',
            body: JSON.stringify(payload),
        });
    }

    const sendMovePieceRequest = (move: Move, gameId: string) => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!');
            return;
        }
        const playerId = userId;

        const payload = {
            gameId,
            playerId,
            move
        }
        stompClient.publish({
            destination: '/app/make-move',
            body: JSON.stringify(payload),
        });

    }

    return (
            <WebSocketContext.Provider
            value={{
                connectWebSocket,
                disconnectWebSocket,
                sendGetGameStateRequest,
                sendGetPiecePossibleMoves,
                sendMovePieceRequest,
                messages,
                isWebSocketReady
            }}
        >
            {children}
        </WebSocketContext.Provider>
    )
}