
interface PieceProps {
    color: string;
    isSelected: boolean;
    onClick?: () => void;
    isKing: boolean;
}

function Piece({ color, isSelected, onClick, isKing }: PieceProps) {
    const baseClasses = "w-8 h-8 rounded-full cursor-pointer relative";

    const highlightClasses = isSelected ? "ring ring-yellow-500 ring-offset-2 ring-offset-black" : "";

    const outerColorClass = color === "black" ? "bg-black" : "bg-white";
    const innerColorClass =
        color === "black" ? "bg-gray-800" : "bg-gray-300";

    return (
        <div
            className={`piece-container flex items-center justify-center`}
            onClick={onClick}
        >
            <div
                className={`${baseClasses} ${outerColorClass} ${highlightClasses} flex items-center justify-center`}
            >
                <div
                    className={`w-6 h-6 rounded-full ${innerColorClass} flex items-center justify-center relative`}
                >
                    {isKing && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={color === "black" ? "gold" : "darkgoldenrod"}
                            className="absolute w-4 h-4"
                        >
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.6 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Piece;