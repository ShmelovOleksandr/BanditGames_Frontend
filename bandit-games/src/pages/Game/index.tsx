import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'
import DefaultLayout from '@/layouts/default'
import NotFound from '@/pages/Error'
import {title} from '@/components/primitives'
import SectionComponent from '@/components/Section'
import BlurredCard from '@/components/BlurredCard'
import ReviewsSection from '@/components/Reviews'

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
                <div className="flex items-center justify-center min-h-screen">
                    <BlurredCard
                        title={game.title}
                        subtitle="The best game"
                        features={[
                            'Unlock achievements and track your progress seamlessly.',
                            'Join friends and compete for the highest scores.',
                            'Read reviews from fellow players and strategize.',
                        ]}
                        price={`${game.priceAmount} ${game.currencyCode}`}
                        onPlayClick={() => console.log('Play clicked!')}
                        onBuyClick={() => console.log('Buy clicked!')}
                    />
                </div>
            </SectionComponent>

            <SectionComponent>
                <ReviewsSection/>
            </SectionComponent>
        </DefaultLayout>
    )
}

export default GameDetails
