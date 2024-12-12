import {ReactNode} from "react";

interface BoardLayoutProps {
    children: ReactNode;
}

const BoardLayout: React.FC<BoardLayoutProps> = ({children}) => {
    return (
        <div className="p-4 bg-white rounded-lg flex justify-center">
            <div className="w-[500px] h-[500px]">
                {children}
            </div>
        </div>
    );
};

export default BoardLayout;
