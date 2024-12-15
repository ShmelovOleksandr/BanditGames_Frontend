import React from "react";

interface SquareProps {
    isDark: boolean;
    isHighlighted: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ isDark, isHighlighted, children, onClick }) => {
    return (
        <div
            className={`flex justify-center items-center ${
                isHighlighted
                    ? "bg-yellow-400" 
                    : isDark
                        ? "bg-gray-800" 
                        : "bg-gray-200" 
            }`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Square;