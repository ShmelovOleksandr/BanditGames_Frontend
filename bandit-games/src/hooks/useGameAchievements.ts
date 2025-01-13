import {Achievement} from "@/components/GameAchievements";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export const useGameAchievements = (gameBackendUrl: string | undefined) => {
    const gameAchievementsUrl = `${gameBackendUrl}/api/v1/achievements`
    const fetchAchievements = async (): Promise<Achievement[]> => {
        const response = await axios.get(gameAchievementsUrl);
        return response.data;
    };

    const {
        data: achievements,
        error,
        isLoading,
        isError,
    } = useQuery<Achievement[], Error>({ queryKey: ['gameAchievements'], queryFn: fetchAchievements} );

    return {
        data: achievements,
        error,
        isLoading,
        isError,

    };

}