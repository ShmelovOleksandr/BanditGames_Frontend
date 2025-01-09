export function Spinner({message}: { message?: string }) {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin h-8 my-4 w-8 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
            {message && <p className="ml-4">{message}</p>}
        </div>
    )
}