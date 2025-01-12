import {GameState} from "@/model/GameState.ts";
import {useEffect, useState} from "react";
import {useWebSocket} from "@/hooks/useWebSocket.ts";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";

export const TurnDisplay = () => {

    const {messages} = useWebSocket()
    const {loggedInUser, userId} = useKeycloak();
    const [game, setGame] = useState<GameState>()


    useEffect(() => {
        const latestMessage = messages[messages.length - 1];
        if (latestMessage && ('pieces' in latestMessage)) {
            const gameState = latestMessage as GameState;
            setGame(gameState);
        }
    });

    const isCurrentTurn = game?.currentPlayer === userId;
    const currentPlayer = game?.players.find((p) => p.playerId === userId);
    const playerColor = currentPlayer?.color;

    return (
        <div className="mb-4 px-6 py-3 rounded-lg shadow-md bg-white border border-gray-200 flex items-center justify-center">
            <p className={`text-lg font-semibold ${isCurrentTurn ? "text-green-600" : "text-gray-700"}`}>
                {isCurrentTurn
                    ? `${loggedInUser} Turn (${playerColor})`
                    : `Opponent's Turn (${playerColor === "WHITE" ? "BLACK" : "WHITE"})`}
            </p>
        </div>
    );
}