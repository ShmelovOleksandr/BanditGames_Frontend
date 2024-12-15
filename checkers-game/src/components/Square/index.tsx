import React from "react";

interface SquareProps {
    isDark: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ isDark, children, onClick }) => {
    return (
        <div
            className={`flex justify-center items-center ${
                isDark ? "bg-gray-800" : "bg-gray-200"
            }`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Square;