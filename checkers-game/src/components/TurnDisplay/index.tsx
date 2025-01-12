import {GameState} from "@/model/GameState.ts";

interface TurnDisplayProps {
    game: GameState | undefined;
    loggedInUser: string | undefined;

}

export const TurnDisplay = ({game, loggedInUser}: TurnDisplayProps) => {

    const isCurrentTurn = game?.currentPlayer === loggedInUser;
    const currentPlayer = game?.players.find((p) => p.username === loggedInUser);
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