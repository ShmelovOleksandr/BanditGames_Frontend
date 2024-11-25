import axios from 'axios'
import {useEffect, useState} from 'react'
import NotFound from '../Error'
import DefaultLayout from '@/layouts/default.tsx'
import {faker} from '@faker-js/faker'
import ReusableCard from '@/components/Card'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import SectionComponent from '@/components/Section'
import {subtitle, title} from '@/components/primitives.ts'
import SearchInput from '@/components/Search'


interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

export const Catalog: React.FC = () => {
    const [data, setData] = useState<Game[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')


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
    }, [])

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
                <p className={title({color: 'white'})}>Game Catalog</p>
                <p className={subtitle({color: 'muted'})}>Explore our diverse collection of exciting games.</p>
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game) => (
                        <motion.li key={game.gameId}
                                   whileHover={{scale: 1.1}}>
                            <Link to={`/games?gameId=${game.gameId}`}>
                                <ReusableCard title={game.title} description={game.description}
                                              imageSrc={game.imageSrc}/>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </SectionComponent>
        </DefaultLayout>
    )
}
export default Catalog
