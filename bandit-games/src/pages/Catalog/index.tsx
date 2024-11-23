import axios from 'axios'
import {useEffect, useState} from 'react'
import NotFound from '../Error'
import Card from '@/components/Card'
import DefaultLayout from '@/layouts/default.tsx'
import Section from '@/components/Section'

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
                setData(response.data)
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
            <Section>
                <ul>
                    {data.map((game) => (
                        //TODO: Faker images src
                        <li key={game.gameId}>
                            <Card title={game.title} description={game.description}/>
                        </li>
                    ))}
                </ul>
            </Section>
        </DefaultLayout>
    )
}
export default Catalog
