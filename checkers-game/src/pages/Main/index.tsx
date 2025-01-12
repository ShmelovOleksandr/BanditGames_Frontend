import GameBoard from "@/components/GameBoard";
import {useEffect, useState} from "react";
import {useWebSocket} from "@/hooks/useWebSocket.ts";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import useGameUUID from "@/hooks/useGameUUID.ts";
import {TurnDisplay} from "@/components/TurnDisplay";
import backgroundImage from '@/assets/BACKGROUND_WOOD.webp';
import {useGame} from "@/hooks/useGame.ts";
import {EndModal} from "@/components/EndModal";


export const  Main = () => {

    const [isConnected, setIsConnected] = useState(false)
    const {isAuthenticated} = useKeycloak()
    const {connectWebSocket, isWebSocketReady, sendGetGameStateRequest} = useWebSocket()
    const gameUUID = useGameUUID();
    const {isFinished, gameState} = useGame();

    useEffect(() => {
        if (isAuthenticated() && !isConnected) {
            connectWebSocket();
            setIsConnected(true);
        }
    }, [isAuthenticated, isConnected, connectWebSocket]);

    useEffect(() => {
        if (isWebSocketReady && gameUUID) {
            sendGetGameStateRequest(gameUUID);
        }
    }, [isWebSocketReady])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
             style={{ backgroundImage: `url(${backgroundImage})` }}>
            <TurnDisplay/>
            <GameBoard/>
            {isFinished &&
                <EndModal gameState={gameState} isFinished={isFinished}></EndModal>
            }
        </div>
    )
}