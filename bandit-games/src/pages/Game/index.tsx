import {useSearchParams} from 'react-router-dom'
import DefaultLayout from '@/layouts/default'
import NotFound from '@/pages/Error'
import {title} from '@/components/primitives'
import SectionComponent from '@/components/Section'
import BlurredCard from '@/components/BlurredCard'
import ReviewsSection from '@/components/Reviews'
import Bubble from '@/components/GameTypeBubble'
import {useFetch} from '@/hooks/useFetch'
import {faker} from '@faker-js/faker'


interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
    imageUrl?: string;
}


function GameDetails() {
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')

    const {data: game, error, loading} = useFetch<Game>(`/api/v1/games/${gameId}`)

    // Add imageUrl dynamically
    const gameWithImage = game
        ? {
            ...game,
            imageUrl: faker.image.url({width: 640, height: 480, category: 'game'}),
        }
        : null

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading game details...
            </div>
        )
    }

    if (error || !gameWithImage) {
        return <NotFound/>
    }

    return (
        <DefaultLayout>
            {/* Hero Section */}
            <SectionComponent>
                <div
                    className="relative flex items-center justify-center h-[100vh] bg-cover bg-center"
                    style={{backgroundImage: `url('${gameWithImage.imageUrl}')`}}
                >
                    <div className="absolute bottom-14 left-12 flex flex-col items-start space-y-4">
                        <p className={`${title({color: 'white', postion: 'left'})} text-2xl sm:text-3xl md:text-4xl`}>
                            {gameWithImage.title}
                        </p>
                        <div className="flex space-x-2">
                            <Bubble text="Multiplayer Fun"/>
                            <Bubble text="Strategy Challenge"/>
                        </div>
                    </div>
                    <p className="absolute bottom-14 right-12 text-purple-300 max-w-xl text-right">
                        Join the thrilling journey in {gameWithImage.title}, where strategy meets excitement. Team up
                        with friends
                        to conquer challenges and unlock achievements!
                    </p>
                </div>
            </SectionComponent>

            {/* Blurred Card Section */}
            <SectionComponent>
                <div className="flex items-center justify-center min-h-screen">
                    <BlurredCard
                        title={gameWithImage.title}
                        subtitle="The best game"
                        features={[
                            'Unlock achievements and track your progress seamlessly.',
                            'Join friends and compete for the highest scores.',
                            'Read reviews from fellow players and strategize.',
                        ]}
                        price={`${gameWithImage.priceAmount} ${gameWithImage.currencyCode}`}
                        onPlayClick={() => console.log('Play clicked!')}
                        onBuyClick={() => console.log('Buy clicked!')}
                    />
                </div>
            </SectionComponent>

            {/* Reviews Section */}
            <SectionComponent>
                <ReviewsSection/>
            </SectionComponent>
        </DefaultLayout>
    )
}

export default GameDetails
