import Piece from "@/components/Piece";

const GameBoard = () => {
    return (
        <div className="p-4 bg-black rounded-lg flex justify-center">
            <div className="grid grid-cols-10 grid-rows-10 w-[500px] h-[500px]">
                {Array.from({length: 10}, (_, row) =>
                    Array.from({length: 10}, (_, col) => {
                        const isDark = (row + col) % 2 === 1;
                        return (
                            <div
                                key={`${row}-${col}`}
                                className={`flex justify-center items-center ${
                                    isDark ? "bg-gray-800" : "bg-gray-200"
                                }`}
                            >
                                {isDark && row < 4 && <Piece color="black"/>}
                                {isDark && row > 5 && <Piece color="white"/>}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default GameBoard;
