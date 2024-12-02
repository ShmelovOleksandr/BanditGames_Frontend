import {useState} from 'react'
import {Client} from '@stomp/stompjs'

const useWebSocket = (keycloak) => {
    const [stompClient, setStompClient] = useState(null)
    const [messages, setMessages] = useState([])
    const [lobbyId, setLobbyId] = useState(null)

    const connectWebSocket = () => {
        if (!keycloak || !keycloak.authenticated) {
            console.log('User is not authenticated.')
            return
        }

        // Use the user ID from Keycloak token for the subscription path
        const userId = keycloak.tokenParsed?.sub  // Assuming the Keycloak token has the 'sub' field as user ID
        console.log(`User id: ${userId}`)
        // Construct WebSocket URL

        // Initialize the Stomp client with the SockJS client as the WebSocket factory
        const client = new Client({
            brokerURL: 'ws://localhost:8041/ws',
            connectHeaders: {
                Authorization: `Bearer ${keycloak.token}` // Adding Keycloak JWT token for authentication
            },
            debug: (str) => console.log(str),  // Optional: for debugging stompjs logs
            onConnect: () => {
                console.log('WebSocket connected!')
                console.log(`Sub path /queue/user/${userId}`)
                // Subscribe to the specific user queue using the user ID in the path
                client.subscribe(`/queue/user/${userId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body)
                    console.log('Received message: ', JSON.parse(message.body))
                    if (receivedMessage.lobbyId) {
                        setLobbyId(receivedMessage.lobbyId)
                    }
                    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)])
                })
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message'])
                console.error('Additional details: ' + frame.body)
            },
            onWebSocketError: (error) => {
                console.error('Error with websocket', error)
            }
        })
        client.activate() // Instead of using 'connect()', you now use 'activate()'

        // Set the stomp client in state
        setStompClient(client)
    }

    const disconnectWebSocket = () => {
        if (stompClient) {
            stompClient.deactivate()

            console.log('WebSocket disconnected!')
        }
    }

    const sendJoinLobbyRequest = (gameId: string) => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!')
            return
        }
        if (!keycloak || !keycloak.authenticated) {
            console.log('User is not authenticated.')
            return
        }
        const playerId = keycloak.tokenParsed?.sub
        const payload = {playerId, gameId}
        stompClient.publish({
            destination: '/app/join-lobby',
            body: JSON.stringify(payload),
        })
    }

    const sendLeaveLobbyRequest = () => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!')
            return
        }
        if (!keycloak || !keycloak.authenticated) {
            console.log('User is not authenticated.')
            return
        }
        // const playerId = keycloak.tokenParsed?.sub;
        // stompClient.publish({
        //     destination: '/app/leave-lobby',
        //     body: JSON.stringify({ playerId }),
        // });
        stompClient.deactivate()

    }

    const sendReadyToPlayRequest = () => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!')
            return
        }
        if (!keycloak || !keycloak.authenticated) {
            console.log('User is not authenticated.')
            return
        }

        if (!lobbyId) {
            console.log('User is not in the lobby.')
        }

        stompClient.publish({
            destination: '/app/ready-to-play',
            body: JSON.stringify({lobbyId}),
        })
    }


    return {
        connectWebSocket,
        disconnectWebSocket,
        sendJoinLobbyRequest,
        messages,
        sendLeaveLobbyRequest,
        sendReadyToPlayRequest,
    }
}

export default useWebSocket
