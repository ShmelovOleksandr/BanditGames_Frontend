import {useState} from 'react'
import NotFound from '../Error'
import DefaultLayout from '@/layouts/default.tsx'
import HomeCard from '@/components/Card'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import SectionComponent from '@/components/Section'
import {subtitle, title} from '@/components/primitives.ts'
import SearchInput from '@/components/Search'
import ButtonComponent from '@/components/Button'
import {useFetch} from '@/hooks/useFetch'
import {useFilteredGames} from '@/hooks/useFilteredGames'
import {faker} from '@faker-js/faker'

interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
    imageSrc?: string;
}


function Catalog() {
    const navigate = useNavigate()
    const {data: games, error, loading} = useFetch<Game[]>('/api/v1/games')
    const [searchQuery, setSearchQuery] = useState('')

    const gamesWithImages = games?.map((game) => ({
        ...game,
        imageSrc: faker.image.urlPicsumPhotos({width: 400, height: 300}),
    })) || []

    const filteredGames = useFilteredGames(gamesWithImages, searchQuery)

    const handleQuickMatch = (gameId: string, title: string) => {
        navigate(`/lobby?game=${title}&gameId=${gameId}`)
    }

    if (loading) {
        return <div className="text-white text-center">Loading...</div>
    }

    if (error) {
        return <NotFound error={error}/>
    }

    return (
        <DefaultLayout>
            <SectionComponent className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between w-full">
                    <div>
                        <p className={title({color: 'white'})}>Game Catalog</p>
                        <p className={subtitle({color: 'muted'})}>
                            Explore our diverse collection of exciting games.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <SearchInput
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="my-4 border-white"/>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <li key={game.gameId} className="flex flex-col items-start gap-4">
                            <motion.div whileHover={{scale: 1.1}}>
                                <Link to={`/game-library/game?gameId=${game.gameId}`}>
                                    <HomeCard
                                        title={game.title}
                                        description={game.description}
                                        imageSrc={game.imageSrc}
                                    />
                                </Link>
                            </motion.div>
                            <ButtonComponent
                                text="Quick Match"
                                actionClick={() => handleQuickMatch(game.gameId, game.title)}
                            />
                        </li>
                    ))}
                </ul>
            </SectionComponent>
        </DefaultLayout>
    )
}

export default Catalog
