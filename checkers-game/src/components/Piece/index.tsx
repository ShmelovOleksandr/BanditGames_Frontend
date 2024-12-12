const Piece = ({color, isSelected, onClick}) => {
    const baseClasses = "w-8 h-8 rounded-full cursor-pointer";

    const highlightClasses = isSelected ? "ring ring-yellow-500 ring-offset-2 ring-offset-black" : "";

    const pieceColorClass = color === "black" ? "bg-black" : "bg-white";

    return (
        <div
            className={`${baseClasses} ${pieceColorClass} ${highlightClasses}`}
            onClick={onClick}>
        </div>
    );
};

export default Piece;
