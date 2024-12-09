interface PieceProps {
    color: "black" | "white";
}

const Piece = ({color}: PieceProps) => {
    return (
        <div
            className={`rounded-full w-8 h-8 ${
                color === "black" ? "bg-black" : "bg-white"
            } border-2 border-gray-300`}
        />
    );
};

export default Piece;
