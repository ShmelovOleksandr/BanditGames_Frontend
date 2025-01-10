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

    const fetchFriends = () => {
        fetch(`${apiUrl}/api/v1/players/${playerId}/friends`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then(async (res) => {
                const data = await res.json()
                setFriends(data)
            })
            .catch((err) => {
                console.error('Error fetching friends:', err)
                setError('Failed to load friends')
            })
    }

    useEffect(() => {
        fetchFriends()
    }, [keycloak?.token])

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

    const handleSendRequest = (receiverId: string) => {
        fetch(`${apiUrl}/api/v1/friends/send?senderId=${playerId}&receiverId=${receiverId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to send request')
                }
                return res.json()
            })
            .then(() => {
                alert('Friend request sent!')
            })
            .catch((err) => {
                console.error('Error sending friend request:', err)
                setError('Failed to send friend request')
            })
    }

    const handleResponse = (requestId: string, accepted: boolean) => {
        fetch(`${apiUrl}/api/v1/friends/respond`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${keycloak?.token}`,
            },
            body: JSON.stringify({ requestId, accepted }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to respond to request')
                }
                return res.json()
            })
            .then(() => {
                alert(`Request ${accepted ? 'accepted' : 'declined'}!`)
                fetchFriends()
            })
            .catch((err) => {
                console.error('Error responding to friend request:', err)
                setError('Failed to respond to request')
            })
    }

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
                        {Array.isArray(friends) && friends.length > 0 ? (
                            friends.map((friend: any) => (
                                <li key={friend.id} className="mb-2 bg-purple-700 p-3 rounded">
                                    {friend.username} <span>(ID: {friend.id})</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No friends found</p>
                        )}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
                    <ul>
                        {Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
                            pendingRequests.map((request: any) => (
                                <li key={request.id} className="mb-2 bg-purple-700 p-3 rounded flex justify-between">
                                    {request.sender.username}
                                    <div>
                                        <Button
                                            onClick={() => handleResponse(request.id, true)}
                                            className="mr-2"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleResponse(request.id, false)}
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
