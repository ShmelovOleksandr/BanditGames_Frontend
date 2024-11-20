import axios from 'axios';
import {useEffect, useState} from "react";

interface Game {
    gameId: string;
    title: string;
    description: string;
    priceAmount: number;
    currencyCode: string;
}

export const Catalog: React.FC = () => {
    const [data, setData] = useState<Game[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8041/api/v1/games')
            .then(response => {
                setData(response.data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
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
