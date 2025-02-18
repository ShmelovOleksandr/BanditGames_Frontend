import { useState, useEffect, useContext } from 'react'
import SecurityContext from '@/context/SecurityContext'
import { Button } from '@nextui-org/button'

const apiUrl = import.meta.env.VITE_LOCAL_BASE_URL

export default function FriendsPage() {
    const { userInfo, keycloak } = useContext(SecurityContext)
    const playerId = userInfo?.sub
    const [username, setUsername] = useState('')
    const [friends, setFriends] = useState([])
    const [pendingRequests, setPendingRequests] = useState([])
    const [foundUser, setFoundUser] = useState(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchFriends()
    }, [keycloak?.token])

    const fetchFriends = () => {
        fetch(`${apiUrl}/api/v1/players/${playerId}/friends`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then(async (res) => {
                const data = await res.json()
                console.log('Fetched Friends Data:', data) // Debugging
                setFriends(data)
            })
            .catch((err) => {
                console.error('Error fetching friends:', err)
                setError('Failed to load friends')
            })
    }



    const handleSearch = () => {
        fetch(`${apiUrl}/api/v1/players?username=${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('User not found')
                }
                return res.json()
            })
            .then((data) => {
                setFoundUser(data[0])
                setError(null)
            })
            .catch((err) => {
                console.error('Error searching for user:', err)
                setError('User not found')
                setFoundUser(null)
            })
    }

    const handleSendRequest = (receiverId) => {
        fetch(`${apiUrl}/api/v1/friends/send/${playerId}/${receiverId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to send request')
                }
            })
            .then(() => {
                alert('Friend request sent!')
            })
            .catch((err) => {
                console.error('Error sending friend request:', err)
                setError('Failed to send friend request')
            })
    }


    const handleResponse = (requestId, accepted) => {
        fetch(`${apiUrl}/api/v1/friends/respond/${requestId}/${accepted}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then((res) => {
                console.log(`Request ID: ${requestId}, Accepted: ${accepted}`)
                if (!res.ok) {
                    throw new Error('Failed to respond to request')
                }
            })
            .then(() => {
                alert(`Request ${accepted ? 'accepted' : 'declined'}!`)
                fetchFriends() // Refresh the friends list
            })
            .catch((err) => {
                console.error('Error responding to friend request:', err)
                setError('Failed to respond to request')
            })
    }


    useEffect(() => {
        fetch(`${apiUrl}/api/v1/friends/pending/${playerId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch pending requests')
                }
                return res.json()
            })
            .then((data) => {
                console.log('Pending Requests:', data)
                setPendingRequests(data)
            })
            .catch((err) => {
                console.error('Error fetching pending requests:', err)
                setError('Failed to load pending requests')
            })
    }, [keycloak?.token, playerId])


    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-950 text-white">
            <div className="w-full max-w-3xl bg-purple-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Friends</h1>
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded mb-2 text-black"
                    />
                    <Button onClick={handleSearch} className="w-full">Search</Button>
                </div>
                {foundUser && (
                    <div className="mb-6 bg-purple-700 p-4 rounded">
                        <h2 className="text-2xl font-bold mb-2">Search Result</h2>
                        <div className="flex items-center justify-between">
                            <span>{foundUser.username}</span>
                            <Button onClick={() => handleSendRequest(foundUser.id)}>Send Friend Request</Button>
                        </div>
                    </div>
                )}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
                    <ul>
                        {friends.length > 0 ? (
                            friends.map((friend) => (
                                <li key={friend.uuid} className="mb-2 bg-purple-700 p-3 rounded">
                                    {friend.username}
                                </li>
                            ))
                        ) : (
                            <p>No friends found</p>
                        )}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
                    <ul>
                        {Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
                            pendingRequests.map((request) => (
                                <li key={request.requestUUID}
                                    className="mb-2 bg-purple-700 p-3 rounded flex justify-between">
                                    {request.sender.username}
                                    <div>
                                        <Button
                                            onClick={() => {
                                                console.log('Request ID being passed:', request.requestUUID) // Debugging log
                                                handleResponse(request.requestUUID, true)
                                            }}
                                            className="mr-2"
                                        >
                                            Accept
                                        </Button>

                                        <Button
                                            onClick={() => handleResponse(request.requestUUID, false)} // Pass `request.id` correctly
                                            color="danger"
                                        >
                                            Decline
                                        </Button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No pending requests</p>
                        )}
                    </ul>

                </div>
            </div>
        </div>
    )
}
