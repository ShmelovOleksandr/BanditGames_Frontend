import {ReactNode} from "react";

interface BoardLayoutProps {
    children: ReactNode;
}

const BoardLayout = ({children}: BoardLayoutProps) => {
    return (
        <div className="p-4 bg-blend-darken rounded-lg flex justify-center">
            <div className="w-[500px] h-[500px]">
                {children}
            </div>
        </div>
    );
};

export default BoardLayout;
