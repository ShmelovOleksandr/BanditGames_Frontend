import {Navigation} from '@/components/Navbar'
import SectionComponent from '@/components/Section'
import ButtonComponent from '@/components/Button'
import {useSearchParams} from 'react-router-dom'
import {title} from '@/components/primitives.ts'
import {Progress, Skeleton, Tooltip} from '@nextui-org/react'
import {Button} from '@nextui-org/button'
import SearchInput from '@/components/Search'
import LobbyChat from '@/components/LobbyChat'
import {useLobby} from '@/pages/Lobby/useLobby'
import {useState} from 'react'
import {faker} from '@faker-js/faker'

export default function Lobby() {
    const [searchParams] = useSearchParams()
    const gameId = searchParams.get('gameId')
    const gameName = searchParams.get('game')

    const {
        lobbyPlayers,
        handleLeaveLobby,
        handleReadyToPlay
    } = useLobby(gameId)

    const [chat] = useState([
        {id: 1, sender: 'John', text: 'Hey there!'},
        {id: 2, sender: 'You', text: 'Hi John, how are you?'},
    ])

    return (
        <>
            <Navigation/>
            <SectionComponent className="flex h-screen bg-gray-900 text-white">
                <main className="flex-grow p-6 bg-secondary-50">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className={title()}>{gameName}</h1>

                        <Tooltip showArrow placement="left" content="Close lobby and leave the game">
                            <div>
                                <ButtonComponent link="/game-library" text="Leave" actionClick={handleLeaveLobby}/>
                            </div>
                        </Tooltip>
                    </div>

                    {/* Game Info Section */}
                    <div className="bg-gray-700 p-4 rounded-md mb-4">
                        <h2 className="text-lg font-bold">Lobby Info</h2>
                        <p>Wait for or invite players for the game to start</p>
                        <div className="mt-2">
                            <Progress color="success" aria-label="Waiting for a player"
                                      value={(lobbyPlayers.length / 2) * 100}/>
                            <span className="text-sm">{lobbyPlayers.length}/2 players</span>
                        </div>
                    </div>

                    {/* Player Section */}
                    <div className="bg-gray-700 p-4 rounded-md">
                        <h2 className="text-lg font-bold">Players</h2>
                        <div className="mt-2 space-y-4">
                            {lobbyPlayers.length > 0 ? (
                                lobbyPlayers.map((player) => (
                                    <div key={player.id} className="flex items-center gap-4 p-2 bg-gray-800 rounded-md">
                                        <img
                                            src={faker.image.avatar()}
                                            alt={player.username}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <p className="font-bold text-white">{player.username}</p>
                                            <p className="text-gray-400 text-sm">Player ID: {player.id}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Skeleton className="flex rounded-full w-12 h-12"/>
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton className="h-3 w-3/5 rounded-lg"/>
                                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add Player Input */}
                        <div className="mt-4 flex items-center gap-4">
                            <SearchInput/>
                            <Button type="button" className="text-sm font-normal text-default-600 bg-default-100">
                                Invite Player
                            </Button>
                            {lobbyPlayers.length === 2 && (
                                <Button
                                    onClick={handleReadyToPlay}
                                    className="text-sm font-normal text-default-600 bg-default-100"
                                >
                                    Start Game
                                </Button>
                            )}
                        </div>
                    </div>
                </main>

                <LobbyChat chat={chat}/>
            </SectionComponent>
        </>
    )
}
