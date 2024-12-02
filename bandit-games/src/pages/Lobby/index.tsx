import {Navigation} from '@/components/Navbar'
import SectionComponent from '@/components/Section'
import ButtonComponent from '@/components/Button'
import {useContext, useEffect, useRef, useState} from 'react'
import {subtitle, title} from '@/components/primitives.ts'
import User from '@/components/User'
import SecurityContext from '@/context/SecurityContext'
import {faker} from '@faker-js/faker'
import {Progress, Skeleton, Tooltip} from '@nextui-org/react'
import {Button} from '@nextui-org/button'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useKeycloak} from '@/hooks/useKeyCloak.ts'
import useWebSocket from '@/hooks/useWebSocket.ts'
import {Input} from '@nextui-org/input'
import SearchInput from '@/components/Search'


export const Lobby: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const gameName = searchParams.get('game')
    const navigate = useNavigate()


    const {keycloak} = useKeycloak()
    const {disconnectWebSocket, sendLeaveLobbyRequest, sendReadyToPlayRequest} = useWebSocket(keycloak)
    const [isConnected, setIsConnected] = useState(false)  // Track connection status
    const [isReadyToPlay, setIsReadyToPlay] = useState(false)

    const {isAuthenticated, loggedInUser} = useContext(SecurityContext)
    const [players, setPlayers] = useState<string[]>(['Host Player'])
    const [messages, setMessages] = useState([
        {id: 1, sender: 'John', text: 'Hey there!'},
        {id: 2, sender: 'You', text: 'Hi John, how are you?'},
    ])

    const handleLeaveLobby = () => {
        sendLeaveLobbyRequest()
        disconnectWebSocket()
        setIsConnected(false)
        navigate('/game-library')
    }

    const handleReadyToPlay = () => {
        sendReadyToPlayRequest()
        // navigate('/game')
    }


    return (
        <>
            <Navigation/>

            <SectionComponent className="flex h-screen bg-gray-900 text-white">
                <main className="flex-grow p-6 bg-secondary-50">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className={title()}>{gameName}</h1>

                        <Tooltip showArrow={true} placement="left" content="Close lobby and leave the game">
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
                                      value={(players.length / 2) * 100}/>
                            <span className="text-sm">{players.length}/2 players</span>
                        </div>
                    </div>

                    {/* Player Section */}
                    <div className="bg-gray-700 p-4 rounded-md">
                        <h2 className="text-lg font-bold">Players</h2>
                        <div className="mt-2 space-y-4">
                            {/* Host Player */}
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <User name={loggedInUser} description={`@${loggedInUser}`}
                                          avatarSrc={faker.image.avatar()}/>
                                    <p>(Host)</p>
                                    <div>
                                        <img
                                            src="/alien-monster.png"
                                            alt="Alien Monster"
                                            style={{
                                                width: '50px',
                                                height: 'auto',
                                                animation: 'pulse 2s infinite',
                                            }}
                                        /></div>
                                </div>
                            ) : (
                                <p>Please log in to join the lobby.</p>
                            )}
                            {players.slice(1).map((player, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <User
                                        name={player}
                                        description={`@${player.toLowerCase().replace(' ', '_')}`}
                                        avatarSrc={faker.image.avatar()}
                                    />
                                </div>
                            ))}
                            {/* Skeleton while waiting for players */}
                            {players.length < 2 && (
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
                            <Button type="button"
                                    className="text-sm font-normal text-default-600 bg-default-100"
                            >
                                Invite Player
                            </Button>
                            {players.length === 2 && (
                                <Button onClick={handleReadyToPlay}
                                        className="text-sm font-normal text-default-600 bg-default-100">
                                    Start Game
                                </Button>
                            )}
                        </div>
                        <div>

                        </div>
                    </div>
                </main>

                {/* Chat */}
                <aside className="w-1/4 p-4 bg-secondary-100">
                    <p className={subtitle()}>Chat</p>
                    <div className="h-64 bg-gray-800 rounded-md p-4 overflow-y-auto space-y-2">
                        {messages.map((message) => (
                            <div key={message.id}
                                 className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`px-4 py-2 rounded-md ${
                                        message.sender === 'You' ? 'bg-secondary-400 text-white' : 'bg-gray-600 text-white'
                                    }`}
                                >
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center">
                        <Input
                            variant="flat"
                            placeholder="Type a message..."
                            className="flex-grow px-4 py-2 text-white rounded-l-md focus:outline-none"
                        />
                        <ButtonComponent text="Send"/>
                    </div>
                </aside>
            </SectionComponent>
        </>
    )
}

export default Lobby
