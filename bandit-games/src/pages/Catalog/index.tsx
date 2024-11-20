import axios from 'axios';
import {useEffect, useState} from "react";
import NotFound from "@/pages/Not-found";

interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL;

export const Catalog: React.FC = () => {
    const [data, setData] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        axios.get(`${apiUrl}/api/v1/games`)
            .then(response => {
                setData(response.data);
                console.log(data)
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError('Failed to fetch games. Please try again later.');
            });
    }, []);

    if (error) {
        return (
            <NotFound error={error}/>
        );
    }
    return (
        <ul>
            {data.map((game) => (
                <li key={game.gameId}>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <p>
                        {game.priceAmount} {game.currencyCode}
                    </p>
                </li>
            ))}
        </ul>
    )
}
export default Catalog
