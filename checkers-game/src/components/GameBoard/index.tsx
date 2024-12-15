import {useEffect, useState} from "react";
import Piece from "@/components/Piece";
import BoardLayout from "@/layouts/boardLayout.tsx";
import useWebSocket from "@/hooks/useWebSocket.ts";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import Square from "@/components/Square";
import {GameState, PieceData} from "@/model/GameState.ts";
import useGameUUID from "@/hooks/useGameUUID.ts";

interface SelectedPiece {
    valueX: number;
    valueY: number;
    color: string;
}

const GameBoard = () => {
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece | null>(null);
    const {isAuthenticated, userId} = useKeycloak();
    const {
        connectWebSocket,
        sendGetGameStateRequest,
        messages,
        isWebSocketReady
    } = useWebSocket();
    const [isConnected, setIsConnected] = useState(false)

    const [pieces, setPieces] = useState<PieceData[]>([]);
    const [playerColor, setPlayerColor] = useState<string | null>(null);
    const gameUUID = useGameUUID();


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


    useEffect(() => {
        const latestMessage = messages[messages.length - 1];
        if (latestMessage && latestMessage.pieces && latestMessage.players) {
            const gameState = latestMessage as GameState;
            setPieces(gameState.pieces);

            const player = gameState.players.find((p) => p.playerId === userId);
            if (player) {
                setPlayerColor(player.color);
            }
        }
    }, [messages, userId]);


    const handlePieceClick = (x:number, y:number, valueY: number, valueX: number, color: string) => {
        if (selectedPiece && selectedPiece.valueY === valueY && selectedPiece.valueX === valueX) {
            setSelectedPiece(null);
        } else {
            setSelectedPiece({valueY, valueX, color});
            console.log(`Selected pieces valueY,valueX (${valueY},${valueX}) and piece x,y (${x}, ${y})`)
        }
    };
    const yRange = playerColor === "WHITE" ? [...Array(10).keys()] : [...Array(10).keys()].reverse();
    const xRange = playerColor === "BLACK" ? [...Array(10).keys()] : [...Array(10).keys()].reverse();


    return (
        <BoardLayout>
            <div className="p-4 bg-black rounded-lg flex justify-center items-center w-full h-full">
                <div className="w-full max-w-screen-md aspect-square relative">
                    <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
                        {yRange.map((valueY) =>
                            xRange.map((valueX) => {
                                const isDark = (valueY + valueX) % 2 === 1;

                                const piece = pieces.find((p) => p.x === valueX && p.y === valueY);
                                const isOwnedByCurrentUser = piece?.pieceColor === playerColor;

                                const isSelected = !!(
                                    selectedPiece &&
                                    selectedPiece.valueY === valueY &&
                                    selectedPiece.valueX === valueX
                                );

                                return (
                                    <Square key={`${valueY}-${valueX}`} isDark={isDark}>
                                        {piece && (
                                            <Piece
                                                key={`${piece.x}-${piece.y}`}
                                                color={piece.pieceColor.toLowerCase()}
                                                isSelected={isSelected}
                                                onClick={
                                                    isOwnedByCurrentUser
                                                        ? () => handlePieceClick(piece.x, piece.y, valueY, valueX, piece.pieceColor)
                                                        : undefined
                                                }
                                            />
                                        )}
                                    </Square>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </BoardLayout>
    );
};

export default GameBoard;
