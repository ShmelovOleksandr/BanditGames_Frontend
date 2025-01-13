import { useParams } from "react-router-dom";

const useGameUUID = (): string | undefined => {
    const { game_uuid } = useParams<{ game_uuid: string }>();
    return game_uuid;
};

export default useGameUUID;
