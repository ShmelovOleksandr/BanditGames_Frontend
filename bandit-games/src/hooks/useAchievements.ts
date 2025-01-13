import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {useKeycloak} from "@/hooks/useKeyCloak.ts";
import {faker} from "@faker-js/faker";

interface Achievement {
    achievementId: string;
    name: string;
    description: string;
    imageUrl: string;
    isAchieved: boolean;
}

export function useAchievements() {
    const {keycloak} = useKeycloak()
    const userId = keycloak?.tokenParsed?.sub
    const baseUrl = import.meta.env.VITE_ACHIEVEMENT_API_URL
    const achievementsApiUrl = `${baseUrl}/api/v1/players/${userId}/achievements`

    return useQuery<Achievement[], Error>({
        queryKey: ['achievements'], // Query key
        queryFn: async () => {

            const response = await axios.get(achievementsApiUrl) // Replace with your actual API endpoint
            response.data.forEach(achievement => achievement.imageUrl = faker.image.urlPicsumPhotos({ width: 1200, height: 400 }))
            return response.data
        },
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        retry: 2, // Retry twice on failure
    })
}
