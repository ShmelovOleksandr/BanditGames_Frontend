import axios from 'axios'
import {useEffect, useState} from 'react'
import NotFound from '../Error'
import Card from '@/components/Card'
import DefaultLayout from '@/layouts/default.tsx'
import Section from '@/components/Section'
import {faker} from '@faker-js/faker'


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
    return (
        <DefaultLayout>
            <Section className="flex flex-col gap-4">
                <ul>
                    {data.map((game) => (
                        <li key={game.gameId}>
                            <Card title={game.title} description={game.description} imageSrc={game.imageSrc}/>
                        </li>
                    ))}
                </ul>
            </Section>
        </DefaultLayout>
    )
}
export default Catalog
