import {useState} from 'react'
import {Client} from '@stomp/stompjs'
import {useKeycloak} from '@/hooks/useKeyCloak.ts'

const useWebSocket = (keycloakInstance) => {
    const [stompClient, setStompClient] = useState(null)
    const [messages, setMessages] = useState([])
    const [lobbyId, setLobbyId] = useState(null)
    const { keycloak } = useKeycloak()

    const connectWebSocket = () => {
        if (!keycloakInstance || !keycloakInstance.authenticated) {
            console.log('User is not authenticated.')
            return
        }

        const token = keycloakInstance.token
        const userId = keycloakInstance.tokenParsed?.sub

        const client = new Client({
            brokerURL: 'ws://localhost:8041/ws',
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('WebSocket connected!')
                client.subscribe(`/queue/user/${userId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body)
                    setMessages((prev) => [...prev, receivedMessage])
                    if (receivedMessage.lobbyId) setLobbyId(receivedMessage.lobbyId)
                })
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

    const sendJoinLobbyRequest = (gameId) => {
        if (!stompClient || !stompClient.connected) {
            console.log('WebSocket is not connected!')
            return
        }
        if (!keycloakInstance || !keycloakInstance.authenticated) {
            console.log('User is not authenticated.')
            return
        }
        const payload = {
            playerId: keycloakInstance.tokenParsed?.sub,
            gameId,
        }
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
