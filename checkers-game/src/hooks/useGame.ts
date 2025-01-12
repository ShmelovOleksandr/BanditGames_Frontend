import {useEffect, useState} from "react";
import {useWebSocket} from "@/hooks/useWebSocket.ts";
import {GameState} from "@/model/GameState.ts";

export const useGame = () => {
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [gameState, setGameState] = useState<GameState | undefined>(undefined);

    const {
        isWebSocketReady,
        messages,
    } = useWebSocket();

    useEffect(() => {
        const latestMessage = messages[messages.length - 1];
        if (latestMessage && ('pieces' in latestMessage) && isWebSocketReady) {
            const gameState = latestMessage as GameState;
            setIsFinished(gameState.isFinished)
            setGameState(gameState)
        }
    })
    return {
        isFinished,
        gameState,
    };
}