import {useEffect, useState} from 'react'
import useWebSocket from '@/hooks/useWebSocket'
import {useKeycloak} from '@/hooks/useKeyCloak'
import {useNavigate} from 'react-router-dom'

export function useLobby(gameId: string | null) {
    const {keycloak} = useKeycloak()
    const navigate = useNavigate()
    const [lobbyPlayers, setLobbyPlayers] = useState([])
    const [isConnected, setIsConnected] = useState(false)

    const {
        connectWebSocket,
        disconnectWebSocket,
        sendJoinLobbyRequest,
        sendLeaveLobbyRequest,
        sendReadyToPlayRequest,
        isWebSocketReady,
        messages,
    } = useWebSocket(keycloak)

    const handleJoinLobby = () => {
        if (gameId) {
            sendJoinLobbyRequest(gameId)
        } else {
            console.error('Game ID is required!')
        }
    }

    const handleLeaveLobby = () => {
        sendLeaveLobbyRequest()
        disconnectWebSocket()
        setIsConnected(false)
        setLobbyPlayers([])
        navigate('/game-library')
    }

    const handleReadyToPlay = () => {
        sendReadyToPlayRequest()
    }

    useEffect(() => {
        if (keycloak?.authenticated && !isConnected) {
            connectWebSocket()
            setIsConnected(true)
        }

        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1]
            if (latestMessage.players) {
                setLobbyPlayers(latestMessage.players)
            }
        }
    }, [keycloak, gameId, messages])

    useEffect(() => {
        if (isWebSocketReady) {
            handleJoinLobby()
        }
    }, [isWebSocketReady])

    return {
        lobbyPlayers,
        handleJoinLobby,
        handleLeaveLobby,
        handleReadyToPlay,
        isConnected,
    }
}
