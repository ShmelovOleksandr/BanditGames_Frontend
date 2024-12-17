import {useMemo} from 'react'

interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

export function useFilteredGames(games: Game[], searchQuery: string): Game[] {
    return useMemo(() => {
        if (!searchQuery) return games
        return games.filter((game) =>
            game.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [games, searchQuery])
}
