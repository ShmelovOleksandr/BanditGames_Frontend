export function ErrorMessage({ error }: { error: Error | null }) {
    return (
        <div className="text-center text-red-500">
            <p>Something went wrong:</p>
            <pre>{error?.message}</pre>
        </div>
    );
}