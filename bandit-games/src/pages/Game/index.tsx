import * as React from 'react'
import {useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

const GameDetails: React.FC = () => {
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')
    const [game, setGame] = useState(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (gameId) {
            axios.get(`${apiUrl}/api/v1/games/${gameId}`)
                .then((response) => setGame(response.data))
                .catch((err) => {
                    console.error('Error fetching game details:', err)
                    setError('Failed to load game details.')
                })
        }
    }, [gameId])

    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>GameDetails</div>
    )
}
export default GameDetails
