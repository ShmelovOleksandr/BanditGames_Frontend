interface NotFoundProps {
    error: string;
}

export const NotFound: React.FC<NotFoundProps> = ({error}) => {
    return (
        <div>
            <p>Error</p>
            <p>{error}</p>
        </div>
    )
}
export default NotFound
