import React, { useContext, useEffect, useState } from 'react'
import SecurityContext from '@/context/SecurityContext'

interface UserAttributes {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number | '';
    gender: string;
    country: string;
    city: string;
}

const MyAccount: React.FC = () => {
    const { userInfo, isAuthenticated, login } = useContext(SecurityContext)
    const [attributes, setAttributes] = useState<UserAttributes>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        country: '',
        city: '',
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated()) {
            login()
            return
        }

        if (userInfo) {
            setAttributes({
                username: userInfo.preferred_username || '',
                email: userInfo.email || '',
                firstName: userInfo.given_name || '',
                lastName: userInfo.family_name || '',
                age: userInfo.age || '',
                gender: userInfo.gender || '',
                country: userInfo.country || '',
                city: userInfo.city || '',
            })
        }

        setIsLoading(false)
    }, [isAuthenticated, login, userInfo])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setAttributes((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleSave = async () => {
        try {
            // Fetch the admin token
            const adminTokenResponse = await fetch(`${import.meta.env.VITE_KC_URL}/realms/master/protocol/openid-connect/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    client_id: import.meta.env.VITE_KC_ADMIN_CLIENT_ID,
                    client_secret: import.meta.env.VITE_KC_ADMIN_CLIENT_SECRET,
                    grant_type: 'client_credentials',
                }),
            })

            if (!adminTokenResponse.ok) {
                throw new Error(`Failed to fetch admin token: ${adminTokenResponse.statusText}`)
            }

            const adminTokenData = await adminTokenResponse.json()
            const adminToken = adminTokenData.access_token

            // Update user attributes in Keycloak
            const userId = userInfo?.sub // Assuming 'sub' contains the user's ID
            const response = await fetch(`${import.meta.env.VITE_KC_URL}/admin/realms/${import.meta.env.VITE_KC_REALM}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({
                    username: attributes.username,
                    email: attributes.email,
                    firstName: attributes.firstName,
                    lastName: attributes.lastName,
                    attributes: {
                        age: [String(attributes.age)], // Custom attributes must be arrays
                        gender: [attributes.gender],
                        country: [attributes.country],
                        city: [attributes.city],
                    },
                }),
            })

            if (!response.ok) {
                throw new Error(`Failed to update user in Keycloak: ${response.statusText}`)
            }

            alert('Your changes have been saved.')
        } catch (error) {
            console.error('Error saving user data to Keycloak:', error)
            alert('Failed to save changes.')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <form>
                    {Object.entries(attributes).map(([key, value]) => (
                        <div className="mb-4" key={key}>
                            <label className="block text-sm font-medium text-gray-700" htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            {key === 'gender' ? (
                                <select
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <input
                                    type={key === 'age' ? 'number' : 'text'}
                                    id={key}
                                    name={key}
                                    value={value}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}

export default MyAccount
