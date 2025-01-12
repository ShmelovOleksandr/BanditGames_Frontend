import GameBoard from "@/components/GameBoard";


export const  Main = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Game Board */}
            <div className="w-full max-w-4xl flex items-center justify-center">
                <GameBoard/>
            </div>
        </div>
    )
}