import { GameState } from "@/model/GameState.ts";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

interface EndModalProps {
    gameState: GameState | undefined;
    isFinished: boolean;
}

const homeURL = import.meta.env.VITE_BANDIT_GAMES_URL;

export const EndModal = ({ isFinished, gameState }: EndModalProps) => {
    if (!gameState) return null;

    const winner = gameState.players.find(player => player.playerId === gameState.winnerId);
    const resultMessage = gameState.isDraw
        ? "It's a draw!"
        : `${winner?.username} wins!`;

    return (
        <Modal
            hideCloseButton={true}
            isOpen={isFinished}
            aria-labelledby="finish-game-modal"
            size="2xl"
        >
            <ModalContent>
                <ModalHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-lg">
                    <h1 className="text-4xl font-extrabold text-center text-white">
                        {gameState.isDraw ? "Game Over" : "Congratulations!"}
                    </h1>
                </ModalHeader>
                <ModalBody className="bg-gray-100 p-8 rounded-b-lg">
                    <div className="text-center space-y-6">
                        <p className="text-2xl font-semibold text-gray-800">
                            {resultMessage}
                        </p>

                        {gameState.isDraw ? (
                            <p className="text-lg text-gray-600">
                                Both players demonstrated exceptional skills!
                            </p>
                        ) : (
                            <p className="text-lg text-gray-600">
                                <span className="font-bold text-gray-800">{winner?.username}</span>{" "}
                                showcased excellent strategy to secure the win.
                            </p>
                        )}

                        <button
                            onClick={() => (window.location.href = homeURL)}
                            className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105"
                        >
                            Back to BanditGames
                        </button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
