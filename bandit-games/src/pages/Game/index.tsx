import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import Section from '@/components/Section'
import DefaultLayout from '@/layouts/default'
import NotFound from '@/pages/Error'
import {title} from '@/components/primitives'
import SectionComponent from '@/components/Section'

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
    const [state, setState] = useState<{ game: Game | null; error: string | null }>({
        game: null,
        error: null,
    })

    useEffect(() => {
        const fetchGameDetails = async (id: string) => {
            try {
                const response = await axios.get(`${apiUrl}/api/v1/games/${id}`)
                setState({game: response.data, error: null})
            } catch (err) {
                console.error('Error fetching game details:', err)
                setState({game: null, error: 'Failed to load game details.'})
            }
        }

        if (gameId) fetchGameDetails(gameId)
    }, [gameId])

    const {game, error} = state

    if (error) {
        return <NotFound/>
    }

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading game details...
            </div>
        )
    }

    const Bubble = ({text}: { text: string }) => (
        <span className="px-4 py-1 bg-purple-300 text-purple-950 rounded-full">{text}</span>
    )

    const ActionButton = ({
                              text,
                              onClick,
                          }: {
        text: string;
        onClick?: () => void;
    }) => (
        <button
            className="px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200"
            onClick={onClick}
        >
            {text}
        </button>
    )

    return (
        <DefaultLayout>
            <SectionComponent>
                <div
                    className="relative flex items-center justify-center h-dvh bg-cover bg-center"
                    style={{backgroundImage: 'url(\'/splash-bg.jpg\')'}}
                >
                    <div className="absolute bottom-14 left-12 flex flex-col items-start space-y-4">
                        <p
                            className={
                                title({
                                    color: 'white',
                                    postion: 'left',
                                }) + ' text-2xl sm:text-3xl md:text-4xl'
                            }
                        >
                            {game.title}
                        </p>
                        <div className="flex space-x-2">
                            <Bubble text="Multiplayer Fun"/>
                            <Bubble text="Strategy Challenge"/>
                        </div>
                    </div>
                    <p className="absolute bottom-14 right-12 text-purple-300 max-w-xl text-right">
                        Join the thrilling journey in {game.title}, where strategy meets excitement. Team up with
                        friends to conquer challenges and unlock achievements!
                    </p>
                </div>
            </SectionComponent>

            <SectionComponent>
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
                            <ActionButton text="Play"/>
                            <ActionButton text={`Buy - ${game.priceAmount} ${game.currencyCode}`}/>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="px-12 py-8 h-48 mb-14 flex justify-center items-center">
                    <div className="flex flex-col">
                        <h3 className="flex justify-center text-xl font-bold text-center mb-4">Reviews</h3>
                        <div className="flex items-center justify-center space-x-4">
                            <button className="p-2 bg-purple-950 rounded-full">⬅️</button>
                            <div className="max-w-xl text-center">
                                <p className="text-gray-300">
                                    "This game has transformed our family game nights into unforgettable adventures!
                                    The interactive features keep everyone engaged and excited to play again."
                                </p>
                                <p className="mt-2 text-white">— Emily Johnson, Game Enthusiast</p>
                            </div>
                            <button className="p-2 bg-white rounded-full">➡️</button>
                        </div>
                    </div>
                </div>
            </SectionComponent>
        </DefaultLayout>
    )
}

export default GameDetails
