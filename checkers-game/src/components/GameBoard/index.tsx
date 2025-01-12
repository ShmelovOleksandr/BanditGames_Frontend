import {useEffect, useState} from "react";
import Piece from "@/components/Piece";
import BoardLayout from "@/layouts/boardLayout.tsx";
import useWebSocket from "@/hooks/useWebSocket.ts";
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import Square from "@/components/Square";
import {GameState, PieceData} from "@/model/GameState.ts";
import useGameUUID from "@/hooks/useGameUUID.ts";
import {Move} from "@/model/Move.ts";
import {Position} from "@/model/Position.ts";

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
        sendGetPiecePossibleMoves,
        sendMovePieceRequest,
        messages,
        isWebSocketReady
    } = useWebSocket();
    const [isConnected, setIsConnected] = useState(false)

    const [highlightedSquares, setHighlightedSquares] = useState<Position[]>([])
    const [possibleMoves, setPossibleMoves] = useState<Move[]>([])
    const [pieces, setPieces] = useState<PieceData[]>([]);
    const [playerColor, setPlayerColor] = useState<string | null>(null);
    const gameUUID = useGameUUID();
    const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);


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
        if (latestMessage && ('pieces' in latestMessage)) {
            const gameState = latestMessage as GameState;
            setPieces(gameState.pieces);
            setCurrentPlayerId(gameState.currentPlayer)

            const player = gameState.players.find((p) => p.playerId === userId);
            if (player) {
                setPlayerColor(player.color);
            }
        }

        if (latestMessage && ('moves' in latestMessage)) {
            const moves = latestMessage.moves as Move[];
            const finalPositions = moves.map((move) => move.finalPosition);
            console.log(`Current player ${currentPlayerId} player selected ${userId}`)
            setPossibleMoves(moves);
            setHighlightedSquares(finalPositions);

        }
    }, [messages, userId]);


    const handlePieceClick = (valueY: number, valueX: number, color: string) => {
        if (selectedPiece && selectedPiece.valueY === valueY && selectedPiece.valueX === valueX) {
            setSelectedPiece(null);
            setHighlightedSquares([])
            setPossibleMoves([]);
        } else {
            setSelectedPiece({valueY, valueX, color});
            if (gameUUID && (currentPlayerId === userId)) {
                sendGetPiecePossibleMoves(gameUUID, valueX, valueY);
            }

            console.log(`Selected pieces valueX, valueY (${valueX},${valueY})`)
        }
    };

    const handleSquareClick = (valueX: number, valueY: number) => {
        console.log(`Clicked square ${valueX} ${valueY}`)
        const move = possibleMoves.find(
            (move) => move.finalPosition.x === valueX && move.finalPosition.y === valueY
        );
        if (move && gameUUID) {
            sendMovePieceRequest(move, gameUUID)
            setSelectedPiece(null);
            setHighlightedSquares([])
            setPossibleMoves([])
        }
    }


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

                                const isHighlighted = highlightedSquares.some(
                                    (square) => square.x === valueX && square.y === valueY
                                );

                                return (
                                    <Square
                                        key={`${valueY}-${valueX}`}
                                        isDark={isDark}
                                        isHighlighted={isHighlighted}
                                        onClick={isHighlighted ? () => handleSquareClick(valueX, valueY) : undefined}
                                    >
                                        {piece && (
                                            <Piece
                                                key={`${piece.x}-${piece.y}`}
                                                color={piece.pieceColor.toLowerCase()}
                                                isSelected={isSelected}
                                                onClick={
                                                    isOwnedByCurrentUser
                                                        ? () => handlePieceClick(valueY, valueX, piece.pieceColor)
                                                        : undefined
                                                }
                                                isKing={piece.isKing}
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
