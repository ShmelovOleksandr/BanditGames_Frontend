import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
    address: string;
    postalCode: string;
}

const PersonalInfo: React.FC = () => {
    const { userInfo, isAuthenticated, login, keycloak } = useContext(SecurityContext)
    const navigate = useNavigate()

    const [attributes, setAttributes] = useState<UserAttributes>({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        country: '',
        city: '',
        address: '',
        postalCode: '',
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
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
                address: userInfo.address || '',
                postalCode: userInfo.postalCode || '',
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
            // Fetch the user's access token for the Admin API
            await keycloak.updateToken(5) // Refresh token if needed
            const userToken = keycloak.token

            // Construct the payload to update user attributes
            const payload = {
                username: attributes.username,
                email: attributes.email,
                firstName: attributes.firstName,
                lastName: attributes.lastName,
                attributes: {
                    age: attributes.age ? [String(attributes.age)] : undefined,
                    gender: attributes.gender ? [attributes.gender] : undefined,
                    country: attributes.country ? [attributes.country] : undefined,
                    city: attributes.city ? [attributes.city] : undefined,
                    address: attributes.address ? [attributes.address] : undefined,
                    postalCode: attributes.postalCode ? [attributes.postalCode] : undefined,
                },
            }

            const userId = userInfo?.sub
            if (!userId) {
                throw new Error('User ID not found.')
            }

            // Call the Keycloak Admin API to update the user
            const response = await fetch(
                `${import.meta.env.VITE_KC_URL}/admin/realms/${keycloak.realm}/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(payload),
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to update user: ${response.statusText}`)
            }

            alert('Your changes have been saved.')
        } catch (error) {
            console.error('Error saving user data:', error)
            alert('Failed to save changes.')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-purple-950 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">My Account</h1>
                </div>

                <div className="bg-purple-800 shadow-lg rounded-lg p-8">
                    <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">User Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={attributes.username}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={attributes.email}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={attributes.firstName}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={attributes.lastName}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="age">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={attributes.age}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={attributes.address}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={attributes.city}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="country">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={attributes.country}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="postalCode">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={attributes.postalCode}
                                onChange={handleInputChange}
                                className="block w-4/5 bg-purple-300 text-black border border-gray-600 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-10">
                        <button
                            onClick={() => navigate('/my-account')}
                            className="px-5 py-3 mr-2 bg-purple-950 text-white font-medium rounded-lg hover:bg-purple-600"
                        >
                            Go Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-5 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo
