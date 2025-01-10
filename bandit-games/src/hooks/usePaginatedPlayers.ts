import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import SecurityContext from "@/context/SecurityContext.ts";

const apiUrl = import.meta.env.VITE_LOCAL_STATISTICS_URL;

interface Player {
    playerId: string;
    playerName: string;
    age: number;
    gender: string;
    country: string;
    city: string;
    churn: number;
    firstMoveWinProbability: number;
    playerClass: string;
}

interface PaginatedResponse {
    content: Player[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export function usePaginatedPlayers(initialPageSize: number = 20) {
    const { keycloak } = useContext(SecurityContext);
    const endpoint = "/api/v1/players";

    const fetchPlayers = async ({ pageParam = 0 }: { pageParam?: number }) => {
        const token = keycloak?.token;
        const response = await axios.get<PaginatedResponse>(`${apiUrl}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: pageParam,
                size: initialPageSize,
            },
        });

        return {
            players: response.data.content,
            nextPage: pageParam + 1,
            totalPages: response.data.totalPages,
        };
    };

    const query = useInfiniteQuery({
        queryKey: ["players"],
        queryFn: fetchPlayers,
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.nextPage < lastPage.totalPages ? lastPage.nextPage : undefined,
    });

    const players = query.data?.pages.flatMap((page) => page.players) || [];

    return {
        players,
        ...query,
    };
}
