import axios from 'axios'
import {useEffect, useState} from 'react'
import NotFound from '../Error'
import DefaultLayout from '@/layouts/default.tsx'
import {faker} from '@faker-js/faker'
import ReusableCard from '@/components/Card'
import {Link, useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import SectionComponent from '@/components/Section'
import {subtitle, title} from '@/components/primitives.ts'
import SearchInput from '@/components/Search'
import {useKeycloak} from '@/hooks/useKeyCloak.ts'
import ButtonComponent from '@/components/Button'


interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

export const Catalog: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<Game[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const {keycloak} = useKeycloak()

    useEffect(() => {
        axios.get(`${apiUrl}/api/v1/games`)
            .then(response => {
                const gamesWithImages = response.data.map((game: Game) => ({
                    ...game,
                    imageSrc: faker.image.urlPicsumPhotos({width: 400, height: 300})
                }))
                setData(gamesWithImages)

            })
            .catch((err) => {
                console.error('Error fetching data:', err)
                setError('Failed to fetch games. Please try again later.')
            })
        if (keycloak?.authenticated) {
            console.log('Logged in as:', keycloak.tokenParsed?.preferred_username)
        }
    }, [keycloak])

    const handleQuickMatch = (gameId: string, title: string) => {
        navigate(`/lobby?game=${title}&gameId=${gameId}`)
    }


    if (error) {
        return (
            <NotFound error={error}/>
        )
    }

    const filteredGames = data.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <DefaultLayout>
            <SectionComponent className="flex flex-col gap-4 ">
                <div className="flex flex-wrap items-center justify-between w-full">
                    <div>
                        <p className={title({color: 'white'})}>Game Catalog</p>
                        <p className={subtitle({color: 'muted'})}>
                            Explore our diverse collection of exciting games.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    </div>
                </div>
                <hr className="my-4 border-white"></hr>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <li key={game.gameId} className="flex flex-col items-start gap-4">
                            <motion.div whileHover={{scale: 1.1}}>
                                <Link to={`/game-library/game?gameId=${game.gameId}`}>
                                    <ReusableCard
                                        title={game.title}
                                        description={game.description}
                                        imageSrc={game.imageSrc}
                                    />
                                </Link>
                            </motion.div>
                            <ButtonComponent text="Quick Match"
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
