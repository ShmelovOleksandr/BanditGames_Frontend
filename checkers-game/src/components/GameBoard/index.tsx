import {useState} from "react";
import Piece from "@/components/Piece";
import BoardLayout from "@/layouts/boardLayout.tsx";

interface SelectedPiece {
    row: number;
    col: number;
    color: string;
}

const GameBoard = () => {
    const [selectedPiece, setSelectedPiece] = useState<SelectedPiece>(null);

    const handlePieceClick = (row, col, color) => {
        if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
            setSelectedPiece(null);
        } else {
            setSelectedPiece({row, col, color});
        }
    };

    return (
        <BoardLayout>
            <div className="p-4 bg-black rounded-lg flex justify-center items-center w-full h-full">
                <div className="w-full max-w-screen-md aspect-square relative">
                    <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
                        {Array.from({length: 10}, (_, row) =>
                            Array.from({length: 10}, (_, col) => {
                                const isDark = (row + col) % 2 === 1;
                                let pieceColor = null;

                                if (isDark && row < 4) pieceColor = "black";
                                if (isDark && row > 5) pieceColor = "white";

                                const isSelected =
                                    selectedPiece &&
                                    selectedPiece.row === row &&
                                    selectedPiece.col === col;

                                return (
                                    <div
                                        key={`${row}-${col}`}
                                        className={`flex justify-center items-center ${
                                            isDark ? "bg-gray-800" : "bg-gray-200"
                                        }`}
                                    >
                                        {pieceColor && (
                                            <Piece
                                                color={pieceColor}
                                                isSelected={isSelected}
                                                onClick={() => handlePieceClick(row, col, pieceColor)}
                                            />
                                        )}
                                    </div>
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
