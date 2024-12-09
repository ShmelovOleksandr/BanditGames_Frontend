import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import Section from '@/components/Section'
import SectionComponent from '@/components/Section'
import DefaultLayout from '@/layouts/default.tsx'

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

const GameDetails: React.FC = () => {
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')
    const [game, setGame] = useState<Game | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (gameId) {
            axios
                .get(`${apiUrl}/api/v1/games/${gameId}`)
                .then((response) => setGame(response.data))
                .catch((err) => {
                    console.error('Error fetching game details:', err)
                    setError('Failed to load game details.')
                })
        }
    }, [gameId])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        )
    }

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading game details...
            </div>
        )
    }

    return (
        <DefaultLayout>
            <Section>
                <div className="min-h-screen flex flex-col  text-white">

                    {/* Hero Section */}
                    <div className="relative flex items-center justify-center h-dvh" style={{
                        backgroundImage: 'url(\'/splash-bg.jpg\')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        <h1 className="absolute bottom-28 left-12 text-5xl font-bold">{game.title}</h1>
                        <div className="absolute bottom-14 left-12 flex space-x-2">
                            <span
                                className="px-4 py-1 bg-purple-300 text-purple-950 rounded-full">Multiplayer Fun</span>
                            <span
                                className="px-4 py-1 bg-purple-300 text-purple-950 rounded-full">Strategy Challenge</span>
                        </div>
                        <p className="absolute bottom-14 right-12 text-purple-300 max-w-xl text-right">
                            Join the thrilling journey in {game.title}, where strategy meets excitement.
                            Team up with friends to conquer challenges and unlock achievements!
                        </p>
                    </div>

                    <SectionComponent>

                        {/* Game Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 py-8 h-dvh">
                            {/* Text Section */}
                            <div className="flex flex-col justify-center">
                                <p className="text-sm text-white uppercase">Adventure</p>
                                <h2 className="text-3xl font-bold mb-4">Dive into the World of Quest</h2>
                                <p className="text-white mb-6">{game.description}</p>
                                <ul className="space-y-2 text-white">
                                    <li>✔️ Unlock achievements and track your progress seamlessly.</li>
                                    <li>✔️ Join friends and compete for the highest scores.</li>
                                    <li>✔️ Read reviews from fellow players and strategize.</li>
                                </ul>
                                <div className="flex space-x-4 mt-6">
                                    <button
                                        className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
                                        Play
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
                                        Buy - {game.priceAmount} {game.currencyCode}
                                    </button>
                                </div>
                            </div>

                            {/* Placeholder for Game Media */}
                        </div>

                        {/* Reviews Section */}
                        <div className=" px-12 py-8 h-48 mb-14 flex justify-center items-center">
                            <div className="flex flex-col">
                                <h3 className=" flex justify-center text-xl font-bold text-center mb-4">Reviews</h3>
                                <div className="flex items-center justify-center space-x-4">
                                    <button className="p-2 bg-purple-950 rounded-full">⬅️</button>
                                    <div className="max-w-xl text-center">
                                        <p className="text-gray-300">
                                            "This game has transformed our family game nights into unforgettable
                                            adventures!
                                            The interactive features keep everyone engaged and excited to play again."
                                        </p>
                                        <p className="mt-2 text-white">— Emily Johnson, Game Enthusiast</p>
                                    </div>
                                    <button className="p-2 bg-white rounded-full">➡️</button>
                                </div>
                            </div>
                        </div>
                    </SectionComponent>
                </div>
            </Section>
        </DefaultLayout>
    )
}

export default GameDetails
